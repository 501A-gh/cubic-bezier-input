"use client";
import * as React from "react";

// Types for the component props
export type CubicBezierProps = {
  value?: [number, number, number, number];
  defaultValue?: [number, number, number, number];
  onValueChange?: (value: [number, number, number, number]) => void;
  onValueCommit?: (value: [number, number, number, number]) => void;
  viewBoxPadding?: number;
  minY?: number;
  maxY?: number;
  className?: string;
  children?: React.ReactNode;
};

const CubicBezierContext = React.createContext<{
  value: [number, number, number, number];
  updatePoint: (index: 1 | 2, x: number, y: number) => void;
  commitPoint: (index: 1 | 2, x: number, y: number) => void;
  viewBoxPadding: number;
} | null>(null);

export const useCubicBezierContext = () => {
  const context = React.useContext(CubicBezierContext);
  if (!context) {
    throw new Error(
      "Cubic bezier components must be used within a CubicBezier component",
    );
  }
  return context;
};

// Control point context for sharing state between control point components
const ControlPointContext = React.createContext<{
  index: 1 | 2;
  x: number;
  y: number;
  cx: number;
  cy: number;
  handlePointerDown: (e: React.PointerEvent<SVGElement>) => void;
  handlePointerMove: (e: React.PointerEvent<SVGElement>) => void;
  handlePointerUp: (e: React.PointerEvent<SVGElement>) => void;
} | null>(null);

export const useControlPointContext = () => {
  const context = React.useContext(ControlPointContext);
  if (!context) {
    throw new Error(
      "Control point components must be used within a CubicBezierControlPoint",
    );
  }
  return context;
};

export function CubicBezier({
  defaultValue = [0.25, 0.1, 0.25, 1],
  value: controlledValue,
  onValueChange,
  onValueCommit,
  viewBoxPadding = 10,
  minY,
  maxY,
  className,
  children,
  ...props
}: CubicBezierProps) {
  // Ensure defaultValue has no NaN values
  const safeDefaultValue: [number, number, number, number] = [
    isNaN(defaultValue[0]) ? 0.25 : defaultValue[0],
    isNaN(defaultValue[1]) ? 0.1 : defaultValue[1],
    isNaN(defaultValue[2]) ? 0.25 : defaultValue[2],
    isNaN(defaultValue[3]) ? 1 : defaultValue[3],
  ];

  const [internalValue, setInternalValue] =
    React.useState<[number, number, number, number]>(safeDefaultValue);

  // Use controlled or uncontrolled value
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const updatePoint = React.useCallback(
    (index: 1 | 2, x: number, y: number) => {
      // Clamp x to 0-1 range, y can be any value
      const clampedX = Math.max(0, Math.min(1, x));
      let clampedY = y;
      if (minY !== undefined) clampedY = Math.max(minY, clampedY);
      if (maxY !== undefined) clampedY = Math.min(maxY, clampedY);

      const newValue: [number, number, number, number] = [...value];
      if (index === 1) {
        newValue[0] = clampedX;
        newValue[1] = clampedY;
      } else {
        newValue[2] = clampedX;
        newValue[3] = clampedY;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }

      onValueChange?.(newValue);
    },
    [value, onValueChange, controlledValue, minY, maxY],
  );

  const commitPoint = React.useCallback(
    (index: 1 | 2, x: number, y: number) => {
      // Clamp x to 0-1 range, y can be any value
      const clampedX = Math.max(0, Math.min(1, x));
      let clampedY = y;
      if (minY !== undefined) clampedY = Math.max(minY, clampedY);
      if (maxY !== undefined) clampedY = Math.min(maxY, clampedY);

      const newValue: [number, number, number, number] = [...value];
      if (index === 1) {
        newValue[0] = clampedX;
        newValue[1] = clampedY;
      } else {
        newValue[2] = clampedX;
        newValue[3] = clampedY;
      }

      onValueCommit?.(newValue);
    },
    [value, onValueCommit, minY, maxY],
  );

  // Calculate viewBox dimensions based on padding
  const viewBoxMinX = -viewBoxPadding;
  const viewBoxMinY = -viewBoxPadding;
  const viewBoxWidth = 100 + viewBoxPadding * 2;
  const viewBoxHeight = 100 + viewBoxPadding * 2;
  const viewBox = `${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}`;

  return (
    <CubicBezierContext.Provider
      value={{ value, updatePoint, commitPoint, viewBoxPadding }}
    >
      <div className={className} {...props}>
        {/* Use a viewBox with adjustable padding */}
        <svg
          width="100%"
          height="100%"
          viewBox={viewBox}
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {children}
        </svg>
      </div>
    </CubicBezierContext.Provider>
  );
}

export function CubicBezierGrid({ ...props }: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <rect x="0" y="0" width="100" height="100" />
      <line x1="0" y1="0" x2="100" y2="0" />
      <line x1="0" y1="25" x2="100" y2="25" />
      <line x1="0" y1="50" x2="100" y2="50" />
      <line x1="0" y1="75" x2="100" y2="75" />
      <line x1="0" y1="100" x2="100" y2="100" />

      <line x1="0" y1="0" x2="0" y2="100" />
      <line x1="25" y1="0" x2="25" y2="100" />
      <line x1="50" y1="0" x2="50" y2="100" />
      <line x1="75" y1="0" x2="75" y2="100" />
      <line x1="100" y1="0" x2="100" y2="100" />
    </g>
  );
}

