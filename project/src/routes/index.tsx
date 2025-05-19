import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardPage } from '@/pages/Dashboard';
import { SettingsPage } from '@/pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'articles/*',
        element: <DashboardPage />,
      },
      {
        path: 'auto-blog',
        element: <DashboardPage />,
      },
      {
        path: 'internal-links',
        element: <DashboardPage />,
      },
      {
        path: 'free-backlinks',
        element: <DashboardPage />,
      },
      {
        path: 'integrations',
        element: <SettingsPage />,
      },
      {
        path: 'subscription',
        element: <DashboardPage />,
      },
      {
        path: 'affiliate',
        element: <DashboardPage />,
      },
      {
        path: 'help',
        element: <DashboardPage />,
      },
      {
        path: 'updates',
        element: <DashboardPage />,
      },
      {
        path: 'support',
        element: <DashboardPage />,
      },
      {
        path: 'profile',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}