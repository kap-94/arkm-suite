import React from "react";
import {
  View,
  Text,
  Svg,
  Path,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { formatCustomDate } from "@/utils/date-utils";
import { capitalizeAndFormat } from "@/utils/text-utils";

interface CoverPageProps {
  title: string;
  project: string;
  language: string;
  styles: {
    [key: string]: Style;
    cover: Style;
    coverTitle: Style;
    coverSubtitle: Style;
    coverProject: Style;
    coverDate: Style;
  };
}

const CoverPage: React.FC<CoverPageProps> = ({
  title,
  project,
  styles,
  language,
}) => {
  const currentDate = formatCustomDate(new Date(), "MMMM D, YYYY", language);

  return (
    <View style={[styles.cover, { padding: 0 }]}>
      {/* Background SVG - Organic Waves Pattern */}
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        style={{ position: "absolute", marginTop: 200 }}
      >
        <Defs>
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
            <Stop offset="100%" stopColor="#6366f1" stopOpacity={1} />
          </LinearGradient>

          {/* Wave Gradients */}
          <LinearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="white" stopOpacity={0.1} />
            <Stop offset="50%" stopColor="white" stopOpacity={0.05} />
            <Stop offset="100%" stopColor="white" stopOpacity={0.1} />
          </LinearGradient>
        </Defs>

        {/* Main Background */}
        <Rect width="800" height="600" fill="url(#bgGradient)" />

        {/* Organic Wave Patterns */}
        <G>
          {/* Wave 1 - Primera onda más arriba */}
          <Path
            d="M 0 300 C 200 250, 400 350, 800 300 L 800 1100 L 0 1100 Z"
            fill="url(#waveGradient1)"
          />

          {/* Wave 2 - Segunda onda */}
          <Path
            d="M 0 350 C 300 300, 500 400, 800 350 L 800 1100 L 0 1100 Z"
            fill="white"
            opacity={0.05}
          />

          {/* Wave 3 - Última onda que llega hasta el final */}
          <Path
            d="M 0 400 C 200 380, 600 420, 800 400 L 800 1000 L 0 1000 Z"
            // d="M 0 400 C 200 380, 600 420, 800 400 L 800 600 L 0 600 Z"
            fill="white"
            opacity={0.08}
          />
        </G>
      </Svg>

      {/* Content Container */}
      <View
        style={{
          paddingVertical: 40,
          paddingHorizontal: 46,
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Header */}
        <View style={{ alignItems: "flex-start", marginTop: 48 }}>
          <Text style={[styles.coverTitle]}>ARKM Studio</Text>
          <View
            style={{
              width: 36,
              height: 2,
              backgroundColor: "#ffffff",
              marginBottom: 40,
            }}
          />
        </View>

        {/* Main Title Area */}
        <View
          style={{
            alignItems: "flex-start",
            marginTop: -140,
            marginBottom: 80,
          }}
        >
          <Text style={styles.coverSubtitle}>{title}</Text>
          <Text
            style={[
              styles.coverProject,
              { fontSize: 24, textAlign: "left", opacity: 0.9 },
            ]}
          >
            {project}
          </Text>
        </View>

        {/* Footer */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.coverDate}>
            {capitalizeAndFormat(currentDate)}
          </Text>
          {/* <Text style={[styles.coverDate, { fontSize: 14, opacity: 0.8 }]}>
            Design System Documentation
          </Text> */}
        </View>
      </View>
    </View>
  );
};

export default CoverPage;
