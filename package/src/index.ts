"use client";

import {
  CubicBezier as Root,
  CubicBezierCurve as Curve,
  CubicBezierCurveEnd as End,
  CubicBezierGrid as Grid,
  CubicBezierController as Controller,
  CubicBezierControllerThumb as Thumb,
  CubicBezierControllerLine as Line,
} from "./cubic-bezier";

// Create namespace object
const CubicBezier = {
  Root,
  Grid,
  Curve,
  End,
  Controller,
  Thumb,
  Line,
};

export default CubicBezier;
