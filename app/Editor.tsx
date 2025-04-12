"use client";
import { useState } from "react";
import {
  CubicBezier,
  CubicBezierController,
  CubicBezierControllerLine,
  CubicBezierControllerThumb,
  CubicBezierCurve,
  CubicBezierCurveEnd,
  CubicBezierGrid,
} from "./components/CubicBezier";

export const Editor = () => {
  const [bezierValue, setBezierValue] = useState<
    [number, number, number, number]
  >([0.25, 0.1, 0.25, 1]);

  return (
    <section className="flex items-center justify-center flex-col gap-8">
      <CubicBezier
        value={bezierValue}
        onValueChange={(value: [number, number, number, number]) =>
          setBezierValue(value)
        }
        onValueCommit={(value: [number, number, number, number]) => {
          console.log("Value committed:", value);
        }}
        viewBoxPadding={14}
        className="w-64 h-64 border-zinc-200 dark:border-zinc-800 shadow-xs rounded-lg bg-white dark:bg-zinc-900"
      >
        <CubicBezierGrid className="fill-zinc-50 dark:fill-zinc-950/50 stroke-[0.5px] stroke-zinc-200 dark:stroke-zinc-800" />

        <CubicBezierController index={1}>
          <CubicBezierControllerLine className="stroke-blue-300 dark:stroke-blue-700 stroke-[1px]" />
          <CubicBezierControllerThumb className="fill-blue-500" r={3} />
        </CubicBezierController>

        <CubicBezierController index={2}>
          <CubicBezierControllerLine className="stroke-green-300 dark:stroke-green-700 stroke-[1px]" />
          <CubicBezierControllerThumb className="fill-green-500" r={3} />
        </CubicBezierController>

        <CubicBezierCurve
          className="stroke-1 stroke-zinc-500 dark:stroke-zinc-400"
          strokeLinecap="round"
        />
        <CubicBezierCurveEnd
          className="fill-zinc-950 dark:fill-zinc-50"
          r={2}
        />
      </CubicBezier>
      <code className="opacity-50 text-xs">{`cubic-bezier(${bezierValue.map((v) => v.toFixed(2)).join(", ")})`}</code>
    </section>
  );
};
