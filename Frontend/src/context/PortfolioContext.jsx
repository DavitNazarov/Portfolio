import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { apiPublic } from "@/lib/api";
import { PortfolioContext } from "@/context/portfolioStore";

const EMPTY = { projects: [], experiences: [], education: [], awards: [] };

/**
 * Loads everything the public page renders in one request.
 *
 * Each section used to own its own fetch, so experience, education and projects
 * were each requested twice per page load and settled at different moments.
 */
export function PortfolioProvider({ children }) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiPublic("/api/portfolio/public");
      if (!mounted.current) return;
      setData({
        projects: response.projects ?? [],
        experiences: response.experiences ?? [],
        education: response.education ?? [],
        awards: response.awards ?? [],
      });
    } catch (err) {
      if (!mounted.current) return;
      setError(err.message);
      setData(EMPTY);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo(
    () => ({ ...data, loading, error, refetch: load }),
    [data, loading, error, load]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
