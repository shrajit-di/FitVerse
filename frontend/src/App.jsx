import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';

import { DashboardPage } from './pages/DashboardPage';
import { PhysicalFitnessPage } from './pages/PhysicalFitnessPage';
import { NutritionPage } from './pages/NutritionPage';
import { AICoachPage } from './pages/AICoachPage';
import { GymFinderPage } from './pages/GymFinderPage';
import { ShopPage } from './pages/ShopPage';
import { MentalFitnessPage } from './pages/MentalFitnessPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { CommunityPage } from './pages/CommunityPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Entry Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Core Ecosystem Routes matching Collage */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/assessments" element={<DashboardPage />} />
              <Route path="/workout" element={<PhysicalFitnessPage />} />
              <Route path="/physical" element={<PhysicalFitnessPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/ai-coach" element={<AICoachPage />} />
              <Route path="/gym-finder" element={<GymFinderPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/mental" element={<MentalFitnessPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
