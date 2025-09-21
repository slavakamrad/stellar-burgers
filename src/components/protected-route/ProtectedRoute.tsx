import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ReactElement, createElement } from 'react';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state: any) => state.user);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as any)?.from || { pathname: '/' };
    return createElement(Navigate, { to: from, replace: true });
  }

  if (!onlyUnAuth && !user) {
    return createElement(Navigate, {
      to: '/login',
      state: { from: location },
      replace: true
    });
  }

  return children;
};
