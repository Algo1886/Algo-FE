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
import { useAmplitude } from "react-amplitude-provider";
import { MEANINGFUL_EVENT_NAMES, trackMeaningfulEvent } from "@utils/analytics";
import CodeEditor from "@components/CodeEditor";
import Loading from "@components/Loading";
import SuccessIcon from "@assets/SuccessIcon.svg";
import FailIcon from "@assets/FailIcon.svg";
import { useConfirm } from "@contexts/ConfirmContext";
import { useToast } from "@contexts/ToastContext";

interface RecordResponse {
  id: number;
  title: string;
  problemUrl: string;
  problem: {
    id: number;
    source: string;
    displayId: string;
  };
  categories: number;
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
  const { confirm } = useConfirm();
  const amplitude = useAmplitude();
  const [record, setRecord] = useState<RecordResponse | null>(null);
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const {showToast} = useToast()

  const isReviewing = new URLSearchParams(window.location.search).get(
    "isReviewing"
  );

  useEffect(() => {
    const loadRecord = async () => {
      try {
        if (!id) return;
        const res = await fetchRecordById(Number(id));
        setRecord(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRecord();
  }, [id]);

  const handleDelete = async () => {
    const ok = await confirm({
      title: "기록 삭제",
      detail: "기록을 삭제하시겠습니까?",
      confirmButtonLabel: "삭제"
    });
  
    if (ok && record) {
      try {
        await deleteRecordById(record.id);
        showToast("게시물이 삭제되었습니다"); 
        navigate(-1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleBookmarkToggle = async () => {
    if (!record) return;
    try {
      if (record.isBookmarked) {
        await deleteBookmarkById(record.id);
        showToast("북마크가 취소되었습니다!");
      } else {
        await createBookmarkById(record.id);
        showToast("풀이가 북마크되었어요!");
        trackMeaningfulEvent(amplitude, MEANINGFUL_EVENT_NAMES.Bookmark_Added, {
          recordId: record.id,
        });
      }
      setRecord({ ...record, isBookmarked: !record.isBookmarked });
    } catch (err) {
      console.error(err);
      showToast("북마크 변경에 실패했습니다");
    }
  };

  if (!record) return <Loading />;

  return (
    id && (
      <div className="max-w-[1280px] mx-auto p-6 space-y-10">
        <HeaderListBox
          id={id}
          title={record.title}
          category={record.categories}
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
            onDelete: handleDelete,
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
      </div>
    )
  );
};

export default ReadRecordPage;
