interface StatsCardsProps {
  stats: any;
}

interface CardProps {
  title: string;
  value: string;
  tag?: string;
  iconBg?: string;
  iconEmoji: React.ReactNode;
  textColor?: string;
}

const Card = ({
  title,
  value,
  tag,
  iconBg,
  iconEmoji,
  textColor,
}: CardProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 p-4 bg-white rounded-xl shadow border border-gray-100 aspect-[300/130]">
      <div className="gap-3 flex flex-row items-center">
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-lg ${
            iconBg || "bg-gray-100"
          }`}
        >
          {iconEmoji}
        </div>

        <div className="flex flex-col items-start">
          <span className="text-[#0F172B] text-base font-semibold">
            {title}
          </span>
          <span
            style={{ color: textColor || "black" }}
            className="font-semibold text-lg"
          >
            {value}
          </span>
        </div>
      </div>
      {tag && <span className="text-[#45556C] text-sm">{tag}</span>}
    </div>
  );
};

const StatsCards = ({ stats }: StatsCardsProps) => {
  console.log(stats);
  const streakDays = stats?.profile?.streakDays || 0;
  const maxStreakDays = stats?.profile?.maxStreakDays || 0;

  const totalCount = stats?.records?.totalCount || 0;
  const thisWeekCount = stats?.records?.thisWeekCount || 0;
  const successCount = stats?.records?.successCount || 0;
  const successRate =
    totalCount > 0 ? Math.round((successCount / totalCount) * 1000) / 10 : 0;

  const bookmarkCount = stats?.bookmarks?.totalCount || 0;
  const bookmarkDelta = stats?.bookmarks?.thisWeekCount || 0;

  const ideaCount = stats?.ideas?.totalCount || 0;
  const topIdeaType = stats?.ideas?.topCategory?.name || "";

  const topCategory = stats?.categories?.mostSolvedCategory?.name || "";
  const topCategoryCount = stats?.categories?.mostSolvedCategory?.count || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="연속 기록일"
        value={`${streakDays}일`}
        tag={`최장 연속: ${maxStreakDays}일`}
        iconBg="bg-orange-100"
        textColor="#F54900"
        iconEmoji={
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.66699 1.66675V5.00008"
              stroke="#F54900"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.333 1.66675V5.00008"
              stroke="#F54900"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.8333 3.33325H4.16667C3.24619 3.33325 2.5 4.07944 2.5 4.99992V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99992C17.5 4.07944 16.7538 3.33325 15.8333 3.33325Z"
              stroke="#F54900"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 8.33325H17.5"
              stroke="#F54900"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <Card
        title="기록 수"
        value={`${totalCount}개`}
        tag={`이번 주: +${thisWeekCount}개`}
        iconBg="bg-blue-100"
        textColor="#155DFC"
        iconEmoji={
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3304 18.3334C14.9328 18.3334 18.6637 14.6025 18.6637 10.0001C18.6637 5.39771 14.9328 1.66675 10.3304 1.66675C5.72803 1.66675 1.99707 5.39771 1.99707 10.0001C1.99707 14.6025 5.72803 18.3334 10.3304 18.3334Z"
              stroke="#155DFC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.3301 15C13.0915 15 15.3301 12.7614 15.3301 10C15.3301 7.23858 13.0915 5 10.3301 5C7.56865 5 5.33008 7.23858 5.33008 10C5.33008 12.7614 7.56865 15 10.3301 15Z"
              stroke="#155DFC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.3298 11.6666C11.2502 11.6666 11.9964 10.9204 11.9964 9.99992C11.9964 9.07944 11.2502 8.33325 10.3298 8.33325C9.40928 8.33325 8.66309 9.07944 8.66309 9.99992C8.66309 10.9204 9.40928 11.6666 10.3298 11.6666Z"
              stroke="#155DFC"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <Card
        title="성공률"
        value={`${successRate}%`}
        tag={`${successCount}/${totalCount} 문제 성공`}
        iconBg="bg-green-100"
        textColor="#00A63E"
        iconEmoji={
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9938 5.83325L11.9105 12.9166L7.74381 8.74992L2.32715 14.1666"
              stroke="#00A63E"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.9932 5.83325H18.9932V10.8333"
              stroke="#00A63E"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <Card
        title="북마크"
        value={`${bookmarkCount}개`}
        tag={`이번 주: +${bookmarkDelta}개`}
        iconBg="bg-purple-100"
        textColor="#9810FA"
        iconEmoji={
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.60404 1.91249C9.64056 1.83871 9.69697 1.7766 9.76692 1.73318C9.83686 1.68976 9.91755 1.66675 9.99987 1.66675C10.0822 1.66675 10.1629 1.68976 10.2328 1.73318C10.3028 1.7766 10.3592 1.83871 10.3957 1.91249L12.3207 5.81166C12.4475 6.0683 12.6347 6.29033 12.8662 6.4587C13.0977 6.62707 13.3666 6.73675 13.6499 6.77833L17.9549 7.40833C18.0364 7.42014 18.1131 7.45455 18.1761 7.50766C18.2391 7.56076 18.2861 7.63045 18.3116 7.70883C18.337 7.78721 18.3401 7.87116 18.3204 7.95119C18.3006 8.03121 18.2589 8.10412 18.1999 8.16166L15.0865 11.1933C14.8812 11.3934 14.7276 11.6404 14.6389 11.913C14.5502 12.1856 14.5291 12.4757 14.5774 12.7583L15.3124 17.0417C15.3268 17.1232 15.318 17.2071 15.287 17.2839C15.2559 17.3607 15.204 17.4272 15.137 17.4758C15.07 17.5245 14.9907 17.5533 14.9081 17.5591C14.8255 17.5648 14.743 17.5472 14.6699 17.5083L10.8215 15.485C10.568 15.3518 10.2859 15.2823 9.99946 15.2823C9.71306 15.2823 9.43094 15.3518 9.17737 15.485L5.32987 17.5083C5.25681 17.547 5.17437 17.5644 5.09191 17.5585C5.00946 17.5527 4.9303 17.5238 4.86345 17.4752C4.7966 17.4266 4.74473 17.3601 4.71375 17.2835C4.68277 17.2069 4.67392 17.1231 4.68821 17.0417L5.42237 12.7592C5.47087 12.4764 5.44986 12.1862 5.36115 11.9134C5.27245 11.6406 5.11871 11.3935 4.91321 11.1933L1.79987 8.16249C1.74037 8.10502 1.6982 8.03199 1.67817 7.95172C1.65815 7.87145 1.66107 7.78717 1.6866 7.70848C1.71214 7.6298 1.75926 7.55986 1.8226 7.50665C1.88594 7.45343 1.96296 7.41907 2.04487 7.40749L6.34904 6.77833C6.63259 6.73708 6.90186 6.62754 7.13369 6.45915C7.36552 6.29076 7.55296 6.06855 7.67987 5.81166L9.60404 1.91249Z"
              stroke="#9810FA"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <Card
        title="핵심 아이디어"
        value={`${ideaCount}개`}
        tag={topIdeaType ? `가장 많은 유형: ${topIdeaType}` : undefined}
        iconBg="bg-indigo-100"
        textColor="#4F39F6"
        iconEmoji={
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2274 10.7417L14.4899 17.8467C14.504 17.9304 14.4923 18.0163 14.4562 18.0932C14.4202 18.17 14.3615 18.2339 14.2881 18.2765C14.2148 18.3191 14.1301 18.3383 14.0455 18.3315C13.961 18.3246 13.8805 18.2922 13.8149 18.2384L10.8315 15.9992C10.6875 15.8916 10.5126 15.8335 10.3328 15.8335C10.153 15.8335 9.97806 15.8916 9.83404 15.9992L6.8457 18.2375C6.78014 18.2912 6.69976 18.3237 6.61528 18.3305C6.53081 18.3373 6.44626 18.3182 6.37292 18.2758C6.29958 18.2333 6.24093 18.1695 6.2048 18.0928C6.16867 18.0162 6.15678 17.9303 6.1707 17.8467L7.43237 10.7417"
              stroke="#4F39F6"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.3301 11.6667C13.0915 11.6667 15.3301 9.42817 15.3301 6.66675C15.3301 3.90532 13.0915 1.66675 10.3301 1.66675C7.56865 1.66675 5.33008 3.90532 5.33008 6.66675C5.33008 9.42817 7.56865 11.6667 10.3301 11.6667Z"
              stroke="#4F39F6"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
      <Card
        title="가장 많이 기록한 유형"
        value={topCategory || "-"}
        tag={`${topCategoryCount}문제`}
        iconBg="bg-yellow-100"
        textColor="#E17100"
        iconEmoji={
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6605 18.3334C15.2629 18.3334 18.9938 14.6025 18.9938 10.0001C18.9938 5.39771 15.2629 1.66675 10.6605 1.66675C6.05811 1.66675 2.32715 5.39771 2.32715 10.0001C2.32715 14.6025 6.05811 18.3334 10.6605 18.3334Z"
              stroke="#E17100"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.6602 15C13.4216 15 15.6602 12.7614 15.6602 10C15.6602 7.23858 13.4216 5 10.6602 5C7.89873 5 5.66016 7.23858 5.66016 10C5.66016 12.7614 7.89873 15 10.6602 15Z"
              stroke="#E17100"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.6598 11.6666C11.5803 11.6666 12.3265 10.9204 12.3265 9.99992C12.3265 9.07944 11.5803 8.33325 10.6598 8.33325C9.73936 8.33325 8.99316 9.07944 8.99316 9.99992C8.99316 10.9204 9.73936 11.6666 10.6598 11.6666Z"
              stroke="#E17100"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
    </div>
  );
};

export default StatsCards;
