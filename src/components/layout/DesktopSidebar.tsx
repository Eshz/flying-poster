
import React from 'react';
import { Text, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PosterForm from '@/components/PosterForm';
import DesignPanel from '@/components/DesignPanel';

interface DesktopSidebarProps {
  posterData: any;
  setPosterData: React.Dispatch<React.SetStateAction<any>>;
  designSettings: any;
  setDesignSettings: React.Dispatch<React.SetStateAction<any>>;
  qrColor: string;
  setQrColor: React.Dispatch<React.SetStateAction<string>>;
  activePanel: 'content' | 'design';
  setActivePanel: React.Dispatch<React.SetStateAction<'content' | 'design'>>;
  handleExportPDF: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  posterData,
  setPosterData,
  designSettings,
  setDesignSettings,
  qrColor,
  setQrColor,
  activePanel,
  setActivePanel
}) => {
  return (
    <div className="w-[500px] min-w-[500px] max-w-[500px] h-screen overflow-y-auto">
      <div className="bg-white">
        <Tabs defaultValue={activePanel} className="w-full" onValueChange={(value) => setActivePanel(value as 'content' | 'design')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="content">
              <Text className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="design">
              <Palette className="mr-2 h-4 w-4" />
              Design
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <PosterForm 
              posterData={posterData}
              setPosterData={setPosterData}
            />
          </TabsContent>
          
          <TabsContent value="design" className="space-y-6">
            <DesignPanel 
              designSettings={designSettings}
              setDesignSettings={setDesignSettings}
              qrColor={qrColor}
              setQrColor={setQrColor}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesktopSidebar;
