import { Briefcase } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { parseCommaList } from "@/lib/utils";
import ExperienceForm from "@/features/dashboard/forms/ExperienceForm";
import ExperienceList from "@/features/dashboard/lists/ExperienceList";

const EMPTY_EXPERIENCE = {
  role: "",
  company: "",
  period: "",
  description: "",
  tech: "",
};

function formFromExperience(experience) {
  return {
    role: experience.role,
    company: experience.company,
    period: experience.period,
    description: experience.description,
    tech: Array.isArray(experience.tech) ? experience.tech.join(", ") : experience.tech || "",
  };
}

function buildExperiencePayload(form) {
  return {
    ...form,
    tech: parseCommaList(form.tech),
  };
}

export const experienceDashboardConfig = {
  FormComponent: ExperienceForm,
  ListComponent: ExperienceList,
  emptyState: {
    actionLabel: "Add your first experience",
    message: "No experience entries yet.",
  },
  layout: {
    actionLabel: "New experience",
    icon: Briefcase,
    iconColor: "bg-chart-3/20",
    subtitle: "Manage work history",
    title: "Experience",
  },
  modal: {
    createTitle: "New experience",
    editTitle: "Edit experience",
  },
  resource: {
    listPath: API_ROUTES.EXPERIENCE.ALL,
    dataKey: "experiences",
    emptyForm: EMPTY_EXPERIENCE,
    formFromItem: formFromExperience,
    buildPayload: buildExperiencePayload,
    createPath: API_ROUTES.EXPERIENCE.CREATE,
    updatePath: API_ROUTES.EXPERIENCE.UPDATE,
    deletePath: API_ROUTES.EXPERIENCE.DELETE,
    confirmMessage: "Delete this experience?",
  },
};
