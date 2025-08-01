
import { useEffect } from 'react';
import { 
  initGA, 
  trackPageView, 
  trackEvent,
  trackPosterCreated,
  trackDesignStyleSelected,
  trackPDFExported,
  trackZoomChanged,
  trackProjectAction,
  trackContentUpdated,
  trackLayoutSelected
} from '@/utils/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    // Initialize GA on first load
    initGA();
    trackPageView('PosterMaker Home');
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackPosterCreated,
    trackDesignStyleSelected,
    trackPDFExported,
    trackZoomChanged,
    trackProjectAction,
    trackContentUpdated,
    trackLayoutSelected,
  };
};
