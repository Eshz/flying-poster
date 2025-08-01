
import { PosterData, DesignSettings, ProjectData } from '@/types/project';

export type ProjectAction =
  | { type: 'SET_PROJECTS'; payload: ProjectData[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: ProjectData | null }
  | { type: 'ADD_PROJECT'; payload: ProjectData }
  | { type: 'UPDATE_PROJECT'; payload: ProjectData }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'UPDATE_POSTER_DATA'; payload: Partial<PosterData> | ((prev: PosterData) => PosterData) }
  | { type: 'UPDATE_DESIGN_SETTINGS'; payload: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings) }
  | { type: 'UPDATE_QR_COLOR'; payload: string };

export interface ProjectState {
  projects: ProjectData[];
  currentProject: ProjectData | null;
}

// Action creators for better type safety and consistency
export const projectActions = {
  setProjects: (projects: ProjectData[]): ProjectAction => ({
    type: 'SET_PROJECTS',
    payload: projects
  }),
  
  setCurrentProject: (project: ProjectData | null): ProjectAction => ({
    type: 'SET_CURRENT_PROJECT',
    payload: project
  }),
  
  addProject: (project: ProjectData): ProjectAction => ({
    type: 'ADD_PROJECT',
    payload: project
  }),
  
  updateProject: (project: ProjectData): ProjectAction => ({
    type: 'UPDATE_PROJECT',
    payload: project
  }),
  
  deleteProject: (projectId: string): ProjectAction => ({
    type: 'DELETE_PROJECT',
    payload: projectId
  }),
  
  updatePosterData: (data: Partial<PosterData> | ((prev: PosterData) => PosterData)): ProjectAction => ({
    type: 'UPDATE_POSTER_DATA',
    payload: data
  }),
  
  updateDesignSettings: (settings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)): ProjectAction => ({
    type: 'UPDATE_DESIGN_SETTINGS',
    payload: settings
  }),
  
  updateQrColor: (color: string): ProjectAction => ({
    type: 'UPDATE_QR_COLOR',
    payload: color
  })
};
