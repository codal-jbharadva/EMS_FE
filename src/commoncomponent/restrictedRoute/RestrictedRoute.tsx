import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

interface RestrictedRouteProps extends RouteProps {
  element: React.ComponentType<any>;
  isRestricted: boolean;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ element: Component, isRestricted, ...rest }) => {
  const { isAdmin } = useAppSelector(state => state.auth); // Adjust based on your state structure

  return (
    <Route
      {...rest}
      element={isRestricted && !isAdmin ? <Navigate to="/not-authorized" /> : <Component />}
    />
  );
};

export default RestrictedRoute;
