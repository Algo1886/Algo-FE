import { useNavigate } from "react-router-dom";
import ProblemChip from "@components/Chip";
import { useAuth } from "@contexts/AuthContext";

interface RecordCardProps {
  id: number;
  problemType: string;
  problemSite: string;
  title: string;
  author: string;
  createdAt: string;
  draft: boolean;
  isReviewing?: boolean;
}

const RecordCard = ({
  id,
  problemType,
  problemSite,
  title,
  author,
  createdAt,
  draft,
  isReviewing = false,
}: RecordCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (!accessToken) {
      navigate("/login");
      return;
    }

    if (isReviewing) {
      navigate(`/read/${id}?isReviewing=true`);
      return;
    }

    if (draft) {
      navigate(`/record/edit/${id}`);
    } else {
      navigate(`/read/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded border border-gray-200 p-4 min-w-[220px] cursor-pointer hover:bg-gray-100 transition flex flex-col"
    >
      <div className="flex justify-between mb-4">
        <ProblemChip label={problemType} bgColor="blue" textColor="blue" />
        <ProblemChip label={problemSite} />
      </div>
      <h3 className="text-lg font-semibold mb-8 line-clamp-2">{title}</h3>
      <div className="mt-auto">
        <hr className="border-t border-gray-200 my-2" />
        <div className="flex justify-between text-sm text-gray-400">
          <span>{author}</span>
          <span>{createdAt.replaceAll(".", "/")}</span>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
