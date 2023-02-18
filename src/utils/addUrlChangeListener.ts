export function addUrlChangeListener(cb: () => void) {
  let currentPath = location.pathname;
  setInterval(() => {
    console.debug("checking URL change...");
    const nextPath = location.pathname;
    if (currentPath !== nextPath) requestIdleCallback(cb);
    currentPath = nextPath;
  }, 1e3);
}
