import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

return (
  <div className="flex flex-col gap-2 p-5">
    <Button onClick={() => navigate("/search")}>Search Result Page</Button>
    <Button onClick={() => navigate("/read")}>Read Solution Page</Button>
    <Button onClick={() => navigate("/dashboard")}>Dashboard Page</Button>
    <Button onClick={() => navigate("/bookmark")}>Bookmark Page</Button>
    <Button onClick={() => navigate("/idea")}>Idea Page</Button>
  </div>
)


}

export default MainPage;
