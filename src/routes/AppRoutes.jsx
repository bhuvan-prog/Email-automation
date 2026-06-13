import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import WorkflowBuilder from "../pages/WorkflowBuilder";
import AnalyticsDashboard from "../pages/AnalyticsDashboard";
import EmailTracking from "../pages/EmailTracking";
import SMTPSettings from "../pages/SMTPSettings";
import Integrations from "../pages/Integrations";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/workflow" />}
      />

      <Route
        path="/workflow"
        element={
          <MainLayout>
            <WorkflowBuilder />
          </MainLayout>
        }
      />

      <Route
        path="/analytics"
        element={
          <MainLayout>
            <AnalyticsDashboard />
          </MainLayout>
        }
      />

      <Route
        path="/email-tracking"
        element={
          <MainLayout>
            <EmailTracking />
          </MainLayout>
        }
      />

      <Route
        path="/smtp"
        element={
          <MainLayout>
            <SMTPSettings />
          </MainLayout>
        }
      />

      <Route
        path="/integrations"
        element={
          <MainLayout>
            <Integrations />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;