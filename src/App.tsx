
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider, useProjects } from "./contexts/ProjectContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Button } from "@/components/ui/button";
import { Download, Undo, Redo } from "lucide-react";
import { exportPosterAsPdf } from '@/utils/pdf/react-pdf/reactPdfExport';
import ImportExportButtons from "./components/ImportExportButtons";
import { useIsMobile } from "./hooks/use-mobile";
import { useAnalytics } from "./hooks/useAnalytics";
import { useEffect } from "react";
import { MousePointerClick } from "lucide-react";

const queryClient = new QueryClient();

const AppContent = () => {
  const isMobile = useIsMobile();
  const { trackPDFExported, trackEvent } = useAnalytics();
  const { currentProject } = useProjects();
  
  // Clear all data on page refresh/exit
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? All unsaved changes will be lost.';
      return 'Are you sure you want to leave? All unsaved changes will be lost.';
    };

    const handleUnload = () => {
      // Clear all localStorage data
      localStorage.clear();
      // Clear sessionStorage as well
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);
  
  const handleExportPDF = () => {
    if (!currentProject) return;
    exportPosterAsPdf(currentProject.posterData, currentProject.designSettings);
    trackPDFExported();
  };

  const handleUndo = () => {
    // Browser undo functionality
    document.execCommand('undo');
    trackEvent('undo_action', { event_category: 'Interaction' });
  };

  const handleRedo = () => {
    // Browser redo functionality  
    document.execCommand('redo');
    trackEvent('redo_action', { event_category: 'Interaction' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Desktop header - hidden on mobile */}
      <header className="hidden lg:block border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <MousePointerClick className="text-black h-6 w-6" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900 font-merriweather">Poster.Submit</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleUndo}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Undo className="h-4 w-4" />
                <span className="text-xs">Undo</span>
              </Button>
              <Button 
                onClick={handleRedo}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Redo className="h-4 w-4" />
                <span className="text-xs">Redo</span>
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ImportExportButtons />
            <Button 
              onClick={handleExportPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Download className="mr-2 h-4 w-4" />
              Export to PDF
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Toaster />
        <SonnerToaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ProjectProvider>
          <AppContent />
        </ProjectProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
