import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;

if (rootElement.dataset.prerendered === "true") {
  rootElement.replaceChildren();
  delete rootElement.dataset.prerendered;
}

createRoot(rootElement).render(<App />);
