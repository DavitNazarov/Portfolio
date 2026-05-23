import { Trophy } from "lucide-react";
import { API_ROUTES } from "@/constants/routes";
import AwardForm from "@/features/dashboard/forms/AwardForm";
import AwardList from "@/features/dashboard/lists/AwardList";

const EMPTY_AWARD = {
  title: "",
  medals: [],
  category: "",
  period: "",
};

function formFromAward(award) {
  return {
    title: award.title,
    medals: award.medals ?? [],
    category: award.category,
    period: award.period ?? "",
  };
}

function buildAwardPayload(form) {
  return {
    title: form.title.trim(),
    medals: form.medals,
    category: form.category.trim(),
    period: form.period.trim(),
  };
}

export const awardDashboardConfig = {
  FormComponent: AwardForm,
  ListComponent: AwardList,
  emptyState: {
    actionLabel: "Add your first award",
    message: "No awards yet.",
  },
  layout: {
    actionLabel: "Add award",
    icon: Trophy,
    iconColor: "bg-yellow-500/20",
    subtitle: "Competition results and achievements",
    title: "Awards",
  },
  modal: {
    createTitle: "New award",
    editTitle: "Edit award",
  },
  resource: {
    listPath: API_ROUTES.AWARDS.ALL,
    dataKey: "awards",
    emptyForm: EMPTY_AWARD,
    formFromItem: formFromAward,
    buildPayload: buildAwardPayload,
    createPath: API_ROUTES.AWARDS.CREATE,
    updatePath: API_ROUTES.AWARDS.UPDATE,
    deletePath: API_ROUTES.AWARDS.DELETE,
    confirmMessage: "Remove this award?",
  },
};
