import React from 'react';
import {
  Document, Page, View, Text, Font, StyleSheet, Image
} from '@react-pdf/renderer';
import { getSectionsConfig, getKeyTakeawayColors } from '@/components/poster-preview/academicModernUtils';
import { posterTheme } from '@/constants/posterTheme';

// Register fonts with proper weight variants
Font.register({ family: 'Merriweather', src: '/fonts/Merriweather-Regular.ttf' });
Font.register({ family: 'Merriweather-Bold', src: '/fonts/Merriweather-Bold.ttf' });
Font.register({ family: 'Roboto', src: '/fonts/Roboto-Regular.ttf' });
Font.register({ family: 'Roboto-Bold', src: '/fonts/Roboto-Bold.ttf' });
Font.register({ family: 'Roboto-Medium', src: '/fonts/Roboto-Medium.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: posterTheme.spacing.pagePadding,
    fontFamily: 'Roboto',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: posterTheme.spacing.headerMargin,
  },
  title: {
    fontSize: posterTheme.fontSizes.title,
    fontFamily: 'Merriweather-Bold',
    fontWeight: 900,
    color: '#264796',
    textAlign: 'center',
    flex: 1,
    marginRight: posterTheme.spacing.headerMargin * 1.5,
    letterSpacing: 0.5,
  },
  qrBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: posterTheme.spacing.keyCircle * 2.1,
  },
  qrImage: {
    width: posterTheme.spacing.keyCircle * 1.6,
    height: posterTheme.spacing.keyCircle * 1.6,
    marginBottom: posterTheme.spacing.headerMargin / 4,
  },
  qrCaption: {
    fontSize: posterTheme.fontSizes.qrCaption,
    color: '#264796',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontWeight: 700,
  },
  subtitleRow: {
    flexDirection: 'row',
    borderTopWidth: posterTheme.border.subtitle,
    borderBottomWidth: posterTheme.border.subtitle,
    borderColor: '#264796',
    marginBottom: posterTheme.spacing.subtitleMargin,
    marginTop: posterTheme.spacing.headerMargin / 2,
    paddingVertical: posterTheme.spacing.headerMargin,
    alignItems: 'center',
  },
  subtitleCell: {
    flex: 1,
    fontSize: posterTheme.fontSizes.subtitle,
    color: '#264796',
    fontFamily: 'Merriweather-Bold',
    textAlign: 'center',
    fontWeight: 700,
    letterSpacing: 0.2,
  },
  grid: {
    flexDirection: 'row',
    gap: posterTheme.spacing.tileGap,
    width: '100%',
    flex: 1,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    gap: posterTheme.spacing.tileGap,
    minWidth: 0,
  },
  sectionTile: {
    borderRadius: posterTheme.radius.tile,
    marginBottom: 0,
    overflow: 'hidden',
    borderWidth: posterTheme.border.tile,
    borderColor: '#fff',
    flex: 1,
    minWidth: 0,
    boxShadow: '0 4px 16px rgba(38,71,150,0.08)',
  },
  sectionHeader: {
    fontSize: posterTheme.fontSizes.sectionHeader,
    fontFamily: 'Merriweather-Bold',
    fontWeight: 900,
    padding: posterTheme.spacing.sectionPadding * 0.7,
    borderBottomWidth: posterTheme.border.sectionHeader,
    borderBottomColor: '#fff',
    letterSpacing: 0.2,
  },
  sectionContent: {
    fontSize: posterTheme.fontSizes.body,
    fontFamily: 'Roboto',
    padding: posterTheme.spacing.sectionPadding,
    lineHeight: 1.6,
    fontWeight: 400,
  },
  keyTakeawaysHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: posterTheme.spacing.keyTakeawayMargin,
    marginTop: posterTheme.spacing.keyTakeawayMargin,
  },
  keyTakeawaysLine: {
    flex: 1,
    height: posterTheme.border.keyTakeaway,
    backgroundColor: '#264796',
  },
  keyTakeawaysHeaderText: {
    fontSize: posterTheme.fontSizes.sectionHeader * 0.88,
    fontFamily: 'Merriweather-Bold',
    fontWeight: 900,
    color: '#264796',
    marginHorizontal: posterTheme.spacing.keyTakeawayMargin,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  keyTakeawayTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: posterTheme.radius.keyTakeaway,
    marginBottom: posterTheme.spacing.keyTakeawayMargin,
    minHeight: posterTheme.spacing.keyCircle * 1.3,
    padding: 0,
    borderWidth: posterTheme.border.keyTakeaway,
    borderColor: '#E0E6F6',
    boxShadow: '0 2px 8px rgba(38,71,150,0.06)',
  },
  keyCircle: {
    width: posterTheme.spacing.keyCircle,
    height: posterTheme.spacing.keyCircle,
    borderRadius: posterTheme.spacing.keyCircle / 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: posterTheme.spacing.keyCircle / 3.5,
  },
  keyCircleText: {
    fontSize: posterTheme.spacing.keyCircleText,
    fontWeight: 900,
    fontFamily: 'Merriweather-Bold',
    letterSpacing: 0.1,
  },
  keyTextBlock: {
    flex: 1,
    paddingVertical: posterTheme.spacing.keyCircle / 4.5,
    paddingRight: posterTheme.spacing.keyCircle / 3.5,
  },
  keyPoint: {
    fontSize: posterTheme.fontSizes.keyTakeaway,
    fontWeight: 900,
    color: '#264796',
    fontFamily: 'Merriweather-Bold',
    marginBottom: posterTheme.spacing.keyCircle / 14,
    letterSpacing: 0.1,
  },
  keyDesc: {
    fontSize: posterTheme.fontSizes.body * 0.73,
    color: '#264796',
    fontFamily: 'Roboto',
    fontWeight: 400,
  },
  referencesTile: {
    backgroundColor: '#3E3C72',
    borderRadius: posterTheme.radius.reference,
    padding: posterTheme.spacing.sectionPadding,
    marginTop: posterTheme.spacing.keyTakeawayMargin,
  },
  referencesHeader: {
    fontSize: posterTheme.fontSizes.sectionHeader * 0.69,
    fontWeight: 900,
    color: '#fff',
    fontFamily: 'Merriweather-Bold',
    marginBottom: posterTheme.spacing.referenceMargin,
    letterSpacing: 0.1,
  },
  reference: {
    fontSize: posterTheme.fontSizes.reference,
    color: '#fff',
    fontFamily: 'Roboto',
    marginBottom: posterTheme.spacing.referenceMargin / 3,
    fontWeight: 400,
  },
});

