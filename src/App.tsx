import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import SearchRecordPage from "@pages/SearchRecordPage";
import ReadRecordPage from "@pages/ReadRecordPage";
import CreateRecordPage from "@pages/CreateRecordPage";
import EditRecordPage from "@pages/EditRecordPage";
import DashboardPage from "@pages/DashboardPage";
import MyRecordPage from "@pages/MyRecordPage";
import MyIdeasPage from "@pages/MyIdeasPage";
import MyBookmarksPage from "@pages/MyBookmarksPage";
import ProfilePage from "@pages/ProfilePage";
import KakaoLoginPage from "@pages/KakaoLoginPage";
import GithubLoginPage from "@pages/GithubLoginPage";
import LayoutWithHeader from "@components/Layout/layoutWithHeader";
import { AuthProvider } from "@contexts/AuthContext";
import LayoutWithSidebar from "@components/Layout/layoutWithSidebar";
import MyDraftsPage from "@pages/MyDraftsPage";
import MyRecommendPage from "@pages/MyRecommendPage";
import { AmplitudeProvider } from "react-amplitude-provider";
import PageTracker from "@components/Analytics/PageTracker";

function App() {
  return (
    <AmplitudeProvider
      apiKey="15ff9515f122b93f1d910f7f063e5d82"
      isTrackingEnabled={true}
    >
      <AuthProvider>
        <PageTracker />
        <Routes>
          <Route path="/" element={<LayoutWithHeader />}>
            <Route index element={<MainPage />} />
            <Route path="search-result" element={<SearchRecordPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="login/kakao" element={<KakaoLoginPage />} />
            <Route path="login/github" element={<GithubLoginPage />} />
            <Route path="read/:id" element={<ReadRecordPage />} />
            <Route element={<LayoutWithSidebar />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="record/create" element={<CreateRecordPage />} />
              <Route path="record/edit/:id" element={<EditRecordPage />} />
              <Route path="my-ideas" element={<MyIdeasPage />} />
              <Route path="my-records" element={<MyRecordPage />} />
              <Route path="my-recommend" element={<MyRecommendPage />} />
              <Route path="temp-record" element={<MyDraftsPage />} />
              <Route path="my-bookmarks" element={<MyBookmarksPage />} />
              <Route path="my-profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </AmplitudeProvider>
  );
}

export default App;
