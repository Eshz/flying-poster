
import React, { useState } from 'react';
import { useProjectManagement } from '@/hooks/useProjectManagement';
import ProjectDropdown from '@/components/project/ProjectDropdown';
import ProjectActions from '@/components/project/ProjectActions';

const ProjectSwitcher: React.FC = React.memo(() => {
  const { 
    currentProject, 
    projects, 
    handleProjectLoad, 
    handleProjectCreate, 
    saveCurrentProject,
    handleProjectRename,
    deleteCurrentProject 
  } = useProjectManagement();
  
  const [newProjectName, setNewProjectName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <ProjectDropdown
        currentProject={currentProject}
        projects={projects}
        onProjectLoad={handleProjectLoad}
        onProjectCreate={handleProjectCreate}
        newProjectName={newProjectName}
        setNewProjectName={setNewProjectName}
        newProjectDialogOpen={newProjectDialogOpen}
        setNewProjectDialogOpen={setNewProjectDialogOpen}
      />

      <ProjectActions
        currentProjectName={currentProject?.name}
        onSave={saveCurrentProject}
        onRename={handleProjectRename}
        onDelete={deleteCurrentProject}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
        renameDialogOpen={renameDialogOpen}
        setRenameDialogOpen={setRenameDialogOpen}
      />
    </div>
  );
});

ProjectSwitcher.displayName = 'ProjectSwitcher';

export default ProjectSwitcher;
