import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/users" replace />, index: true },
        {
          path: '/dashboard',
          element: <Navigate to="/dashboard/users" replace />,
          index: true,
        },
        { path: '/dashboard/users', element: <Users /> },
        { path: '/dashboard/users/:id', element: <UserPage /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const Users = Loadable(lazy(() => import('../pages/Users')));
const UserPage = Loadable(lazy(() => import('../pages/UserPage')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
