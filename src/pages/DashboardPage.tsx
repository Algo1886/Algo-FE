import RadarCanvasChart from "@components/CustomChart";
import GrassGraph from "@components/GrassGraph";
import DefaultListBox from "@components/ListBox";
import HeaderListBox from "@components/ListBox/HeaderListBox";
import PreviewCard from "@components/PreviewCard";
import RightChevron from "@assets/RightChevron.svg";
import TypeRankingList from "@components/RankingList";
import RankingList from "@components/RankingList";

interface IconWrapperProps extends React.PropsWithChildren {
  bgColor?: string;
}

const IconWrapper = ({ bgColor, children }: IconWrapperProps) => {
  return (
    <div style={{ backgroundColor: bgColor }} className="p-2 roundedLg w-9 h-9">
      {children}
    </div>
  );
};

const labels = [
  "math",
  "geometry",
  "implementation",
  "greedy",
  "graphs",
  "data_structures",
];
const values = [90, 85, 70, 60, 65, 20];

const dummyData = Array.from({ length: 365 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (364 - i));
  const count = Math.random() < 0.7 ? Math.floor(Math.random() * 10) : 0;
  return {
    date: date.toISOString().split("T")[0],
    count,
  };
});

const dummyProblemTypeData = [
  { name: "그리디", count: 25 },
  { name: "DFS", count: 25 },
  { name: "배열", count: 22 },
  { name: "스택/큐", count: 18 },
  { name: "백트래킹", count: 19 },
  { name: "정렬", count: 15 },
  { name: "BFS", count: 14 },
  { name: "DP", count: 12 },
  { name: "문자열", count: 9 },
  { name: "비트마스크", count: 4 },
];

