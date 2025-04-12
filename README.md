# Cubic Bezier Input

A shadcn/ui style copy paste-able cubic bezier input.

## Installation

Copy and paste the contents of [this file](https://github.com/501A-gh/cubic-bezier-input/blob/main/app/components/CubicBezier.tsx) into your project.

## Anatomy

Import all parts and piece them together.

```jsx
<CubicBezier>
  // Bezier Grid
  <CubicBezierGrid />
  // Bottom Left Control Point
  <CubicBezierController index={1}>
    <CubicBezierControllerLine />
    <CubicBezierControllerThumb />
  </CubicBezierController>
  // Top Left Control Point
  <CubicBezierController index={2}>
    <CubicBezierControllerLine />
    <CubicBezierControllerThumb />
  </CubicBezierController>
  // Bezier Curve
  <CubicBezierCurve />
  <CubicBezierCurveEnd />
</CubicBezier>
```

## API Usage

### CubicBezier (Root)

| Prop             | Type                                             | Default              | Description                               |
| ---------------- | ------------------------------------------------ | -------------------- | ----------------------------------------- |
| `value`          | `[number,number,number,number]`                  | -                    | The value of the cubic bezier.            |
| `defaultValue`   | `[number,number,number,number]`                  | [0.25, 0.1, 0.25, 1] | The default value of the cubic bezier.    |
| `onValueChange`  | `(value: [number,number,number,number]) => void` | -                    | The callback when the value changes.      |
| `onValueCommit`  | `(value: [number,number,number,number]) => void` | -                    | The callback when the value is committed. |
| `viewBoxPadding` | `number`                                         | 10                   | The padding of the viewBox.               |

### CubicBezierController

| Prop    | Type     | Default | Description                     |
| ------- | -------- | ------- | ------------------------------- |
| `index` | `1 or 2` | -       | The index of the control point. |

### CubicBezierControllerThumb

| Prop | Type     | Default | Description                      |
| ---- | -------- | ------- | -------------------------------- |
| `r`  | `number` | -       | The radius of the control point. |

### CubicBezierCurveEnd

| Prop | Type     | Default | Description                   |
| ---- | -------- | ------- | ----------------------------- |
| `r`  | `number` | 2       | The radius of the end points. |

## Example Usage

- Live Demo: [cubic-bezier-input.vercel.app](https://cubic-bezier-input.vercel.app/)
