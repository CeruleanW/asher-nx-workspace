import React from 'react';
import { grey } from '@root/shared/styles';

interface SVGLineProps {
  height: number | string;
}

export default function SVGLine({ height }: SVGLineProps) {
  // A simple horizontal line in SVG
  return (
    <svg height={height} width={80}>
      <g fill="none">
        <path stroke={grey[500]} d="M5 20 l215 0" />
      </g>
    </svg>
  );
}
