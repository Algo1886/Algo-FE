import useProfileBox from "./useProfileBox";

interface ProfileBoxProps {
  type: "profileBox" | "sidebar"; // 1: 프로필 페이지, 2: 사이드바
}

const ProfileBox = ({ type }: ProfileBoxProps) => {
  const { id, username, avatarUrl, streak } = useProfileBox();

  if (type === "profileBox") {
    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-row gap-4">
          <img
            src={avatarUrl}
            alt="프로필 이미지"
            className="w-16 h-16 rounded-full bg-gray-400"
          />
          <div className="flex flex-col gap-2 text-left">
            <span className="text-sm">닉네임</span>
            <span className="text-lg font-semibold">{username}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full border-b border-gray-200 flex flex-row gap-4 p-4">
        <img
          src={avatarUrl}
          alt="프로필 이미지"
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <div className="flex flex-col justify-center gap-1">
          <span className="font-semibold">{username}</span>
          <span className="text-sm text-gray-500">{streak}일 스트릭</span>
        </div>
      </div>
    );
  }
};

export default ProfileBox;
