import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressCircle from '../ProgressCircle';

describe('ProgressCircle', () => {
  it('renders with correct SVG structure', () => {
    render(<ProgressCircle progress={50} />);
    
    // Check for SVG element
    const svg = screen.getByRole('graphics-document', { hidden: true });
    expect(svg).toBeInTheDocument();
    expect(svg.tagName).toBe('svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 120 120');

    // unnecessary?
    // Check for background circle
    const bgCircle = svg.querySelector('.progress-ring__circle-bg') as SVGElement;
    expect(bgCircle).toBeInTheDocument();
    expect(bgCircle?.getAttribute('stroke')).toBe('#253238');
    expect(bgCircle?.getAttribute('stroke-width')).toBe('4');
    expect(bgCircle?.getAttribute('fill')).toBe('transparent');
    expect(bgCircle?.getAttribute('r')).toBe('45');
    expect(bgCircle?.getAttribute('cx')).toBe('60');
    expect(bgCircle?.getAttribute('cy')).toBe('60');

    // unnecessary?
    // Check for progress circle
    const progressCircle = svg.querySelector('.progress-ring__circle-empty') as SVGElement;
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle?.getAttribute('stroke')).toBe('#dfedfb');
    expect(progressCircle?.getAttribute('stroke-width')).toBe('4');
    expect(progressCircle?.getAttribute('fill')).toBe('transparent');
    expect(progressCircle?.getAttribute('r')).toBe('45');
    expect(progressCircle?.getAttribute('cx')).toBe('60');
    expect(progressCircle?.getAttribute('cy')).toBe('60');
  });

  it('calculates correct stroke-dashoffset for different progress values', () => {
    const { rerender } = render(<ProgressCircle progress={0} />);
    const svg = screen.getByRole('graphics-document', { hidden: true });
    const progressCircle = svg.querySelector('.progress-ring__circle-empty') as SVGElement;
    const circumference = 2 * Math.PI * 45; // r=45
    expect(progressCircle?.style.strokeDasharray).toBe(`${circumference} ${circumference}`);
    expect(progressCircle?.style.strokeDashoffset).toBe(`${circumference}`);

    rerender(<ProgressCircle progress={50} />);
    expect(progressCircle?.style.strokeDasharray).toBe(`${circumference} ${circumference}`);
    expect(progressCircle?.style.strokeDashoffset).toBe(`${circumference / 2}`);

    rerender(<ProgressCircle progress={100} />);
    expect(progressCircle?.style.strokeDasharray).toBe(`${circumference} ${circumference}`);
    expect(progressCircle?.style.strokeDashoffset).toBe('0');
  });

  it('handles edge cases correctly', () => {
    const { rerender } = render(<ProgressCircle progress={-10} />);
    const svg = screen.getByRole('graphics-document', { hidden: true });
    const progressCircle = svg.querySelector('.progress-ring__circle-empty') as SVGElement;
    const circumference = 2 * Math.PI * 45;
    expect(progressCircle?.style.strokeDashoffset).toBe(`${circumference}`);

    rerender(<ProgressCircle progress={150} />);
    expect(progressCircle?.style.strokeDashoffset).toBe('0');
  });

}); 