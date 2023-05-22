import { logger } from "./logger";

export function addUrlChangeListener(cb: () => void) {
  let currentPath = location.pathname;
  setInterval(() => {
    logger.debug("checking URL change...");
    const nextPath = location.pathname;
    if (currentPath !== nextPath) requestIdleCallback(cb);
    currentPath = nextPath;
  }, 1e3);
}
