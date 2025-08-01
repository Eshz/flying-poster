
import { useCallback } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { ProjectData } from '@/types/project';

export const useProjectManagement = () => {
  const {
    currentProject,
    projects,
    loadProject,
    createNewProject,
    saveCurrentProject,
    renameCurrentProject,
    deleteCurrentProject
  } = useProjects();

  const handleProjectLoad = useCallback((projectId: string) => {
    loadProject(projectId);
  }, [loadProject]);

  const handleProjectCreate = useCallback((name: string) => {
    if (name.trim()) {
      createNewProject(name.trim());
      return true;
    }
    return false;
  }, [createNewProject]);

  const handleProjectRename = useCallback((newName: string) => {
    if (newName.trim()) {
      renameCurrentProject(newName.trim());
      return true;
    }
    return false;
  }, [renameCurrentProject]);

  const getProjectById = useCallback((id: string): ProjectData | undefined => {
    return projects.find(project => project.id === id);
  }, [projects]);

  return {
    currentProject,
    projects,
    handleProjectLoad,
    handleProjectCreate,
    handleProjectRename,
    saveCurrentProject,
    deleteCurrentProject,
    getProjectById
  };
};
