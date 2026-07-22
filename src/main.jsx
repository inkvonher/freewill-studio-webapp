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
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper text-ink">
      <div className="relative flex flex-col items-center gap-4">
        {/* Mira cibernética con núcleo dorado pulsante */}
        <div className="relative h-12 w-12 border border-ink/[0.15]">
          <div className="absolute inset-0.5 border border-dashed border-ink/[0.3] animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute inset-2 bg-gold animate-pulse" />
          <div className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 border-ink" />
          <div className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 border-ink" />
          <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 border-ink" />
          <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 border-ink" />
        </div>
        <span className="font-condensed text-xs font-black uppercase tracking-[0.2em] text-ink/70 animate-pulse">
          Estableciendo enlace...
        </span>
      </div>
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
