import EditButtonSvg from "@assets/EditButton.svg";
import useProfileBox from "./useProfileBox";

const EditButton = () => {
  return (
    <span className="flex flex-row gap-2 h-fit items-center px-1 py-0.5 rounded-sm border border-gray-200">
      <img src={EditButtonSvg} alt="편집 버튼" className="w-4 h-4" />
      <span className="font-semibold text-sm">편집</span>
    </span>
  );
};

interface ProfileBoxProps {
  type: "profileBox" | "sidebar"; // 1: 프로필 페이지, 2: 사이드바
}

const ProfileBox = ({ type }: ProfileBoxProps) => {
  const { id, username, avatarUrl } = useProfileBox();

  if (type === "profileBox") {
    return (
      <div className="w-full shadow-md border border-gray-200 flex flex-row p-4 rounded-md justify-between">
        <div className="flex flex-col gap-4">
          <span className="text-lg font-bold">프로필 정보</span>
          <div className="flex flex-row gap-4">
            <img
              src={avatarUrl}
              alt="프로필 이미지"
              className="w-16 h-16 rounded-full bg-gray-400"
            />
            <div className="flex flex-col">
              <span className="text-sm">닉네임</span>
              <span className="text-lg font-semibold">{username}</span>
              <span className="text-xs text-gray-500">ID: {id}</span>
            </div>
          </div>
        </div>
        <EditButton />
      </div>
    );
  } else {
    return (
      <div className="w-full border-b border-gray-200 flex flex-row gap-4 p-4">
        <img
          src={avatarUrl}
          alt="프로필 이미지"
          className="w-16 h-16 rounded-full bg-gray-400"
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="text-base font-semibold">닉네임</span>
          <span className="text-xs text-gray-500">nn일 스트릭</span>
        </div>
      </div>
    );
  }
};

export default ProfileBox;
