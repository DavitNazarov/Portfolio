/**
 * Server-side IP geolocation. Resolves a visitor's public IP to an approximate
 * city/region/country without any client involvement — no browser permission
 * prompt, nothing visible to the visitor. Best-effort: never throws, returns
 * undefined on any failure, and skips private/loopback IPs (local dev).
 *
 * Primary provider: ip-api.com (keyless, accurate). Fallback: freeipapi.com
 * (keyless, HTTPS). Accuracy is IP-based — typically correct to city/region,
 * less so on mobile carriers or VPNs.
 */

export type GeoInfo = {
  city?: string;
  region?: string;
  country?: string;
  coordinates?: string;
  timezone?: string;
  org?: string;
};

const PRIVATE_IP =
  /^(::1$|::ffff:127\.|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|fc|fd|fe80:|0\.0\.0\.0$)/i;

const LOOKUP_TIMEOUT_MS = 2500;

function clip(value: unknown, max = 120): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

function isPublicIp(ip: string): boolean {
  return ip.length > 0 && !PRIVATE_IP.test(ip);
}

function coords(lat: unknown, lon: unknown): string | undefined {
  return typeof lat === "number" && typeof lon === "number"
    ? `${lat.toFixed(4)}, ${lon.toFixed(4)}`
    : undefined;
}

async function fetchJson(url: string): Promise<Record<string, unknown> | undefined> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { accept: "application/json" } });
    if (!res.ok) return undefined;
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

async function fromIpApi(ip: string): Promise<GeoInfo | undefined> {
  const url = `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,regionName,city,lat,lon,timezone,isp,org`;
  const data = await fetchJson(url);
  if (!data || data.status !== "success") return undefined;
  return {
    city: clip(data.city, 80),
    region: clip(data.regionName, 80),
    country: clip(data.country, 80),
    coordinates: coords(data.lat, data.lon),
    timezone: clip(data.timezone, 60),
    org: clip(data.org ?? data.isp, 120),
  };
}

async function fromFreeIpApi(ip: string): Promise<GeoInfo | undefined> {
  const data = await fetchJson(`https://freeipapi.com/api/json/${encodeURIComponent(ip)}`);
  if (!data) return undefined;
  const info: GeoInfo = {
    city: clip(data.cityName, 80),
    region: clip(data.regionName, 80),
    country: clip(data.countryName, 80),
    coordinates: coords(data.latitude, data.longitude),
    timezone: clip(data.timeZone, 60),
  };
  return info.city || info.country ? info : undefined;
}

export async function lookupGeo(ip?: string): Promise<GeoInfo | undefined> {
  if (!ip || !isPublicIp(ip)) return undefined;
  return (await fromIpApi(ip)) ?? (await fromFreeIpApi(ip));
}
