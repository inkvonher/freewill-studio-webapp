import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './i18n.jsx';
import { AuthProvider } from './admin/AuthContext.jsx';
import ProtectedRoute from './admin/ProtectedRoute.jsx';
import './styles.css';

const App = lazy(() => import('./App.jsx'));
const Brief = lazy(() => import('./Brief.jsx'));
const Login = lazy(() => import('./admin/Login.jsx'));
const DashboardLayout = lazy(() => import('./admin/DashboardLayout.jsx'));
const Overview = lazy(() => import('./admin/pages/Overview.jsx'));
const Projects = lazy(() => import('./admin/pages/Projects.jsx'));
const Leads = lazy(() => import('./admin/pages/Leads.jsx'));
const Finance = lazy(() => import('./admin/pages/Finance.jsx'));
const Analytics = lazy(() => import('./admin/pages/Analytics.jsx'));
const Briefs = lazy(() => import('./admin/pages/Briefs.jsx'));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper font-condensed text-sm font-black uppercase tracking-[0.16em] text-ink/[0.55]">
      Cargando
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
      <AuthProvider>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cuestionario" element={<Brief />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="proyectos" element={<Projects />} />
              <Route path="prospectos" element={<Leads />} />
              <Route path="finanzas" element={<Finance />} />
              <Route path="analitica" element={<Analytics />} />
              <Route path="cuestionarios" element={<Briefs />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
