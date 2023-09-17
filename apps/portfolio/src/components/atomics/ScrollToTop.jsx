import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //auto scroll to the top when switching route, useful for react router
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}