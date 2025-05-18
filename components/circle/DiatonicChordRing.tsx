import React from "react";
import { G, Text as SvgText, Circle as SvgCircle } from "react-native-svg";

interface DiatonicChordRingProps {
  scaleNotes: string[];
  rootNote: string;
  mode: "major" | "minor";
  notePositions: { [note: string]: { x: number; y: number } }; // from useCircleLogic
}

const romanNumeralsMajor = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const romanNumeralsMinor = ["i", "ii°", "III", "iv", "v", "VI", "VII"];

const DiatonicChordRing: React.FC<DiatonicChordRingProps> = ({
  scaleNotes = [],
  rootNote,
  mode,
  notePositions = {},
}) => {
  const romanNumerals = mode === "minor" ? romanNumeralsMinor : romanNumeralsMajor;

  if (!scaleNotes.length) return null; // nothing to render

  return (
    <>
      {scaleNotes.map((note, index) => {
        const pos = notePositions[note];
        if (!pos) return null;

        const numeral = romanNumerals[index] || "?";

        // Highlight root chord differently (optional)
        const isRoot = note === rootNote;

        return (
          <G key={note}>
            <SvgCircle
              cx={pos.x}
              cy={pos.y}
              r={12}
              fill={isRoot ? "#4CAF50" : "#ffffff"}
              stroke={isRoot ? "#388E3C" : "#4CAF50"}
              strokeWidth={isRoot ? 3 : 2}
            />
            <SvgText
              x={pos.x}
              y={pos.y}
              fontSize={12}
              fontWeight="bold"
              fill={isRoot ? "#fff" : "#333"}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {numeral}
            </SvgText>
          </G>
        );
      })}
    </>
  );
};

export default DiatonicChordRing;
