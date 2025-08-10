import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CommunityProvider } from "./context/CommunityContext";
import { theme } from "./theme/theme";
import CommunitiesPage from "./pages/CommunitiesPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CommunityProvider>
        <Router>
          <Routes>
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/" element={<Navigate to="/communities" replace />} />
          </Routes>
        </Router>
      </CommunityProvider>
    </ThemeProvider>
  );
}

export default App;
