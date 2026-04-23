export type UserRole = "admin" | "viewer";

export function normalizeUserRole(role: unknown): UserRole | null {
  if (typeof role !== "string") return null;

  const normalized = role.trim().toLowerCase();
  if (normalized === "admin" || normalized === "viewer") {
    return normalized;
  }

  return null;
}

export function resolveUserRole(role: unknown): UserRole {
  return normalizeUserRole(role) ?? "admin";
}
