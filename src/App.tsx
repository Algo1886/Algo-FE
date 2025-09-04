import "./App.css";

import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import SearchResultPage from "@pages/SearchResultPage";
import ReadRecordPage from "@pages/ReadRecordPage";
import CreateRecordPage from "@pages/CreateRecordPage";
import DashboardPage from "@pages/DashboardPage";
import MyIdeasPage from "@pages/MyIdeasPage";
import MyBookmarksPage from "@pages/MyBookmarksPage";
import ProfilePage from "@pages/ProfilePage";
import KakaoLoginPage from "@pages/KakaoLoginPage"
import GithubLoginPage from "@pages/GithubLoginPage"
import LayoutWithHeader from "@components/Layout/layoutWithHeader";
import { AuthProvider } from "@contexts/AuthContext";
import LayoutWithSidebar from "@components/Layout/layoutWithSidebar";

function App() {
  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<LayoutWithHeader />}>
        <Route index element={<MainPage />} /> {/* "/" */}
        <Route path="login" element={<LoginPage />} />
        <Route path="login/kakao" element={<KakaoLoginPage />} />
        <Route path="login/github" element={<GithubLoginPage />} />
        <Route path="search-result" element={<SearchResultPage />} />
        <Route path="read/:id" element={<ReadRecordPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route element={<LayoutWithSidebar />}>
          <Route path="record/create" element={<CreateRecordPage />} />
          <Route path="record/edit/:id" element={<EditRecordPage />} />
          <Route path="my-ideas" element={<MyIdeasPage />} />
          <Route path="my-bookmarks" element={<MyBookmarksPage />} />
          <Route path="my-profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
