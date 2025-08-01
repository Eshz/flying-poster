
import html2pdf from 'html2pdf.js';
import { toast } from "sonner";
import { createPdfConfig } from './pdfConfig';
import { cleanupTempContainer } from './domUtils';

/**
 * Generates and downloads the PDF from the prepared element
 */
export const generatePdf = (clonedElement: HTMLElement, tempDiv: HTMLElement, orientation: 'portrait' | 'landscape') => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const pdfConfig = createPdfConfig(orientation);
      
      html2pdf().from(clonedElement).set(pdfConfig).outputPdf('blob').then((pdfBlob: Blob) => {
        // Create download link
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `conference-poster-A0-${orientation}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        const sizeInMB = (pdfBlob.size / (1024 * 1024)).toFixed(2);
        toast.success(`A0 PDF exported successfully in ${orientation} mode! File size: ${sizeInMB}MB`);
        
        // Clean up
        cleanupTempContainer(tempDiv);
        resolve();
      }).catch(err => {
        console.error("PDF export failed:", err);
        toast.error("PDF export failed. Please try again.");
        // Clean up
        cleanupTempContainer(tempDiv);
        reject(err);
      });
    }, 1000); // Reduced timeout since fonts are preloaded
  });
};
