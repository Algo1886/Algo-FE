import "./App.css";

import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import SearchResultPage from "@pages/SearchResultPage";
import ReadSolutionPage from "@pages/ReadSolutionPage";
import CreateSolutionPage from "@pages/CreateSolutionPage";
import DashboardPage from "@pages/DashboardPage";
import BookmarkPage from "@pages/BookmarkPage";
import IdeaPage from "@pages/IdeaPage";
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
        {/* TODO: constants/routes.json과 싱크 맞추기 */}
        <Route path="/" element={<LayoutWithHeader />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/kakao" element={<KakaoLoginPage />} />
          <Route path="/login/github" element={<GithubLoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/read" element={<ReadSolutionPage />} />
          <Route path="/create" element={<CreateSolutionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/" element={<LayoutWithSidebar />}>
            <Route path="/idea" element={<IdeaPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
