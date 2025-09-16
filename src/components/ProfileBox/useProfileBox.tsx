import { useAuth } from "@contexts/AuthContext";

const useProfileBox = () => {
  const { user } = useAuth();

  if (!user) {
    // throw new Error(
    //   "User data is not available. Please ensure you are logged in."
    // );
    // tmprary solution for guest user
    return {
      id: "",
      username: "Guest",
      avatarUrl: "https://placehold.co/640",
      streakDays: 0,
      maxStreakDays: 0,
    };
  }

  return {
    id: user.id,
    username: user.username,
    avatarUrl: user.avatarUrl || "https://placehold.co/640",
    streakDays: user.streakDays,
    maxStreakDays: user.maxStreakDays,
  };
};

export default useProfileBox;
