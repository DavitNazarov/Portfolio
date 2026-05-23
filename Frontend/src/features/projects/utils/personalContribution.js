export function personalContribution(project) {
  const name = String(project.name ?? "").toLowerCase();
  if (name.includes("movie")) {
    return "Built the React interface, connected API-driven movie data, handled auth-facing flows, and shaped the AI movie-chat experience around real user actions. Also, movies are free to watch for everyone in high quality.";
  }
  if (name.includes("wushu")) {
    return "Designed and implemented the competition-management product flow, from structured tournament data to responsive admin and live-operation screens.";
  }
  if (name.includes("portfolio")) {
    return "Built the full-stack portfolio, public API-backed sections, protected dashboard CRUD, notification email flow, and deployment setup.";
  }

  return "Owned the implementation details shown here: interface structure, API integration, state handling, and final polish.";
}
