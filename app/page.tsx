import { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard";
import { AuthModal } from "../components/auth-modal";
import { OnboardingModal } from "../components/onboarding-modal";
import { Toaster } from "../components/ui/toaster";
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("reading-tracker-user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);

      if (!userData.hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("reading-tracker-user", JSON.stringify(userData));

    if (!userData.hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (goals: any) => {
    const updatedUser = { ...user, hasCompletedOnboarding: true, goals };
    setUser(updatedUser);
    setShowOnboarding(false);
    localStorage.setItem("reading-tracker-user", JSON.stringify(updatedUser));
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Dashboard user={user} />
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onClose={() => setShowOnboarding(false)}
        />
      )}
      <Toaster />
    </>
  );
}
