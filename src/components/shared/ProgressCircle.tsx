import React from "react";
import "./ProgressCircle.css";
import { useDraggable } from "../../hooks/useDraggable";

interface ProgressCircleProps {
  progress: number; // 0 to 100
  onDragStart: () => void;
  onDrag: (angle: number) => void;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, onDragStart, onDrag }) => {

  // make sure progress is between 0 and 100
  progress = Math.max(0, Math.min(progress, 100));

  const [draggbleRef, dx, dy, angle, setFromAngle] = useDraggable({
        initialAngle: (progress / 100),
        onDragStart,
        onDrag,
    });

  React.useEffect(() => {
    console.log("progress:", progress);
    (setFromAngle as (angle: number) => void)(progress / 100);
  }, [progress]);

    // return (
    //     <div className="radial-progress-bar">
    //         <div className="radial-progress-bar__half radial-progress-bar__half--1" />
    //         <div
    //             className="radial-progress-bar__half radial-progress-bar__half--2"
    //             style={{
    //                 background: angle > 0.5 ? 'rgb(99 102 241)' : 'inherit',
    //                 transform: `rotate(${angle > 0.5 ? 360 * angle - 180 : 360 * angle}deg)`,
    //             }}
    //         />

    //         <div className="radial-progress-bar__overlay" />

    //         <div className="radial-progress-bar__circle">
    //             <div
    //                 className="draggable"
    //                 ref={draggbleRef}
    //                 style={{
    //                     transform: `translate(${dx}px, ${dy}px)`,
    //                     zIndex: 9999,
    //                 }}
    //             />
    //             {Math.round(angle * 100)}%
    //         </div>
    //     </div>
    // );

  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div>
    <svg
      className="progress-ring"
      width="120"
      height="120"
      viewBox="0 0 120 120"
      role="graphics-document" // for testing
    >
      {/* Background circle */}
      <circle
        className="progress-ring__circle-bg"
        stroke="#253238"
        strokeWidth="4"
        fill="transparent"
        r="45"
        cx="60"
        cy="60"
      />
      {/* Progress circle */}
      <circle
        className="progress-ring__circle stroke-red"
        stroke="#dfedfb"
        strokeWidth="4"
        fill="transparent"
        r="45"
        cx="60"
        cy="60"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: strokeDashoffset,
        }}
      />

    </svg>
      <div className="radial-progress-bar__circle">
        <div
          className="draggable"
          ref={draggbleRef}
          style={{
              transform: `translate(${dx}px, ${dy}px)`,
              zIndex: 9999,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressCircle;
