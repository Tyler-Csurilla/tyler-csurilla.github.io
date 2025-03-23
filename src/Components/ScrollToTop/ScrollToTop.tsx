import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will force scroll to top whenever the path changes, similar to how page refreshes work. Useful since this is using hash routing.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
