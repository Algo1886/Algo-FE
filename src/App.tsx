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
import LayoutWithHeader from "@components/Layout/layoutWithHeader";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithHeader />}>
        <Route path="/" element={<MainPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/read" element={<ReadSolutionPage />} />
      <Route path="/create" element={<CreateSolutionPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/bookmark" element={<BookmarkPage />} />
      <Route path="/idea" element={<IdeaPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
