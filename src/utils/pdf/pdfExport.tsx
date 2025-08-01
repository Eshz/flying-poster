
import { toast } from "sonner";
import { pdf } from '@react-pdf/renderer';
import PdfDocument from './react-pdf/PdfDocument';
import { extractDesignSettings } from './domUtils';
import React from 'react';

/**
 * Exports a PDF using react-pdf
 */
export const exportToPDF = async (
  _elementId: string, // ignored, kept for API compatibility
  _orientation: 'portrait' | 'landscape' = 'portrait',
  projectData?: { posterData: any; designSettings: any }
) => {
  toast.info('Generating PDF with embedded fonts...');

  let posterData;
  let designSettings;
  if (projectData) {
    posterData = projectData.posterData;
    designSettings = projectData.designSettings;
  } else {
    const posterContent = document.getElementById('poster-content');
    posterData = (posterContent && (posterContent as any).posterData) || {};
    designSettings = extractDesignSettings();
  }

  try {
    // Render PdfDocument as a React element using JSX
    const documentElement = <PdfDocument posterData={posterData} designSettings={designSettings} />;
    const blob = await pdf(documentElement).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `conference-poster.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('PDF exported successfully!');
  } catch (error) {
    console.error('PDF export failed:', error);
    toast.error('PDF export failed. Please try again.');
  }
};
