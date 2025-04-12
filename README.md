# Cubic Bezier Input

A shadcn/ui style copy paste-able cubic bezier input.

## Installation

Copy and paste

## Anatomy

Import all parts and piece them together.

```ts
<CubicBezier>
  // Bezier Grid
  <CubicBezierGrid/>

  // Bottom Left Control Point
  <CubicBezierController index={1}>
    <CubicBezierControllerLine/>
    <CubicBezierControllerThumb/>
  </CubicBezierController>

  // Top Left Control Point
  <CubicBezierController index={2}>
    <CubicBezierControllerLine/>
    <CubicBezierControllerThumb/>
  </CubicBezierController>

  // Bezier Curve
  <CubicBezierCurve/>
  <CubicBezierCurveEnd/>
</CubicBezier>
```

## API Usage

### CubicBezier (Root)

| Prop            | Type                                             | Default | Description                               |
| --------------- | ------------------------------------------------ | ------- | ----------------------------------------- |
| `value`         | `[number,number,number,number]`                  | -       | The value of the cubic bezier.            |
| `onValueChange` | `(value: [number,number,number,number]) => void` | -       | The callback when the value changes.      |
| `onValueCommit` | `(value: [number,number,number,number]) => void` | -       | The callback when the value is committed. |

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
| `r`  | `number` | -       | The radius of the end points. |

## Example Usage

- Live Demo: [cubic-bezier-input.vercel.app](https://cubic-bezier-input.vercel.app/)
