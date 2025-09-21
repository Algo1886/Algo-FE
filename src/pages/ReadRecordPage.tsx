import { useEffect, useState } from "react";
import DefaultListBox from "@components/ListBox";
import HeaderListBox from "@components/ListBox/HeaderListBox";
import {
  fetchRecordById,
  createBookmarkById,
  deleteBookmarkById,
} from "@api/records";
import { useParams } from "react-router-dom";
import { deleteRecordById } from "@api/records";
import { useNavigate } from "react-router-dom";
import CodeEditor from "@components/CodeEditor";
import Loading from "@components/Loading";
import * as Toast from "@radix-ui/react-toast";
import SuccessIcon from "@assets/SuccessIcon.svg";
import FailIcon from "@assets/FailIcon.svg";

interface RecordResponse {
  id: number;
  title: string;
  problemUrl: string;
  problem: {
    id: number;
    source: string;
    displayId: string;
  };
  categories: string[];
  source: string;
  status: string;
  difficulty: number;
  detail: string;
  codes: {
    id: number;
    code: string;
    language: string;
    verdict: string;
    snippetOrder: number;
  }[];
  steps: { id: number; stepOrder: number; text: string }[];
  ideas: { id: number; content: string }[];
  links: { id: number; url: string }[];
  author: { id: number; username: string; avatarUrl: string };
  isDraft: boolean;
  isPublished: boolean;
  isBookmarked: boolean;
  isOwner: boolean;
  createdAt: string;
  updatedAt: string;
}

const ReadRecordPage = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState<RecordResponse | null>(null);
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const isReviewing = new URLSearchParams(window.location.search).get(
    "isReviewing"
  );

  useEffect(() => {
    const loadRecord = async () => {
      try {
        if (!id) return;
        const res = await fetchRecordById(Number(id));
        setRecord(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRecord();
  }, [id]);

  const handleBookmarkToggle = async () => {
    if (!record) return;
    try {
      if (record.isBookmarked) {
        await deleteBookmarkById(record.id);
        setToastMessage("북마크가 취소되었습니다!");
      } else {
        await createBookmarkById(record.id);
        setToastMessage("풀이가 북마크되었어요!");
      }
      setRecord({ ...record, isBookmarked: !record.isBookmarked });
      setToastOpen(true);
    } catch (err) {
      console.error(err);
      setToastMessage("북마크 변경에 실패했습니다");
      setToastOpen(true);
    }
  };

  if (!record) return <Loading />;

  return (
    id && (
      <div className="max-w-[1280px] mx-auto p-6 space-y-10">
        <HeaderListBox
          id={id}
          title={record.title}
          category={record.categories[0]}
          source={record.source}
          link={record.problemUrl}
          user={record.author.username}
          time={record.createdAt}
          updateTime={
            record.updatedAt !== record.createdAt ? record.updatedAt : undefined
          }
          isSuccess={record.status === "success"}
          difficulty={record.difficulty}
          isBookmarked={record.isBookmarked}
          onBookmarkToggle={handleBookmarkToggle}
          {...(record.isOwner && {
            onEdit: () => navigate(`/record/edit/${record.id}`),
            onDelete: async () => {
              await deleteRecordById(record.id);
              navigate(-1);
            },
          })}
          isReviewing={isReviewing === "true"}
        />
        {record.detail && (
          <DefaultListBox boxTitle="상세사항">
            <p className="whitespace-pre-wrap">{record.detail}</p>
          </DefaultListBox>
        )}

        <DefaultListBox boxTitle="코드">
          {record.codes.map((c, index) => (
            <div
              key={index}
              className="rounded border border-gray-200 p-5 mb-4"
            >
              <div className="flex w-full justify-between mb-2">
                <label>코드 {index + 1}</label>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold gap-1 flex items-center border ${
                    c.verdict === "success"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  <img
                    src={c.verdict === "success" ? SuccessIcon : FailIcon}
                    alt=""
                    className="w-2.5 h-2.5 mr-1 inline"
                  />
                  {c.verdict === "success" ? "성공" : "실패"}
                </span>
              </div>
              <CodeEditor
                value={c.code}
                language={c.language}
                editable={false}
              />
            </div>
          ))}
        </DefaultListBox>
        {record.steps?.length > 0 && (
          <DefaultListBox boxTitle="풀이 과정">
            {record.steps.map((s) => (
              <div key={s.id} className="flex items-center gap-3 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-sm">
                  {s.stepOrder + 1}
                </span>
                <span>{s.text}</span>
              </div>
            ))}
          </DefaultListBox>
        )}

        {record.ideas?.length > 0 && (
          <DefaultListBox boxTitle="핵심 아이디어">
            {record.ideas.map((i) => (
              <p key={i.id}>{i.content}</p>
            ))}
          </DefaultListBox>
        )}

        {record.links?.length > 0 && (
          <DefaultListBox boxTitle="다른 풀이 참고">
            {record.links.map((l) => (
              <p key={l.id}>{l.url}</p>
            ))}
          </DefaultListBox>
        )}
        <Toast.Provider
          duration={3000}
          swipeDirection="right"
          swipeThreshold={100}
        >
          <Toast.Root
            open={toastOpen}
            onOpenChange={setToastOpen}
            className="bg-white text-black border border-gray-300 px-4 py-2 rounded shadow"
          >
            <Toast.Title className="flex flex-row items-center gap-2">
              {toastMessage === "풀이가 북마크되었어요!" && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              )}
              {toastMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 p-4 z-50" />
        </Toast.Provider>
      </div>
    )
  );
};

export default ReadRecordPage;
