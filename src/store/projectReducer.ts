
import { ProjectAction, ProjectState } from './actions';
import { PosterData, DesignSettings } from '@/types/project';

export const initialState: ProjectState = {
  projects: [],
  currentProject: null,
};

export function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };

    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
        currentProject: action.payload,
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload 
          : state.currentProject,
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    case 'UPDATE_POSTER_DATA':
      if (!state.currentProject) return state;
      
      const newPosterData = typeof action.payload === 'function'
        ? action.payload(state.currentProject.posterData)
        : { ...state.currentProject.posterData, ...action.payload };

      const updatedProject = {
        ...state.currentProject,
        posterData: newPosterData,
        updatedAt: Date.now(),
      };

      return {
        ...state,
        currentProject: updatedProject,
        projects: state.projects.map(p => 
          p.id === updatedProject.id ? updatedProject : p
        ),
      };

    case 'UPDATE_DESIGN_SETTINGS':
      if (!state.currentProject) return state;
      
      const newDesignSettings = typeof action.payload === 'function'
        ? action.payload(state.currentProject.designSettings)
        : { ...state.currentProject.designSettings, ...action.payload };

      const updatedProjectDesign = {
        ...state.currentProject,
        designSettings: newDesignSettings,
        updatedAt: Date.now(),
      };

      return {
        ...state,
        currentProject: updatedProjectDesign,
        projects: state.projects.map(p => 
          p.id === updatedProjectDesign.id ? updatedProjectDesign : p
        ),
      };

    case 'UPDATE_QR_COLOR':
      if (!state.currentProject) return state;

      const updatedProjectQr = {
        ...state.currentProject,
        qrColor: action.payload,
        updatedAt: Date.now(),
      };

      return {
        ...state,
        currentProject: updatedProjectQr,
        projects: state.projects.map(p => 
          p.id === updatedProjectQr.id ? updatedProjectQr : p
        ),
      };

    default:
      return state;
  }
}
