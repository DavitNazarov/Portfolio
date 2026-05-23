import { GraduationCap } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import { isCurrentPeriod } from "@/lib/utils";
import EducationForm from "@/features/dashboard/forms/EducationForm";
import EducationList from "@/features/dashboard/lists/EducationList";

const EMPTY_EDUCATION = {
  degree: "",
  institution: "",
  period: "",
  description: "",
};

function formFromEducation(education) {
  return {
    degree: education.degree,
    institution: education.institution,
    period: education.period,
    description: education.description,
  };
}

function buildEducationPayload(form) {
  const period = form.period.trim();
  return {
    degree: form.degree.trim(),
    institution: form.institution.trim(),
    period,
    description: form.description.trim(),
    present: isCurrentPeriod(period),
  };
}

export const educationDashboardConfig = {
  FormComponent: EducationForm,
  ListComponent: EducationList,
  emptyState: {
    actionLabel: "Add your first entry",
    message: "No education entries yet.",
  },
  layout: {
    actionLabel: "Add entry",
    icon: GraduationCap,
    iconColor: "bg-chart-5/20",
    subtitle: "Degrees and institutions",
    title: "Education",
  },
  modal: {
    createTitle: "New education",
    editTitle: "Edit education",
  },
  resource: {
    listPath: API_ROUTES.EDUCATION.ALL,
    dataKey: "education",
    emptyForm: EMPTY_EDUCATION,
    formFromItem: formFromEducation,
    buildPayload: buildEducationPayload,
    createPath: API_ROUTES.EDUCATION.CREATE,
    updatePath: API_ROUTES.EDUCATION.UPDATE,
    deletePath: API_ROUTES.EDUCATION.DELETE,
    confirmMessage: "Remove this education entry?",
  },
};
