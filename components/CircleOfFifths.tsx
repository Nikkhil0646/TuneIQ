import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { noteColors } from "@/constants/Colors";

interface CircleOfFifthsProps {
  scaleNotes: string[];
  selectedRootNote: string;
  onNoteSelect: (note: string) => void;
}

const CIRCLE_NOTES = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#/Gb",
  "C#/Db",
  "G#/Ab",
  "D#/Eb",
  "A#/Bb",
  "F",
];

const RADIUS = 120;
const CENTER = 150;
const INNER_RADIUS = 80;
const OUTER_RADIUS = RADIUS;
const SEGMENTS = CIRCLE_NOTES.length;
const ANGLE_STEP = (2 * Math.PI) / SEGMENTS;
const GAP_ANGLE = 0.03;

const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angle: number
) => ({
  x: cx + radius * Math.cos(angle),
  y: cy + radius * Math.sin(angle),
});

const createSegmentPath = (startAngle: number, endAngle: number) => {
  const startOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, startAngle);
  const endOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, endAngle);
  const startInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, endAngle);
  const endInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, startAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  return `
    M ${startOuter.x} ${startOuter.y}
    A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
    L ${startInner.x} ${startInner.y}
    A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
    Z
  `;
};

const normalizeNote = (note: string = "") =>
  typeof note === "string" ? note.split("/")[0] : "";

const normalizeNoteVariants = (note: string = "") =>
  typeof note === "string" ? note.split("/").map((n) => n.trim()) : [];

const prettyNote = (note: string = "") =>
  note.replace(/#/g, "♯").replace(/b/g, "♭");

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({
  scaleNotes = [],
  selectedRootNote = "",
  onNoteSelect,
}) => {
  const normalizedScaleNotes = (scaleNotes ?? []).map((n) => normalizeNote(n));
  const normalizedSelectedRoot = normalizeNote(selectedRootNote);

  return (
    <View style={styles.container}>
      <Svg height="300" width="300">
        {CIRCLE_NOTES.map((note, i) => {
          const fullStartAngle = i * ANGLE_STEP - Math.PI / 2;
          const fullEndAngle = fullStartAngle + ANGLE_STEP;
          const startAngle = fullStartAngle + GAP_ANGLE / 2;
          const endAngle = fullEndAngle - GAP_ANGLE / 2;
          const midAngle = (startAngle + endAngle) / 2;

          const labelRadius = (OUTER_RADIUS + INNER_RADIUS) / 2;
          const labelX = CENTER + labelRadius * Math.cos(midAngle);
          const labelY = CENTER + labelRadius * Math.sin(midAngle);

          const enharmonics = normalizeNoteVariants(note);
          const normalizedNote = normalizeNote(note);
          const isInScale = enharmonics.some((n) =>
            normalizedScaleNotes.includes(n)
          );
          const isRoot = enharmonics.some((n) => n === normalizedSelectedRoot);

          const fillColor = isRoot
            ? "#4CAF50"
            : isInScale
            ? noteColors[normalizeNote(enharmonics[0])] || "#bdbdbd"
            : "#e0e0e0";

          const textColor = isRoot || isInScale ? "#fff" : "#999";

          return (
            <G key={i}>
              <TouchableWithoutFeedback
                onPress={() => onNoteSelect(normalizedNote)}
              >
                <G>
                  <Path
                    d={createSegmentPath(startAngle, endAngle)}
                    fill={fillColor}
                  />
                  <SvgText
                    x={labelX}
                    y={labelY}
                    fill={textColor}
                    fontSize={14}
                    fontWeight="bold"
                    fontFamily="Montserrat"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {prettyNote(note)}
                  </SvgText>
                </G>
              </TouchableWithoutFeedback>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

export default CircleOfFifths;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
