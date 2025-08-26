import type React from "react";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  showLabel = false,
  label = "",
  animated = true,
}: AnimatedProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (!animated) {
      setDisplayValue(percentage);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayValue(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage, animated]);

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          <span>
            {value}/{max}
          </span>
        </div>
      )}
      <div className="relative">
        <Progress
          value={displayValue}
          className="h-3 transition-all duration-1000 ease-out"
        />
        {animated && (
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-progress-shine"
            style={{ width: `${displayValue}%` }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes progress-shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-progress-shine {
          animation: progress-shine 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

export function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  className = "",
  children,
}: CircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted/20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-accent transition-all duration-1000 ease-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
