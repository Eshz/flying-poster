
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, FilePlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectData } from '@/types/project';
import { formatDistanceToNow } from 'date-fns';

interface ProjectDropdownProps {
  currentProject: ProjectData | null;
  projects: ProjectData[];
  onProjectLoad: (id: string) => void;
  onProjectCreate: (name: string) => boolean;
  newProjectName: string;
  setNewProjectName: (name: string) => void;
  newProjectDialogOpen: boolean;
  setNewProjectDialogOpen: (open: boolean) => void;
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = React.memo(({
  currentProject,
  projects,
  onProjectLoad,
  onProjectCreate,
  newProjectName,
  setNewProjectName,
  newProjectDialogOpen,
  setNewProjectDialogOpen
}) => {
  const handleCreateNewProject = () => {
    if (onProjectCreate(newProjectName)) {
      setNewProjectName('');
      setNewProjectDialogOpen(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentProject?.name || 'Select Project'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px]">
        <DropdownMenuLabel>Projects</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem 
            key={project.id}
            onClick={() => onProjectLoad(project.id)}
            className="flex justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span>{project.name}</span>
              <span className="text-xs text-muted-foreground">
                Updated {formatDate(project.updatedAt)}
              </span>
            </div>
            {currentProject?.id === project.id && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
              <FilePlus className="h-4 w-4 mr-2" />
              <span>New Project</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Enter a name for your new project.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="new-project-name">Project Name</Label>
              <Input
                id="new-project-name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="My Amazing Poster"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNewProject}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ProjectDropdown.displayName = 'ProjectDropdown';

export default ProjectDropdown;
