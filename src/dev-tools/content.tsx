import React from "react";
import { createRoot } from "react-dom/client";
import { PageCompletionOverlay } from "./page-inspector/PageCompletionOverlay";

const host = document.createElement("div");
host.id = "page-inspector-host";

const shadowRoot = host.attachShadow({ mode: "open" });

const rootElement = document.createElement("div");
shadowRoot.appendChild(rootElement);

document.body.appendChild(host);

createRoot(rootElement).render(
  <React.StrictMode>
    <PageCompletionOverlay />
  </React.StrictMode>
);