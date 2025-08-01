
export const getSectionsConfig = (posterData: any) => {
  return [
    { 
      title: posterData.sectionTitles?.[0] || "1. Background", 
      content: posterData.introduction,
      headerBg: "#0007DB",
      headerTextColor: "#FFFFFF",
      contentBg: "#0007DB",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[1] || "2. Methodology", 
      content: posterData.methods,
      headerBg: "#CFE0FC",
      headerTextColor: "#202B5B",
      contentBg: "#CFE0FC",
      contentTextColor: "#202B5B"
    },
    { 
      title: posterData.sectionTitles?.[2] || "3. Results", 
      content: posterData.findings,
      headerBg: "#1A3D84",
      headerTextColor: "#FFFFFF",
      contentBg: "#1A3D84",
      contentTextColor: "#FFFFFF"
    },
    { 
      title: posterData.sectionTitles?.[3] || "4. Importance", 
      content: posterData.conclusions,
      headerBg: "#BAE1FE",
      headerTextColor: "#202B5B",
      contentBg: "#BAE1FE",
      contentTextColor: "#202B5B"
    }
  ];
};

export const getKeyTakeawayColors = () => {
  return [
    { bg: "#0007DB", textColor: "#FFFFFF" }, // Blue
    { bg: "#244466", textColor: "#FFFFFF" }, // Dark blue
    { bg: "#C8E4F2", textColor: "#202B5B" }, // Light blue
    { bg: "#D0D0F4", textColor: "#202B5B" }  // Light purple
  ];
};

export const calculateContentBalance = (posterData: any, activeSections: any[]) => {
  const leftColumnContentLength = activeSections.reduce((acc, section) => acc + (section.content?.length || 0), 0) + 
    (posterData.images?.length || 0) * 100; // Add weight for images

  const rightColumnContentLength = 
    (posterData.keypoints?.filter((point: string, index: number) => {
      const isVisible = posterData.keyVisibility?.[index] !== false;
      return point?.trim() && isVisible;
    }).reduce((acc: number, point: string, index: number) => {
      return acc + point.length + (posterData.keyDescriptions?.[index]?.length || 0);
    }, 0) || 0) +
    (posterData.references?.length || 0);

  // Determine which column should stretch
  return leftColumnContentLength >= rightColumnContentLength;
};