const PdfDocument = ({ posterData, designSettings }) => {
  const sections = getSectionsConfig(posterData);
  const keyTakeawayColors = getKeyTakeawayColors();
  const keypoints = posterData.keypoints || [];
  const keyDescriptions = posterData.keyDescriptions || [];
  const keyVisibility = posterData.keyVisibility || [];
  const visibleKeyPoints = keypoints
    .map((point, i) => ({ point, description: keyDescriptions[i] || '', visible: keyVisibility[i] !== false }))
    .filter(kp => kp.visible && kp.point && kp.point.trim());
  const references = (posterData.references || '').split('\n').filter(r => r.trim());
  const images = (posterData.images || []).filter(img => img.visible !== false && img.url);

  // Calculate optimal column count like the masonry grid
  const calculateOptimalColumns = () => {
    // Try to get the actual column count from the preview's masonry grid
    if (typeof window !== 'undefined' && (window as any).__POSTER_COLUMN_COUNT__) {
      return (window as any).__POSTER_COLUMN_COUNT__;
    }

    // Fallback to calculating it ourselves if not available
    const activeSections = sections.filter(section => section.content?.trim());
    const hasImages = images.length > 0;
    const hasKeyTakeaways = visibleKeyPoints.length > 0;
    const hasReferences = references.length > 0;
    
    // Count total items
    const totalItems = activeSections.length + (hasImages ? 1 : 0) + (hasKeyTakeaways ? 1 : 0) + (hasReferences ? 1 : 0);
    
    // Calculate content density
    let totalContentLength = 0;
    activeSections.forEach(section => {
      totalContentLength += section.content?.length || 0;
    });
    const avgContentLength = totalItems > 0 ? totalContentLength / totalItems : 0;
    
    // Determine max columns based on orientation
    const maxColumns = designSettings.orientation === 'landscape' ? 4 : 3;

    // Calculate optimal columns using same logic as masonry grid
    let optimalCols = 2; // Always start from 2 columns
    if (totalItems <= 6 && avgContentLength < 800) {
      optimalCols = 2;
    } else if (totalItems <= 9 && avgContentLength < 1200) {
      optimalCols = Math.min(3, maxColumns);
    } else {
      optimalCols = maxColumns;
    }
    
    // Check if columns would be too wide (over 400px) and adjust accordingly
    // Use PDF width: 2384pt - page padding (56pt * 2) = 2272pt available width
    const availableWidth = 2272; // posterTheme.width - (posterTheme.spacing.pagePadding * 2)
    const gap = posterTheme.spacing.tileGap;

    // Calculate column width for current optimal columns
    const columnWidth = (availableWidth - (gap * (optimalCols - 1))) / optimalCols;
    
    // If column width exceeds 1192pt (equivalent to 400px in old preview), increase columns
    while (columnWidth > 1192 && optimalCols < maxColumns) {
      optimalCols++;
      const newColumnWidth = (availableWidth - (gap * (optimalCols - 1))) / optimalCols;
      if (newColumnWidth <= 1192) break;
    }
    
    // Ensure we don't have more columns than items, but minimum 2
    return Math.max(2, Math.min(optimalCols, totalItems, maxColumns));
  };

  const optimalColumns = calculateOptimalColumns();

  return (
    <Document>
      <Page size="A0" style={styles.page}>
        {/* Header Row: Title + QR */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{posterData.title}</Text>
          {posterData.qrCodeUrl && posterData.showQrCode !== false && (
            <View style={styles.qrBlock}>
              <Image src={posterData.qrCodeUrl} style={styles.qrImage} />
              {posterData.qrCodeCaption && (
                <Text style={styles.qrCaption}>{posterData.qrCodeCaption}</Text>
              )}
            </View>
          )}
        </View>
        {/* Subtitle Row: Authors, Institution, Email */}
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitleCell}>{posterData.authors}</Text>
          <Text style={styles.subtitleCell}>{posterData.school}</Text>
          <Text style={styles.subtitleCell}>{posterData.contact}</Text>
        </View>
        {/* Main Grid - Dynamic columns to match preview */}
        <View style={styles.grid}>
          {(() => {
            // Create content items in the same order as the masonry grid
            const contentItems = [];
            
            // Add active sections first
            sections.forEach((section, idx) => {
              if (section.content?.trim()) {
                contentItems.push({
                  type: 'section',
                  data: section,
                  order: idx + 1
                });
              }
            });
            
            // Add images
            if (images.length > 0) {
              contentItems.push({
                type: 'images',
                data: images,
                order: sections.length + 1
              });
            }
            
            // Add key takeaways
            if (visibleKeyPoints.length > 0) {
              contentItems.push({
                type: 'keyTakeaways',
                data: visibleKeyPoints,
                order: 98
              });
            }
            
            // Add references
            if (references.length > 0) {
              contentItems.push({
                type: 'references',
                data: references,
                order: 99
              });
            }
            
            // Sort by order
            contentItems.sort((a, b) => a.order - b.order);
            
            // Distribute items across columns like masonry grid
            const columns = Array.from({ length: optimalColumns }, () => []);
            let currentColumn = 0;
            
            // Distribute regular items (not key takeaways or references)
            const regularItems = contentItems.filter(item => item.type !== 'keyTakeaways' && item.type !== 'references');
            for (let i = 0; i < regularItems.length; i++) {
              columns[currentColumn].push(regularItems[i]);
              
              // Move to next column if we have remaining columns and items
              const remainingItems = regularItems.length - i - 1;
              const remainingColumns = optimalColumns - currentColumn - 1;
              if (remainingColumns > 0 && remainingItems >= remainingColumns) {
                const avgItemsPerRemainingColumn = Math.ceil(remainingItems / remainingColumns);
                if (columns[currentColumn].length >= avgItemsPerRemainingColumn + 1) {
                  currentColumn++;
                }
              }
            }
            
            // Place key takeaways and references in the rightmost column
            const rightmostColumnIndex = optimalColumns - 1;
            contentItems.forEach(item => {
              if (item.type === 'keyTakeaways' || item.type === 'references') {
                columns[rightmostColumnIndex].push(item);
              }
            });
            
            // Render columns
            return columns.map((columnItems, columnIndex) => (
              <View key={columnIndex} style={styles.column}>
                {columnItems.map((item, itemIndex) => {
                  if (item.type === 'section') {
                    const section = item.data;
                    return (
                      <View key={`section-${itemIndex}`} style={[styles.sectionTile, { backgroundColor: section.contentBg, borderColor: section.headerBg }]}>
                        <Text style={[styles.sectionHeader, { color: section.headerTextColor, backgroundColor: section.headerBg, borderBottomColor: section.headerTextColor }]}>{section.title}</Text>
                        <Text style={[styles.sectionContent, { color: section.contentTextColor }]}>{section.content}</Text>
                      </View>
                    );
                  } else if (item.type === 'images') {
                    const images = item.data;
                    return (
                      <View key={`images-${itemIndex}`} style={[styles.sectionTile, { backgroundColor: '#F2F2F2', borderColor: '#E5E7EB' }]}>
                        <Text style={[styles.sectionHeader, { color: '#264796', backgroundColor: '#F2F2F2', borderBottomColor: '#E5E7EB' }]}>Images</Text>
                        <View style={styles.sectionContent}>
                          {images.map((img, i) => (
                            <View key={i} style={{ marginBottom: posterTheme.spacing.sectionPadding / 2 }}>
                              <Image src={img.url} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
                              {img.caption && (
                                <Text style={{ fontSize: posterTheme.fontSizes.body * 0.8, color: '#6B7280', marginTop: 4 }}>{img.caption}</Text>
            )}
          </View>
                          ))}
                        </View>
                      </View>
                    );
                  } else if (item.type === 'keyTakeaways') {
                    const keyPoints = item.data;
                    return (
                      <View key={`keytakeaways-${itemIndex}`}>
                        <View style={styles.keyTakeawaysHeaderRow}>
                          <View style={styles.keyTakeawaysLine} />
                          <Text style={styles.keyTakeawaysHeaderText}>Key Takeaways</Text>
                          <View style={styles.keyTakeawaysLine} />
                        </View>
                        {keyPoints.map((kp, i) => (
                          <View key={i} style={styles.keyTakeawayTile}>
                            <View style={[styles.keyCircle, { backgroundColor: keyTakeawayColors[i]?.bg || '#0007DB' }]}>
                              <Text style={[styles.keyCircleText, { color: keyTakeawayColors[i]?.textColor || '#fff' }]}>{i + 1}</Text>
                            </View>
                            <View style={styles.keyTextBlock}>
                              <Text style={styles.keyPoint}>{kp.point}</Text>
                              {kp.description && <Text style={styles.keyDesc}>{kp.description}</Text>}
                            </View>
                          </View>
                        ))}
                      </View>
                    );
                  } else if (item.type === 'references') {
                    const references = item.data;
                    return (
                      <View key={`references-${itemIndex}`} style={styles.referencesTile}>
                        <Text style={styles.referencesHeader}>{posterData.sectionTitles?.[4] || 'References'}</Text>
                        {references.map((ref, i) => (
                          <Text key={i} style={styles.reference}>{ref}</Text>
                        ))}
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
            ));
          })()}
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;