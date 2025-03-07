import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { DesignSystemDocumentProps, PDFSectionProps } from "./types";
import { createPDFStyles } from "./styles";
import CoverPage from "./CoverPage";

export const ColorPaletteSection: React.FC<PDFSectionProps> = ({
  data,
  styles,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{data.labels.colors.title}</Text>
    <View style={styles.colorGrid}>
      {Object.entries(data.colorPalette).map(
        ([category, { colors, label }]) => (
          <View key={category} style={styles.colorRow}>
            <Text style={[styles.sectionSubtitle, styles.marginBottomMd]}>
              {label}
            </Text>
            <View style={styles.colorGrid}>
              {Object.entries(colors).map(([name, value]) => (
                <View key={name} style={styles.colorItem}>
                  <View
                    style={[styles.colorPreview, { backgroundColor: value }]}
                  />
                  <View style={styles.colorInfo}>
                    <Text style={styles.labelText}>{name}</Text>
                    <Text style={styles.labelText}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )
      )}
    </View>
  </View>
);

export const TypographySection: React.FC<PDFSectionProps> = ({
  data,
  styles,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{data.labels.typography.title}</Text>
    <View style={styles.typographyItems}>
      {data.typographyStyles.map((style) => (
        <View key={style.name} style={styles.typographyItem}>
          <View style={styles.typographyMeta}>
            <Text style={styles.labelText}>{style.label}</Text>
            <Text style={styles.labelTextSecondary}>{style.specs}</Text>
          </View>
          <Text style={styles[style.variant]}>
            {data.labels.typography.sampleText}
          </Text>
        </View>
      ))}
    </View>
  </View>
);

export const SpacingSection: React.FC<PDFSectionProps> = ({ data, styles }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{data.labels.spacing.title}</Text>
    <View style={styles.spacingGrid}>
      {data.spacingScale.map((item) => (
        <View key={item.name} style={styles.spacingItem}>
          <View style={[styles.spacingPreview, { width: `${item.value}pt` }]} />
          <Text style={[styles.labelText, { fontWeight: 600 }]}>
            {item.value}
            {data.labels.spacing.unitsLabel}
          </Text>
          <Text style={styles.labelText}>{item.description}</Text>
        </View>
      ))}
    </View>
  </View>
);

export const DesignSystemDocument: React.FC<DesignSystemDocumentProps> = ({
  title,
  project,
  data,
  language,
  theme = "light",
}) => {
  const styles = createPDFStyles(theme);

  return (
    <Document title={title} author="ARKM Studio" creator="ARKM Studio">
      {/* Nueva Portada */}
      <Page size="A4" style={styles.page}>
        <CoverPage
          title={title}
          project={project}
          styles={styles}
          language={language}
        />
      </Page>

      {/* Color Palette Section */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{project}</Text>
        </View>

        <ColorPaletteSection data={data} styles={styles} theme={theme} />

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Typography Section */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{project}</Text>
        </View>

        <TypographySection data={data} styles={styles} theme={theme} />

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>

      {/* Spacing Section */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>{project}</Text>
        </View>

        <SpacingSection data={data} styles={styles} theme={theme} />

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
