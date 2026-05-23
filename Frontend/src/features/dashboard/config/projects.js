import { FolderKanban } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { parseCommaList } from "@/lib/utils";
import ProjectForm from "@/features/dashboard/forms/ProjectForm";
import ProjectList from "@/features/dashboard/lists/ProjectList";

const EMPTY_PROJECT = {
  name: "",
  description: "",
  year: "",
  githubLink: "",
  liveLink: "",
  technologies: "",
};

function formFromProject(project) {
  return {
    name: project.name,
    description: project.description,
    year: project.year,
    githubLink: project.githubLink,
    liveLink: project.liveLink,
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies || "",
  };
}

function buildProjectPayload(form) {
  return {
    ...form,
    year: Number(form.year),
    technologies: parseCommaList(form.technologies),
  };
}

export const projectDashboardConfig = {
  FormComponent: ProjectForm,
  ListComponent: ProjectList,
  emptyState: {
    actionLabel: "Add your first project",
    message: "No projects yet.",
  },
  layout: {
    actionLabel: "New project",
    icon: FolderKanban,
    iconColor: "bg-chart-1/20",
    subtitle: "Manage portfolio projects",
    title: "Projects",
  },
  modal: {
    createTitle: "New project",
    editTitle: "Edit project",
  },
  resource: {
    listPath: API_ROUTES.PROJECTS.ALL,
    dataKey: "projects",
    emptyForm: EMPTY_PROJECT,
    formFromItem: formFromProject,
    buildPayload: buildProjectPayload,
    createPath: API_ROUTES.PROJECTS.CREATE,
    updatePath: API_ROUTES.PROJECTS.UPDATE,
    deletePath: API_ROUTES.PROJECTS.DELETE,
    confirmMessage: "Delete this project?",
  },
};
