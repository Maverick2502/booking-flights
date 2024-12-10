import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TicketsPage from "./pages/tickets/index.tsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TicketsPage />
  </StrictMode>
);
