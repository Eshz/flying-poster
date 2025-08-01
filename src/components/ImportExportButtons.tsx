
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useProjects } from '@/contexts/ProjectContext';
import { convertImagesToBase64, validateImportedImages } from '@/utils/imageUtils';
import { toast } from 'sonner';

const ImportExportButtons = () => {
  const { currentProject, updatePosterData } = useProjects();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportProject = async () => {
    if (!currentProject) {
      toast.error('No project to export');
      return;
    }

    try {
      // Convert images to base64 before export
      let exportData = { ...currentProject };
      
      if (exportData.posterData.images && exportData.posterData.images.length > 0) {
        toast.info('Converting images for export...');
        const convertedImages = await convertImagesToBase64(exportData.posterData.images);
        exportData = {
          ...exportData,
          posterData: {
            ...exportData.posterData,
            images: convertedImages
          }
        };
      }

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${currentProject.name.replace(/[^a-z0-9]/gi, '_')}_poster_project.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Project exported successfully with images');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export project');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const text = await file.text();
        const importedData = JSON.parse(text);
        
        // Validate and process imported images
        if (importedData.posterData && importedData.posterData.images) {
          const validatedImages = validateImportedImages(importedData.posterData.images);
          importedData.posterData.images = validatedImages;
        }
        
        // Update the current project with imported data
        if (importedData.posterData) {
          updatePosterData(importedData.posterData);
          toast.success('Project imported successfully with images');
        } else {
          toast.error('Invalid project file format');
        }
      } catch (error) {
        console.error('Import failed:', error);
        toast.error('Failed to import project file');
      }
      
      // Reset the input so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        onClick={handleImportClick}
        className="text-sm"
      >
        Import
      </Button>
      <Button 
        variant="outline" 
        onClick={handleExportProject}
        className="text-sm"
      >
        Export
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImportExportButtons;
