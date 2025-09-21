const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID
const REDIRECT_URI = "http://localhost:5173/login/github"

const GithubLoginButton = () => {
  const goToGithubAuth = () => {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`
    window.location.href = url
  }

  return (
    <button
      onClick={goToGithubAuth}
      className="w-full py-3 rounded-[12px] bg-black text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
    >
      GitHub 로그인
    </button>
  )
}

export default GithubLoginButton