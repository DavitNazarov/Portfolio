import { Award } from "../../../model/Award.model.js";
import { Education } from "../../../model/education.model.js";
import { Experience } from "../../../model/Experience.model.js";
import { Projects } from "../../../model/Projects.model.js";
import { periodIsCurrent, sortByPeriodStatus } from "../../../lib/period.js";
import { STABLE_PROFILE_CONTEXT } from "../constants/profileContext.js";

function list(items: string[]) {
  return items.length > 0 ? items.join("\n") : "No live records found.";
}

export async function portfolioContext() {
  const [projects, experiences, education, awards] = await Promise.all([
    Projects.find().sort({ year: -1 }).lean(),
    Experience.find().lean(),
    Education.find().sort({ createdAt: -1 }).lean(),
    Award.find().lean(),
  ]);
  const sortedExperiences = sortByPeriodStatus(experiences);
  const sortedEducation = sortByPeriodStatus(education);

  return [
    "LIVE PORTFOLIO DATA FROM DATABASE",
    "",
    STABLE_PROFILE_CONTEXT,
    "",
    "Identity:",
    "- Name: Davit Nazarov",
    "- Email: nazarov.davit17@gmail.com",
    "- GitHub: https://github.com/DavitNazarov",
    "- LinkedIn: https://www.linkedin.com/in/davit-nazarov-366b77389",
    "- Instagram: https://www.instagram.com/nazarovdati_",
    "",
    "Projects:",
    list(
      projects.map((project) => {
        const tech = Array.isArray(project.technologies) ? project.technologies.join(", ") : "";
        return `- ${project.name} (${project.year}): ${project.description} Technologies: ${tech}. GitHub: ${project.githubLink}. Live: ${project.liveLink}.`;
      })
    ),
    "",
    "Experience:",
    list(
      sortedExperiences.map((item) => {
        const tech = Array.isArray(item.tech) ? item.tech.join(", ") : "";
        const status = periodIsCurrent(item.period) ? "current role" : "past role";
        return `- [${status}] ${item.role} at ${item.company}, ${item.period}: ${item.description} Tech: ${tech}.`;
      })
    ),
    "",
    "Education:",
    list(
      sortedEducation.map((item) => {
        const status = periodIsCurrent(item.period) ? "current study" : "past/planned study";
        return `- [${status}] ${item.degree} at ${item.institution}, ${item.period}: ${item.description}`;
      })
    ),
    "",
    "Awards:",
    list(
      awards.map((item) => {
        const medals = Array.isArray(item.medals) ? item.medals.join(", ") : "";
        return `- ${item.title}: ${item.category}. Medals: ${medals}. ${item.period ? `Period: ${item.period}.` : ""}`;
      })
    ),
  ].join("\n");
}
