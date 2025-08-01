export const POSTER_A0_WIDTH_PT = 2384; // A0 width in PDF points (portrait)
export const POSTER_A0_HEIGHT_PT = 3370; // A0 height in PDF points (portrait)

export const posterTheme = {
  width: POSTER_A0_WIDTH_PT,
  height: POSTER_A0_HEIGHT_PT,
  fontSizes: {
    title: 64,
    sectionHeader: 32,
    body: 22,
    keyTakeaway: 20,
    reference: 14,
    subtitle: 24,
    qrCaption: 14,
  },
  spacing: {
    pagePadding: 56,
    tileGap: 36,
    sectionPadding: 28,
    headerMargin: 16,
    subtitleMargin: 36,
    keyTakeawayMargin: 18,
    keyCircle: 56,
    keyCircleText: 32,
    referenceMargin: 12,
  },
  border: {
    tile: 2.5,
    sectionHeader: 3,
    subtitle: 2,
    keyTakeaway: 2,
  },
  radius: {
    tile: 16,
    keyTakeaway: 14,
    reference: 14,
  },
}; 