export function CubicBezierCurve({ ...props }: React.SVGProps<SVGPathElement>) {
  const { value } = useCubicBezierContext();
  const [p1x, p1y, p2x, p2y] = value;

  const path = `M 0,100 C ${isNaN(p1x) ? 0 : p1x * 100},${isNaN(p1y) ? 0 : 100 - p1y * 100} ${
    isNaN(p2x) ? 0 : p2x * 100
  },${isNaN(p2y) ? 0 : 100 - p2y * 100} 100,0`;

  return (
    <g>
      <path d={path} fill="none" {...props} />
      {props.children}
    </g>
  );
}

export function CubicBezierCurveEnd({
  r = 2,
  ...props
}: React.SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <circle cx="100" cy="0" r={r} />
      <circle cx="0" cy="100" r={r} />
    </g>
  );
}

type ControllerProps = {
  index: 1 | 2;
  className?: string;
  children?: React.ReactNode;
};

export function CubicBezierController({
  index,
  className,
  children,
}: ControllerProps) {
  const { value, updatePoint, commitPoint, viewBoxPadding } =
    useCubicBezierContext();
  const [p1x, p1y, p2x, p2y] = value;

  // Get the appropriate coordinates based on the index
  const x = index === 1 ? p1x : p2x;
  const y = index === 1 ? p1y : p2y;

  // Calculate SVG coordinates
  const cx = x * 100;
  const cy = 100 - y * 100;

  // Create a ref for tracking drag state
  const dragRef = React.useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startPointX: 0,
    startPointY: 0,
  });

  // Simple direct drag handling
  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      e.preventDefault();

      // Get the SVG element
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;

      // Set up drag state
      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startPointX: x,
        startPointY: y,
      };

      // Set pointer capture to ensure we get all events
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [x, y],
  );

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      if (!dragRef.current.isDragging) return;

      // Get the SVG element
      const svg = e.currentTarget.ownerSVGElement;
      if (!svg) return;

      // Get current SVG dimensions
      const svgRect = svg.getBoundingClientRect();

      // Calculate the grid area dimensions (100x100 in SVG units)
      // Adjust for the expanded viewBox with dynamic padding
      const totalWidth = 100 + viewBoxPadding * 2;
      const totalHeight = 100 + viewBoxPadding * 2;
      const gridWidth = svgRect.width * (100 / totalWidth);
      const gridHeight = svgRect.height * (100 / totalHeight);

      // Calculate the delta in pixels
      const deltaX = e.clientX - dragRef.current.startX;
      const deltaY = e.clientY - dragRef.current.startY;

      // Convert to SVG coordinate space (0-1)
      // Allow visual dragging beyond grid but will be clamped in updatePoint
      const newX = dragRef.current.startPointX + deltaX / gridWidth;
      const newY = dragRef.current.startPointY - deltaY / gridHeight;

      // Update the point position
      updatePoint(index, newX, newY);
    },
    [index, updatePoint, viewBoxPadding],
  );

  const handlePointerUp = React.useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      if (!dragRef.current.isDragging) return;

      // Reset drag state
      dragRef.current.isDragging = false;

      // Release pointer capture
      e.currentTarget.releasePointerCapture(e.pointerId);

      // Commit the final value
      commitPoint(index, x, y);
    },
    [commitPoint, index, x, y],
  );

  // If no children are provided, render the default control point
  if (!children) {
    return (
      <g className={className}>
        <CubicBezierControllerLine />
        <CubicBezierControllerThumb />
      </g>
    );
  }

  // Otherwise, provide the context for the children
  return (
    <ControlPointContext.Provider
      value={{
        index,
        x,
        y,
        cx,
        cy,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
      }}
    >
      <g className={className}>{children}</g>
    </ControlPointContext.Provider>
  );
}

type ControllerThumbProps = Omit<React.SVGProps<SVGCircleElement>, "cx" | "cy">;

export function CubicBezierControllerThumb({
  r = 5,
  ...props
}: ControllerThumbProps) {
  const { cx, cy, handlePointerDown, handlePointerMove, handlePointerUp } =
    useControlPointContext();

  return (
    <circle
      cx={isNaN(cx) ? 0 : cx}
      cy={isNaN(cy) ? 0 : cy}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: "none" }}
      r={r}
      {...props}
    />
  );
}

type ControllerLineProps = Omit<
  React.SVGProps<SVGLineElement>,
  "x1" | "y1" | "x2" | "y2"
>;

export function CubicBezierControllerLine({ ...props }: ControllerLineProps) {
  const { index, cx, cy } = useControlPointContext();

  // Determine the anchor point based on the index
  const x1 = index === 1 ? 0 : 100;
  const y1 = index === 1 ? 100 : 0;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={isNaN(cx) ? 0 : cx}
      y2={isNaN(cy) ? 0 : cy}
      {...props}
    />
  );
}
