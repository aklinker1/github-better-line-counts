import "./Spinner.css";

export function Spinner(color: string): HTMLElement {
  const border = (borderColor: string) => `2px solid ${borderColor}`;
  const root = document.createElement("div");
  root.classList.add("github-better-line-count-spinner");
  root.style.marginLeft = "4px";
  root.style.width = "10px";
  root.style.height = "10px";
  root.style.borderLeft = border(color);
  root.style.borderTop = border(color);
  root.style.borderRight = border("transparent");
  root.style.borderBottom = border(color);
  root.style.borderRadius = "100%";
  root.style.display = "inline-block";
  return root;
}
