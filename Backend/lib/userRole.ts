export type UserRole = "admin" | "viewer";

export function normalizeUserRole(role: unknown): UserRole | null {
  if (typeof role !== "string") return null;

  const normalized = role.trim().toLowerCase();
  if (normalized === "admin" || normalized === "viewer") {
    return normalized;
  }

  return null;
}

/**
 * Falls back to the least-privileged role. A missing or unrecognized role must
 * never grant admin — admin is only ever granted by an explicit stored value.
 */
export function resolveUserRole(role: unknown): UserRole {
  return normalizeUserRole(role) ?? "viewer";
}
