import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAmplitude } from "react-amplitude-provider";
import { useAuth } from "@contexts/AuthContext";
import { setSignupAt } from "@utils/analytics";
function PageTracker() {
  const location = useLocation();
  const { user } = useAuth();
  const {
    trackPageView,
    trackEvent,
    setUserId,
    updateUserProperties,
    resetSession,
    trackLogout,
  } = useAmplitude();

  useEffect(() => {
    const pathname = location.pathname || "/";
    if (user?.username) {
      trackPageView(pathname, { userName: user.username });
    } else {
      trackPageView(pathname);
    }
  }, [location.pathname, trackPageView, user?.username]);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
      updateUserProperties({
        username: user.username,
        streak: user.streak,
        signup_at: user.createdAt,
      });
      setSignupAt(user.createdAt);
      trackEvent("user_identified", { userId: user.id });
    } else {
      setUserId(undefined);
      resetSession();
      trackLogout();
    }
  }, [
    user?.id,
    user?.username,
    user?.streak,
    setUserId,
    updateUserProperties,
    resetSession,
    trackLogout,
    trackEvent,
  ]);

  useEffect(() => {
    const sessionKey = "app_opened_logged";
    if (!sessionStorage.getItem(sessionKey)) {
      trackEvent("App_Opened");
      sessionStorage.setItem(sessionKey, "1");
    }
  }, [location.pathname, user?.id, trackEvent]);

  return null;
}

export default PageTracker;
