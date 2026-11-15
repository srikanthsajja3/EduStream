import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import ContentPush from './pages/ContentPush';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Academics from './pages/Academics';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Layout from './components/Layout';
import DataProtection from './pages/policies/DataProtection';
import UsageTerms from './pages/policies/UsageTerms';
import PaymentTerms from './pages/policies/PaymentTerms';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/content-push" 
            element={
              <ProtectedRoute>
                <ContentPush />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students" 
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teachers" 
            element={
              <ProtectedRoute>
                <Teachers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/academics" 
            element={
              <ProtectedRoute>
                <Academics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fees" 
            element={
              <ProtectedRoute>
                <Fees />
              </ProtectedRoute>
            } 
          />
          <Route path="/privacy-policy" element={<DataProtection />} />
          <Route path="/terms-of-service" element={<UsageTerms />} />
          <Route path="/refund-policy" element={<PaymentTerms />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
