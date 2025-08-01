import React from 'react';
import { exportPosterAsPdf } from '@/utils/pdf/react-pdf/reactPdfExport';
import MobileTopNav from '@/components/layout/MobileTopNav';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import PosterPreviewArea from '@/components/layout/PosterPreviewArea';
import { useProjects } from '@/contexts/ProjectContext';
import { PosterData, DesignSettings } from '@/types/project';

const Index = () => {
  const { 
    currentProject, 
    updatePosterData, 
    updateDesignSettings, 
    updateQrColor
  } = useProjects();
  
  const [activePanel, setActivePanel] = React.useState<'content' | 'design'>('content');
  const [manualZoom, setManualZoom] = React.useState<number>(0);
  const [fitZoomLevel, setFitZoomLevel] = React.useState<number>(0);
  
  // Extract values from the current project with proper defaults (Academic Modern style)
  const posterData: PosterData = currentProject?.posterData || {
    title: "Your Conference Poster Title",
    authors: "Author Name(s)",
    school: "Institution Name",
    contact: "email@example.com",
    introduction: "Introduction text...",
    methods: "Methods text...",
    findings: "Findings text...",
    conclusions: "Conclusions text...",
    references: "References...",
    keypoints: ["Key Point 1", "Key Point 2", "Key Point 3", "Key Point 4"],
    keyDescriptions: ["Description 1", "Description 2", "Description 3", "Description 4"],
    sectionTitles: [
      "1. Introduction",
      "2. Methods",
      "3. Findings",
      "4. Conclusions",
      "5. References"
    ],
    qrCodeUrl: "https://example.com/poster",
    qrCodeColor: "#000000",
    showKeypoints: true,
    showQrCode: true,
    images: []
  };
  
  // Updated default to Academic Modern style
  const designSettings: DesignSettings = currentProject?.designSettings || {
    layout: 'modern',
    orientation: 'portrait',
    titleFont: 'merriweather',
    contentFont: 'roboto',
    headerBgColor: '#FFFFFF',
    headerTextColor: '#1E3A8A',
    sectionBgColor: '#3B82F6',
    sectionTitleColor: '#FFFFFF',
    sectionTextColor: '#FFFFFF',
    keyPointsBgColor: '#EFF6FF',
    keyPointsTextColor: '#1E3A8A',
  };
  
  const qrColor: string = currentProject?.qrColor || "#000000";
  
  const handleExportPDF = () => {
    exportPosterAsPdf(posterData, designSettings);
  };

  const handleZoomChange = (zoom: number) => {
    setManualZoom(zoom);
  };

  const handleFitZoomLevelChange = (scale: number) => {
    setFitZoomLevel(scale);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Top Navigation */}
      <MobileTopNav 
        posterData={posterData}
        setPosterData={updatePosterData}
        designSettings={designSettings}
        setDesignSettings={updateDesignSettings}
        qrColor={qrColor}
        setQrColor={updateQrColor}
        handleExportPDF={handleExportPDF}
        currentZoom={manualZoom || fitZoomLevel}
        onZoomChange={handleZoomChange}
        fitZoomLevel={fitZoomLevel}
      />

      {/* Main content area */}
      <div className="flex h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)] pt-16 lg:pt-0 overflow-hidden">
        {/* Desktop sidebar - fixed width */}
        <div className="hidden lg:block">
          <DesktopSidebar 
            posterData={posterData}
            setPosterData={updatePosterData}
            designSettings={designSettings}
            setDesignSettings={updateDesignSettings}
            qrColor={qrColor}
            setQrColor={updateQrColor}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            handleExportPDF={handleExportPDF}
          />
        </div>
        
        {/* Preview Area - takes remaining space */}
        <div className="flex-1 h-full min-h-0 overflow-hidden">
          <PosterPreviewArea 
            posterData={posterData}
            qrColor={qrColor}
            designSettings={designSettings}
            manualZoom={manualZoom}
            onZoomChange={handleZoomChange}
            onContainerScaleChange={handleFitZoomLevelChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
