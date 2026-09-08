import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MentalFitnessPage } from './pages/MentalFitnessPage';
import { PhysicalFitnessPage } from './pages/PhysicalFitnessPage';
import { NutritionPage } from './pages/NutritionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AICoachPage } from './pages/AICoachPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { CommunityPage } from './pages/CommunityPage';
import { ShopPage } from './pages/ShopPage';
import { CalendarPage } from './pages/CalendarPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Ecosystem Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/mental" element={<MentalFitnessPage />} />
              <Route path="/physical" element={<PhysicalFitnessPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/ai-coach" element={<AICoachPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/messages" element={<MessagesPage />} />
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
