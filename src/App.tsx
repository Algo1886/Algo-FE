import "./App.css";

import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import SearchResultPage from "@pages/SearchResultPage";
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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LayoutWithHeader />}>
          <Route index element={<MainPage />} /> {/* "/" */}
          <Route path="/search" element={<SearchResultPage />} />
          {/* <Route path="/read" element={<ReadSolutionPage />} />
          <Route path="/create" element={<CreateSolutionPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} /> */}
          <Route path="login" element={<LoginPage />} />
          <Route path="login/kakao" element={<KakaoLoginPage />} />
          <Route path="login/github" element={<GithubLoginPage />} />
          <Route path="search-result" element={<SearchResultPage />} />
          <Route path="read/:id" element={<ReadRecordPage />} />
          <Route element={<LayoutWithSidebar />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="record/create" element={<CreateRecordPage />} />
            <Route path="record/edit/:id" element={<EditRecordPage />} />
            <Route path="my-ideas" element={<MyIdeasPage />} />
            <Route path="my-records" element={<MyRecordPage />} />
            <Route path="my-drafts" element={<MyDraftsPage />} />
            <Route path="my-bookmarks" element={<MyBookmarksPage />} />
            <Route path="my-profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* <Route path="/idea" element={<IdeaPage />} /> */}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
