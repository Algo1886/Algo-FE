import EditButtonSvg from "@assets/EditButton.svg";

const EditButton = () => {
  return (
    <span className="flex flex-row gap-2 h-fit items-center px-1 py-0.5 rounded-sm border border-gray-200">
      <img src={EditButtonSvg} alt="편집 버튼" className="w-4 h-4" />
      <span className="font-semibold text-sm">편집</span>
    </span>
  );
};

const ProfileBox = () => {
  return (
    <div className="w-full shadow-md border border-gray-200 flex flex-row p-4 rounded-md justify-between">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-bold">프로필 정보</span>
        <div className="flex flex-row gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-400" />
          <div className="flex flex-col">
            <span className="text-sm">닉네임</span>
            <span className="text-lg font-semibold">닉네임</span>
          </div>
        </div>
      </div>
      <EditButton />
    </div>
  );
};
export default ProfileBox;
