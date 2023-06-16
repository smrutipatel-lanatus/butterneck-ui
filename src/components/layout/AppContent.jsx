import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRouteContent } from './ProtectedRouteContent';
import { routes } from './routes';

export function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ route, Component, isProtected = false }) => {
          return (
            <Route
              key={route}
              path={route}
              element={isProtected ? <ProtectedRouteContent Component={Component} /> : <Component />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
