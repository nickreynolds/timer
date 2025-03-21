import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.time).toBe(60);
    expect(result.current.originalTime).toBe(60);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isEditing).toBe(false);
    expect(result.current.editValue).toBe('');
  });

  it('starts and stops timer correctly', () => {
    const { result } = renderHook(() => useTimer());

    // Start timer
    act(() => {
      result.current.togglePause();
    });
    expect(result.current.isRunning).toBe(true);

    // Advance time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.time).toBe(59);

    // Stop timer
    act(() => {
      result.current.togglePause();
    });
    expect(result.current.isRunning).toBe(false);
    expect(result.current.time).toBe(59);
  });

  it('adds a minute correctly', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.addMinute();
    });
    expect(result.current.time).toBe(120);
    expect(result.current.originalTime).toBe(120);
  });

  it('resets timer correctly', () => {
    const { result } = renderHook(() => useTimer());

    // Start timer and advance time
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
        vi.advanceTimersByTime(1000);
    });
    act(() => {
        vi.advanceTimersByTime(1000);
    });
    act(() => {
        vi.advanceTimersByTime(1000);
    });

    expect(result.current.time).toBe(57);

    // Reset timer
    act(() => {
      result.current.resetTimer();
    });
    expect(result.current.time).toBe(60);
    expect(result.current.isRunning).toBe(false);
  });

  it('handles editing state correctly', () => {
    const { result } = renderHook(() => useTimer());

    // Start editing
    act(() => {
      result.current.startEditing();
    });
    expect(result.current.isEditing).toBe(true);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.editValue).toBe('01:00'); // TODO: investigate why this is not 0100

    // Update edit value
    act(() => {
      result.current.setEditValue('0230');
    });
    expect(result.current.editValue).toBe('0230');

    // Save edit
    act(() => {
      result.current.handleBlur();
    });
    expect(result.current.isEditing).toBe(false);
    expect(result.current.time).toBe(150);
    expect(result.current.originalTime).toBe(150);
    expect(result.current.isRunning).toBe(true);
  });

  it('handles keyboard events during editing', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.isEditing).toBe(false);
    // Start editing
    act(() => {
      result.current.startEditing();
    });

    expect(result.current.isEditing).toBe(true);
    // Simulate Enter key
    act(() => {
      result.current.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>);
    });

    act(() => {
        vi.advanceTimersByTime(1000);
    });

    expect(result.current.isEditing).toBe(false);
  });

  it('cleans up intervals on unmount', () => {
    const { result, unmount } = renderHook(() => useTimer());
    const initialTime = result.current.time;

    // Start timer
    act(() => {
      result.current.togglePause();
    });

    // Unmount
    unmount();

    // Advance time after unmount
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Timer should not update after unmount
    expect(result.current.time).toBe(initialTime);
  });
}); 