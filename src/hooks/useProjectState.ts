
import { useReducer, useCallback } from 'react';
import { projectReducer, initialState } from '@/store/projectReducer';
import { projectActions } from '@/store/actions';
import { PosterData, DesignSettings, ProjectData } from '@/types/project';
import { saveProject } from '@/utils/projectManager';

export const useProjectState = () => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const setProjects = useCallback((projects: ProjectData[]) => {
    dispatch(projectActions.setProjects(projects));
  }, []);

  const setCurrentProject = useCallback((project: ProjectData | null) => {
    dispatch(projectActions.setCurrentProject(project));
  }, []);

  const addProject = useCallback(async (project: ProjectData): Promise<ProjectData | null> => {
    const saved = await saveProject(project);
    if (saved) {
      dispatch(projectActions.addProject(saved));
    }
    return saved;
  }, []);

  const updateProject = useCallback(async (project: ProjectData): Promise<ProjectData | null> => {
    const saved = await saveProject(project);
    if (saved) {
      dispatch(projectActions.updateProject(saved));
    }
    return saved;
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    dispatch(projectActions.deleteProject(projectId));
  }, []);

  const updatePosterData = useCallback((posterData: Partial<PosterData> | ((prev: PosterData) => PosterData)) => {
    dispatch(projectActions.updatePosterData(posterData));
  }, []);

  const updateDesignSettings = useCallback((designSettings: Partial<DesignSettings> | ((prev: DesignSettings) => DesignSettings)) => {
    dispatch(projectActions.updateDesignSettings(designSettings));
  }, []);

  const updateQrColor = useCallback((qrColor: string) => {
    dispatch(projectActions.updateQrColor(qrColor));
  }, []);

  return {
    state,
    setProjects,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject,
    updatePosterData,
    updateDesignSettings,
    updateQrColor,
  };
};