function DashboardPage() {
  const handleBookmarkToggle = () => {
    // TODO: 서버 연동 시 API 호출
    console.log("북마크 토글됨");
  };

  return (
    <div className="w-full items-center flex flex-col p-4 bg-[#F8FAFC]">
      <div className="grid grid-cols-4 gap-4 w-full">
        <DefaultListBox>
          <div className="flex flex-row gap-4 items-center">
            <IconWrapper bgColor="#DBEAFE">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 9.99999C18.3334 5.39762 14.6025 1.66666 10.0001 1.66666C5.39771 1.66666 1.66675 5.39762 1.66675 9.99999C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                  stroke="#155DFC"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
                  stroke="#155DFC"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.99992 11.6667C10.9204 11.6667 11.6666 10.9205 11.6666 10C11.6666 9.07954 10.9204 8.33334 9.99992 8.33334C9.07944 8.33334 8.33325 9.07954 8.33325 10C8.33325 10.9205 9.07944 11.6667 9.99992 11.6667Z"
                  stroke="#155DFC"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconWrapper>
            <div className="flex flex-col items-start">
              <span className="text-sm text-[#45556C]">알고리즘 기록 수</span>
              <span style={{ color: "#155DFC" }} className="text-2xl font-bold">
                187개
              </span>
            </div>
          </div>
        </DefaultListBox>
        <DefaultListBox>
          <div className="flex flex-row gap-4 items-center">
            <IconWrapper bgColor="#FFEDD4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66675 1.66666V4.99999"
                  stroke="#F54900"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 1.66666V4.99999"
                  stroke="#F54900"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 3.33334H4.16667C3.24619 3.33334 2.5 4.07954 2.5 5.00001V16.6667C2.5 17.5872 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5872 17.5 16.6667V5.00001C17.5 4.07954 16.7538 3.33334 15.8333 3.33334Z"
                  stroke="#F54900"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 8.33334H17.5"
                  stroke="#F54900"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconWrapper>
            <div className="flex flex-col items-start">
              <span className="text-sm text-[#45556C]">스트릭</span>
              <span style={{ color: "#F54900" }} className="text-2xl font-bold">
                187개
              </span>
            </div>
          </div>
        </DefaultListBox>
        <DefaultListBox>
          <div className="flex flex-row gap-4 items-center">
            <IconWrapper bgColor="#DCFCE7">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 5.83334L11.2501 12.9167L7.08341 8.75001L1.66675 14.1667"
                  stroke="#00A63E"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 5.83334H18.3333V10.8333"
                  stroke="#00A63E"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconWrapper>
            <div className="flex flex-col items-start">
              <span className="text-sm text-[#45556C]">총 성공률</span>
              <span style={{ color: "#00A63E" }} className="text-2xl font-bold">
                187개
              </span>
            </div>
          </div>
        </DefaultListBox>
        <DefaultListBox>
          <div className="flex flex-row gap-4 items-center">
            <IconWrapper bgColor="#F3E8FF">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.60428 1.91249C9.6408 1.83871 9.69722 1.7766 9.76716 1.73318C9.8371 1.68976 9.91779 1.66675 10.0001 1.66675C10.0824 1.66675 10.1631 1.68976 10.2331 1.73318C10.303 1.7766 10.3594 1.83871 10.396 1.91249L12.3209 5.81166C12.4478 6.0683 12.635 6.29033 12.8665 6.4587C13.098 6.62707 13.3669 6.73675 13.6501 6.77833L17.9551 7.40833C18.0367 7.42014 18.1133 7.45455 18.1764 7.50766C18.2394 7.56076 18.2863 7.63045 18.3118 7.70883C18.3373 7.78721 18.3403 7.87116 18.3206 7.95119C18.3009 8.03121 18.2591 8.10412 18.2001 8.16166L15.0868 11.1933C14.8815 11.3934 14.7278 11.6404 14.6391 11.913C14.5504 12.1856 14.5293 12.4757 14.5776 12.7583L15.3126 17.0417C15.327 17.1232 15.3182 17.2071 15.2872 17.2839C15.2562 17.3607 15.2042 17.4272 15.1372 17.4758C15.0702 17.5245 14.9909 17.5533 14.9083 17.5591C14.8257 17.5648 14.7432 17.5472 14.6701 17.5083L10.8218 15.485C10.5682 15.3518 10.2861 15.2823 9.9997 15.2823C9.7133 15.2823 9.43119 15.3518 9.17762 15.485L5.33012 17.5083C5.25706 17.547 5.17461 17.5644 5.09216 17.5585C5.0097 17.5527 4.93055 17.5238 4.8637 17.4752C4.79684 17.4266 4.74498 17.3601 4.714 17.2835C4.68302 17.2069 4.67416 17.1231 4.68845 17.0417L5.42262 12.7592C5.47111 12.4764 5.4501 12.1862 5.3614 11.9134C5.27269 11.6406 5.11896 11.3935 4.91345 11.1933L1.80012 8.16249C1.74061 8.10502 1.69844 8.03199 1.67842 7.95172C1.65839 7.87145 1.66131 7.78717 1.68685 7.70848C1.71238 7.6298 1.75951 7.55986 1.82285 7.50665C1.88619 7.45343 1.9632 7.41907 2.04512 7.40749L6.34928 6.77833C6.63283 6.73708 6.90211 6.62754 7.13394 6.45915C7.36577 6.29076 7.5532 6.06855 7.68012 5.81166L9.60428 1.91249Z"
                  stroke="#9810FA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconWrapper>
            <div className="flex flex-col items-start">
              <span className="text-sm text-[#45556C]">북마크</span>
              <span style={{ color: "#9810FA" }} className="text-2xl font-bold">
                187개
              </span>
            </div>
          </div>
        </DefaultListBox>
        <div className="col-span-2">
          <DefaultListBox
            boxTitle={
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-4 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0001 18.3333C14.6025 18.3333 18.3334 14.6024 18.3334 9.99999C18.3334 5.39762 14.6025 1.66666 10.0001 1.66666C5.39771 1.66666 1.66675 5.39762 1.66675 9.99999C1.66675 14.6024 5.39771 18.3333 10.0001 18.3333Z"
                      stroke="black"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
                      stroke="black"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99992 11.6667C10.9204 11.6667 11.6666 10.9205 11.6666 10C11.6666 9.07954 10.9204 8.33334 9.99992 8.33334C9.07944 8.33334 8.33325 9.07954 8.33325 10C8.33325 10.9205 9.07944 11.6667 9.99992 11.6667Z"
                      stroke="black"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-xl font-semibold">추천 복습 기록</div>
                </div>
                <div className="flex flex-row gap-1 items-center text-sm text-[#45556C]">
                  전체보기
                  <img src={RightChevron} alt=">" className="inline ml-1" />
                </div>
              </div>
            }
          >
            <div className="flex flex-col gap-4">
              <PreviewCard
                type="DP"
                title="최적의 알고리즘 구하기"
                date="2025-05-02"
              />
              <PreviewCard
                type="DP"
                title="최적의 알고리즘 구하기"
                date="2025-05-02"
              />
            </div>
          </DefaultListBox>
        </div>
        <div className="col-span-2">
          <DefaultListBox
            boxTitle={
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-4 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8975 10.7417L14.16 17.8467C14.1742 17.9303 14.1624 18.0163 14.1264 18.0931C14.0903 18.1699 14.0317 18.2339 13.9583 18.2765C13.8849 18.3191 13.8003 18.3382 13.7157 18.3314C13.6311 18.3246 13.5507 18.2921 13.485 18.2383L10.5017 15.9992C10.3577 15.8916 10.1827 15.8334 10.003 15.8334C9.82318 15.8334 9.64822 15.8916 9.5042 15.9992L6.51587 18.2375C6.4503 18.2912 6.36992 18.3236 6.28545 18.3305C6.20098 18.3373 6.11643 18.3182 6.04309 18.2757C5.96975 18.2333 5.9111 18.1694 5.87497 18.0928C5.83884 18.0161 5.82694 17.9303 5.84087 17.8467L7.10254 10.7417"
                      stroke="#0F172B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 11.6667C12.7614 11.6667 15 9.42808 15 6.66666C15 3.90523 12.7614 1.66666 10 1.66666C7.23858 1.66666 5 3.90523 5 6.66666C5 9.42808 7.23858 11.6667 10 11.6667Z"
                      stroke="#0F172B"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="text-xl font-semibold">
                    최근 핵심 아이디어
                  </div>
                </div>
                <div className="flex flex-row gap-1 items-center text-sm text-[#45556C]">
                  전체보기
                  <img src={RightChevron} alt=">" className="inline ml-1" />
                </div>
              </div>
            }
          >
            <div className="flex flex-col gap-4">
              <PreviewCard
                type="DP"
                title="최적의 알고리즘 구하기"
                date="2025-05-02"
              />
              <PreviewCard
                type="DP"
                title="최적의 알고리즘 구하기"
                date="2025-05-02"
              />
            </div>
          </DefaultListBox>
        </div>
        <div className="col-span-4">
          <DefaultListBox boxTitle="최근 1년 간의 기록">
            <GrassGraph data={dummyData} />
            <span className="mt-4 text-sm text-[#45556C] self-start">
              올해 총{" "}
              <b>{dummyData.reduce((acc, cur) => acc + cur.count, 0)}</b>개의
              문제를 기록했습니다.
            </span>
          </DefaultListBox>
        </div>
        <div className="col-span-4">
          <DefaultListBox boxTitle="유형 분포">
            <div className="w-[300px] h-[300px] self-center">
              <RadarCanvasChart
                labels={labels}
                values={values}
                maxValue={100}
                size={300}
              />
            </div>
          </DefaultListBox>
        </div>
        <div className="col-span-4">
          <DefaultListBox boxTitle="유형 순위">
            <div className="w-full">
              <RankingList data={dummyProblemTypeData} />
            </div>
          </DefaultListBox>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
