import { Routes, Route } from "react-router-dom"
import { AmplitudeProvider } from "react-amplitude-provider"

import MainPage from "@pages/MainPage"
import LoginPage from "@pages/LoginPage"
import KakaoLoginPage from "@pages/KakaoLoginPage"
import GithubLoginPage from "@pages/GithubLoginPage"
import SearchRecordPage from "@pages/SearchRecordPage"
import ReadRecordPage from "@pages/ReadRecordPage"
import CreateRecordPage from "@pages/CreateRecordPage"
import EditRecordPage from "@pages/EditRecordPage"
import DashboardPage from "@pages/DashboardPage"
import MyRecordPage from "@pages/MyRecordPage"
import MyIdeasPage from "@pages/MyIdeasPage"
import MyBookmarksPage from "@pages/MyBookmarksPage"
import MyDraftsPage from "@pages/MyDraftsPage"
import MyRecommendPage from "@pages/MyRecommendPage"
import ProfilePage from "@pages/ProfilePage"

import LayoutWithHeader from "@components/Layout/layoutWithHeader"
import LayoutWithFooter from "@components/Layout/layoutWithFooter"
import LayoutWithSidebar from "@components/Layout/layoutWithSidebar"

import { AuthProvider } from "@contexts/AuthContext"
import { ConfirmProvider } from "@contexts/ConfirmContext"
import { ToastProvider } from "@contexts/ToastContext"
import PageTracker from "@components/Analytics/PageTracker"

function App() {
  const isProd =
    typeof window !== "undefined" &&
    window.location.hostname === "algo-fe-five.vercel.app"

  return (
    <AmplitudeProvider
      apiKey="20c27ab00f81358951cc8725ef6401c3"
      isTrackingEnabled={false}
    >
      <ConfirmProvider>
      <ToastProvider>
        <AuthProvider>
          {isProd && <PageTracker />}

          <Routes>
            <Route path="/" element={<LayoutWithHeader />}>
              {/* Header + Footer */}
              <Route element={<LayoutWithFooter />}>
                <Route index element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="login/kakao" element={<KakaoLoginPage />} />
                <Route path="login/github" element={<GithubLoginPage />} />
                <Route path="search-result" element={<SearchRecordPage />} />
                <Route path="read/:id" element={<ReadRecordPage />} />
              </Route>

              {/* Header + Sidebar */}
              <Route element={<LayoutWithSidebar />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="record/create" element={<CreateRecordPage />} />
                <Route path="record/edit/:id" element={<EditRecordPage />} />
                <Route path="my-records" element={<MyRecordPage />} />
                <Route path="my-ideas" element={<MyIdeasPage />} />
                <Route path="my-recommend" element={<MyRecommendPage />} />
                <Route path="temp-record" element={<MyDraftsPage />} />
                <Route path="my-bookmarks" element={<MyBookmarksPage />} />
                <Route path="my-profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
      </ConfirmProvider>
    </AmplitudeProvider>
  )
}

export default App