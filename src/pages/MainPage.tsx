import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
      <h1>Main Page</h1>
      <button onClick={() => navigate("/login")}>Login Page</button>
      <button onClick={() => navigate("/search")}>Search Result Page</button>
      <button onClick={() => navigate("/read")}>Read Solution Page</button>
      <button onClick={() => navigate("/create")}>Create Solution Page</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard Page</button>
      <button onClick={() => navigate("/bookmark")}>Bookmark Page</button>
      <button onClick={() => navigate("/idea")}>Idea Page</button>
      <button onClick={() => navigate("/profile")}>Profile Page</button>
    </div>
  );
}

export default MainPage;