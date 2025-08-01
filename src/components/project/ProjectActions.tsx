
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save, PenLine, Trash2 } from 'lucide-react';
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ProjectActionsProps {
  currentProjectName?: string;
  onSave: () => void;
  onRename: (newName: string) => boolean;
  onDelete: () => void;
  renameValue: string;
  setRenameValue: (value: string) => void;
  renameDialogOpen: boolean;
  setRenameDialogOpen: (open: boolean) => void;
}

const ProjectActions: React.FC<ProjectActionsProps> = React.memo(({
  currentProjectName,
  onSave,
  onRename,
  onDelete,
  renameValue,
  setRenameValue,
  renameDialogOpen,
  setRenameDialogOpen
}) => {
  const handleRename = () => {
    if (onRename(renameValue)) {
      setRenameValue('');
      setRenameDialogOpen(false);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onSave} 
        title="Save Project"
      >
        <Save className="h-4 w-4" />
      </Button>
      
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Rename Project"
          >
            <PenLine className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Enter a new name for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="rename-project">Project Name</Label>
            <Input
              id="rename-project"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder={currentProjectName}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Delete Project"
            className="hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project "{currentProjectName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

ProjectActions.displayName = 'ProjectActions';

export default ProjectActions;
