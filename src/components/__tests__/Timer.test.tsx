import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '../Timer';
import { Pause, Play } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';

// Mock the useTimer hook
vi.mock('../../hooks/useTimer', () => ({
  useTimer: vi.fn().mockReturnValue({
    time: 60,
    originalTime: 60,
    isRunning: false,
    isEditing: false,
    editValue: '',
    inputRef: { current: null },
    setEditValue: vi.fn(),
    startEditing: vi.fn(),
    handleBlur: vi.fn(),
    handleKeyDown: vi.fn(),
    togglePause: vi.fn(),
    addMinute: vi.fn(),
    resetTimer: vi.fn(),
    pauseTimer: vi.fn(),
    onForcedProgressChange: vi.fn(),
  }),
}));

describe('Timer', () => {
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders timer with correct initial state', () => {
    render(<Timer onRemove={mockOnRemove} />);
    
    // Check for main elements
    expect(screen.getByText('01:00')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /\+1:00/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    render(<Timer onRemove={mockOnRemove} />);
    
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);
    
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('displays correct icon based on running state', () => {
    const { rerender } = render(<Timer onRemove={mockOnRemove} />);
    
    // Initially shows Play icon
    expect(screen.getByTestId('play-icon')).toBeInTheDocument();
    
    // Mock running state
    const mockUseTimer = vi.mocked(useTimer);
    mockUseTimer.mockReturnValueOnce({
      ...mockUseTimer(),
      isRunning: true,
    });
    
    rerender(<Timer onRemove={mockOnRemove} />);
    
    // Should show Pause icon
    expect(screen.getByTestId('pause-icon')).toBeInTheDocument();
  });

  it('handles button clicks correctly', () => {
    const mockTogglePause = vi.fn();
    const mockAddMinute = vi.fn();
    const mockResetTimer = vi.fn();
    
    const mockUseTimer = vi.mocked(useTimer);
    mockUseTimer.mockReturnValueOnce({
      ...mockUseTimer(),
      togglePause: mockTogglePause,
      addMinute: mockAddMinute,
      resetTimer: mockResetTimer,
    });
    
    render(<Timer onRemove={mockOnRemove} />);
    
    // Test add minute button
    fireEvent.click(screen.getByRole('button', { name: /\+1:00/i }));
    expect(mockAddMinute).toHaveBeenCalledTimes(1);
    
    // Test play/pause button
    fireEvent.click(screen.getByRole('button', { name: /play/i }));
    expect(mockTogglePause).toHaveBeenCalledTimes(1);
    
    // Test reset button
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(mockResetTimer).toHaveBeenCalledTimes(1);
  });

  it('displays correct time format', () => {
    const mockUseTimer = vi.mocked(useTimer);
    mockUseTimer.mockReturnValueOnce({
      ...mockUseTimer(),
      time: 125, // 2 minutes and 5 seconds
    });
    
    render(<Timer onRemove={mockOnRemove} />);
    expect(screen.getByText('02:05')).toBeInTheDocument();
  });

  it('handles editing state correctly', () => {
    const mockStartEditing = vi.fn();
    const mockHandleBlur = vi.fn();

    // Mock handleKeyDown to call handleBlur when Enter is pressed
    const mockHandleKeyDown = vi.fn((e) => {
      if (e.key === 'Enter') {
        mockHandleBlur();
      }
    });
    const mockUseTimer = vi.mocked(useTimer);
    mockUseTimer.mockReturnValueOnce({
      ...mockUseTimer(),
      isEditing: true,
      editValue: '0230',
      startEditing: mockStartEditing,
      handleBlur: mockHandleBlur,
      handleKeyDown: mockHandleKeyDown,
    });
    
    render(<Timer onRemove={mockOnRemove} />);
    
    // Check for input field
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('02:30');
    
    // Test blur
    fireEvent.blur(input);
    expect(mockHandleBlur).toHaveBeenCalledTimes(1);
    
    // Test keydown
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(mockHandleBlur).toHaveBeenCalledTimes(2);
  });
}); 