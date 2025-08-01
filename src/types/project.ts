
import { PosterData } from './poster';
import { DesignSettings } from './design';

export interface ProjectData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  posterData: PosterData;
  designSettings: DesignSettings;
  qrColor: string;
}

export interface ProjectContextType {
  currentProject: ProjectData | null;
  projects: ProjectData[];
  loadProject: (id: string) => void;
  createNewProject: (name: string) => void;
  saveCurrentProject: () => void;
  renameCurrentProject: (newName: string) => void;
  deleteCurrentProject: () => void;
  updatePosterData: (posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => void;
  updateDesignSettings: (designSettings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => void;
  updateQrColor: (qrColor: string) => void;
  exportProject: () => void;
  importProject: (file: File) => void;
}

// Re-export types for convenience
export type { PosterData } from './poster';
export type { DesignSettings } from './design';
