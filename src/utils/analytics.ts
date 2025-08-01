
// Google Analytics 4 tracking utilities
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  // Add the gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: 'PosterMaker',
    page_location: window.location.href,
    // Privacy-friendly settings
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
};

// Track page views
export const trackPageView = (page_title: string, page_location?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title,
      page_location: page_location || window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'PosterMaker',
      ...parameters
    });
  }
};

// Specific tracking functions for poster maker events
export const trackPosterCreated = () => {
  trackEvent('poster_created', {
    event_category: 'Poster',
  });
};

export const trackDesignStyleSelected = (styleName: string) => {
  trackEvent('design_style_selected', {
    event_category: 'Design',
    style_name: styleName,
  });
};

export const trackPDFExported = () => {
  trackEvent('pdf_exported', {
    event_category: 'Export',
  });
};

export const trackZoomChanged = (zoomLevel: number, zoomType: 'manual' | 'fit_to_window' | 'reset') => {
  trackEvent('zoom_changed', {
    event_category: 'Interaction',
    zoom_level: Math.round(zoomLevel * 100),
    zoom_type: zoomType,
  });
};

export const trackProjectAction = (action: 'created' | 'loaded' | 'saved' | 'renamed' | 'deleted') => {
  trackEvent('project_action', {
    event_category: 'Project',
    action: action,
  });
};

export const trackContentUpdated = (contentType: 'title' | 'authors' | 'sections' | 'keypoints' | 'images') => {
  trackEvent('content_updated', {
    event_category: 'Content',
    content_type: contentType,
  });
};

export const trackLayoutSelected = (layoutName: string) => {
  trackEvent('layout_selected', {
    event_category: 'Layout',
    layout_name: layoutName,
  });
};
