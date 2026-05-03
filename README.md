![Cubic Bezier Input](www/public/og.png)

# Cubic Bezier Input

An unstyled and highly composable cubic bezier input.

You can view the live demo [here](https://cubic-bezier-input.vercel.app)

## Installation

```
npm install cubic-bezier-input
```

## Anatomy

Like in shadcn/ui or Radix you can import all parts and piece them together.

```jsx
<CubicBezier.Root>
  <CubicBezier.Grid />
  <CubicBezier.Controller index={1}>
    <CubicBezier.Line />
    <CubicBezier.Thumb />
  </CubicBezier.Controller>
  <CubicBezier.Controller index={2}>
    <CubicBezier.Line />
    <CubicBezier.Thumb />
  </CubicBezier.Controller>
  <CubicBezier.Curve>
    <CubicBezier.End />
  </CubicBezier.Curve>
</CubicBezier.Root>
```

## API Usage
All components come with a `className` prop and are unstyled by default making it easy to style using Tailwind.
Since the curves and grid are rendered with SVG's, you can customize their appearance using utility classes like `fill-*` and `stroke-*`.
For a better idea of how to use the component, check out the [example usage](https://github.com/501A-gh/cubic-bezier-input/blob/main/www/app/Editor.tsx).

### Root

| Prop             | Type                                             | Default                | Description                               |
| ---------------- | ------------------------------------------------ | ---------------------- | ----------------------------------------- |
| `value`          | `[number,number,number,number]`                  | -                      | The value of the cubic bezier.            |
| `defaultValue`   | `[number,number,number,number]`                  | `[0.25, 0.1, 0.25, 1]` | The default value of the cubic bezier.    |
| `onValueChange`  | `(value: [number,number,number,number]) => void` | -                      | The callback when the value changes.      |
| `onValueCommit`  | `(value: [number,number,number,number]) => void` | -                      | The callback when the value is committed. |
| `viewBoxPadding` | `number`                                         | `10`                   | The padding of the viewBox.               |
| `minY`           | `number`                                         | -                      | The minimum value the Y coordinate can reach. |
| `maxY`           | `number`                                         | -                      | The maximum value the Y coordinate can reach. |

### Controller

| Prop    | Type     | Default | Description                   |
| ------- | -------- | ------- | ----------------------------- |
| `index` | `1 or 2` | -       | The index of the controllers. |

### Thumb

| Prop | Type     | Default | Description                       |
| ---- | -------- | ------- | --------------------------------- |
| `r`  | `number` | `5`     | The radius of the control thumbs. |

### End

| Prop | Type     | Default | Description                   |
| ---- | -------- | ------- | ----------------------------- |
| `r`  | `number` | `2`     | The radius of the end points. |
