import { createContext, useContext } from "react";

export const PortfolioContext = createContext(null);

/** Access the single public-portfolio fetch. Must be used inside PortfolioProvider. */
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used inside <PortfolioProvider>");
  return context;
}
