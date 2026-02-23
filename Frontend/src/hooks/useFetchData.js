import { useState, useEffect, useCallback } from "react";
import { apiPublic } from "@/lib/api";

/**
 * Fetches data from a public API endpoint.
 * @param {string} path - API path (e.g. API_ROUTES.EXPERIENCE.PUBLIC)
 * @param {string} dataKey - Key to extract from response (e.g. "experiences", "education", "projects")
 * @returns {{ data: any[], loading: boolean, error: string | null, refetch: () => Promise<void> }}
 */
export function useFetchData(path, dataKey) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiPublic(path);
      setData(response[dataKey] ?? []);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [path, dataKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
