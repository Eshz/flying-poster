
import { toast } from "sonner";
import { ProjectData } from '@/types/project';
import { projectDataSchema } from '@/utils/validation/schemas';
import SecureStorage from '@/utils/security/secureStorage';

const STORAGE_KEY = "poster_projects";

// Get all saved projects with validation
export const getProjects = async (): Promise<ProjectData[]> => {
  try {
    // Try secure storage first
    const secureProjects = await SecureStorage.getSecureItem<ProjectData[]>(STORAGE_KEY);
    if (secureProjects) {
      // Validate each project
      const validatedProjects = secureProjects.filter((project: unknown) => {
        try {
          projectDataSchema.parse(project);
          return true;
        } catch (error) {
          console.warn("Invalid project data found:", error);
          return false;
        }
      });
      return validatedProjects;
    }

    // Fallback to regular localStorage for backward compatibility
    const projectsString = localStorage.getItem(STORAGE_KEY);
    if (!projectsString) return [];
    
    const projects = JSON.parse(projectsString);
    
    // Validate each project
    const validatedProjects = projects.filter((project: unknown) => {
      try {
        projectDataSchema.parse(project);
        return true;
      } catch (error) {
        console.warn("Invalid project data found:", error);
        return false;
      }
    });
    
    // Migrate to secure storage
    if (validatedProjects.length > 0) {
      await SecureStorage.setSecureItem(STORAGE_KEY, validatedProjects);
      localStorage.removeItem(STORAGE_KEY); // Remove old data
    }
    
    return validatedProjects;
  } catch (error) {
    console.error("Failed to load projects:", error);
    toast.error("Failed to load projects from storage");
    return [];
  }
};

// Get a specific project by ID
export const getProject = async (id: string): Promise<ProjectData | null> => {
  const projects = await getProjects();
  return projects.find(project => project.id === id) || null;
};

// Save a new project or update an existing one
export const saveProject = async (project: ProjectData): Promise<ProjectData | null> => {
  try {
    // Validate project data
    const validatedProject = projectDataSchema.parse(project);
    
    const projects = await getProjects();
    const now = Date.now();
    
    // Check if project with this ID already exists
    const existingIndex = projects.findIndex(p => p.id === validatedProject.id);
    
    const updatedProject: ProjectData = {
      id: validatedProject.id,
      name: validatedProject.name,
      createdAt: validatedProject.createdAt,
      posterData: validatedProject.posterData as ProjectData['posterData'],
      designSettings: validatedProject.designSettings as ProjectData['designSettings'],
      qrColor: validatedProject.qrColor,
      updatedAt: now
    };
    
    if (existingIndex >= 0) {
      // Update existing project
      projects[existingIndex] = updatedProject;
    } else {
      // Add new project
      projects.push(updatedProject);
    }
    
    const success = await SecureStorage.setSecureItem(STORAGE_KEY, projects);
    if (!success) {
      throw new Error('Failed to save to secure storage');
    }
    
    return updatedProject;
  } catch (error) {
    console.error("Failed to save project:", error);
    toast.error("Failed to save project");
    return null;
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const projects = await getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    
    if (filteredProjects.length === projects.length) {
      return false; // Project not found
    }
    
    const success = await SecureStorage.setSecureItem(STORAGE_KEY, filteredProjects);
    return success;
  } catch (error) {
    console.error("Failed to delete project:", error);
    toast.error("Failed to delete project");
    return false;
  }
};

// Generate a unique ID for new projects
export const generateProjectId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
