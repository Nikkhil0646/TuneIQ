import React from "react";
import { G, Path, Text as SvgText } from "react-native-svg";
import { noteColors } from "@/constants/Colors";

interface KeySegmentProps {
  note: string;
  index: number;
  center: number;
  innerRadius: number;
  outerRadius: number;
  isRoot: boolean;
  isInScale: boolean;
  segmentCount?: number;
  labelFontSize?: number;
  gapAngle?: number;
}

const defaultSegmentCount = 12;
const defaultGapAngle = 0.03;

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => ({
  x: cx + r * Math.cos(angle),
  y: cy + r * Math.sin(angle),
});

const createSegmentPath = (
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) => {
  const startOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return `
    M ${startOuter.x} ${startOuter.y}
    A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
    L ${startInner.x} ${startInner.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
    Z
  `;
};

const prettyNote = (note: string) =>
  note.replace(/#/g, "♯").replace(/b/g, "♭");

const KeySegment: React.FC<KeySegmentProps> = ({
  note,
  index,
  center,
  innerRadius,
  outerRadius,
  isRoot,
  isInScale,
  segmentCount = defaultSegmentCount,
  labelFontSize = 14,
  gapAngle = defaultGapAngle,
}) => {
  const angleStep = (2 * Math.PI) / segmentCount;
  const start = index * angleStep - Math.PI / 2 + gapAngle / 2;
  const end = (index + 1) * angleStep - Math.PI / 2 - gapAngle / 2;
  const mid = (start + end) / 2;

  const labelRadius = (innerRadius + outerRadius) / 2;
  const labelX = center + labelRadius * Math.cos(mid);
  const labelY = center + labelRadius * Math.sin(mid);

  const fillColor = isRoot
    ? "#4CAF50"
    : isInScale
    ? noteColors[note.split("/")[0]] || "#aaa"
    : "#e0e0e0";

  const textColor = isRoot || isInScale ? "#fff" : "#999";

  return (
    <G>
      <Path
        d={createSegmentPath(center, center, innerRadius, outerRadius, start, end)}
        fill={fillColor}
      />
      <SvgText
        x={labelX}
        y={labelY}
        fill={textColor}
        fontSize={labelFontSize}
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {prettyNote(note)}
      </SvgText>
    </G>
  );
};

export default KeySegment;
