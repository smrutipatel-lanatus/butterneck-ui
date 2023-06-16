import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { Header } from './Header';
import { AuthContextProvider } from '../../context/AuthContextProvider';

export function ProtectedRouteContent({ Component }) {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <Header />
      <ProtectedRoute Component={Component} />
    </AuthContextProvider>
  );
}
