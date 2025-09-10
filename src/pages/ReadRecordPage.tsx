import { useEffect, useState } from "react";
import DefaultListBox from "@components/ListBox";
import HeaderListBox from "@components/ListBox/HeaderListBox";
import {
  fetchRecordById,
  createBookmarkById,
  deleteBookmarkById,
  deleteRecordById,
} from "@api/records";
import { useParams, useNavigate } from "react-router-dom";
import SuccessIcon from "@assets/SuccessIcon.svg";
import FailIcon from "@assets/FailIcon.svg";

interface RecordResponse {
  id: number;
  title: string;
  problemUrl: string;
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

const SuccessChip = () => {
  return (
    <span className="rounded border-[#B9F8CF] bg-[#DCFCE7] flex gap-1 py-1 px-2">
      <img src={SuccessIcon} alt="Success" className="w-4 h-4" />
      <span className="text-[#027A48] text-sm font-medium">성공</span>
    </span>
  );
};

const FailChip = () => {
  return (
    <span className="rounded border-[#FECACA] bg-[#FEF2F2] flex gap-1 py-1 px-2">
      <img src={FailIcon} alt="Fail" className="w-4 h-4" />
      <span className="text-[#B42318] text-sm font-medium">실패</span>
    </span>
  );
};

const formatYmd = (iso: string): string => {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const dd = `${d.getDate()}`.padStart(2, "0");
  return `${y}/${m}/${dd}`;
};

const ReadRecordPage = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState<RecordResponse | null>(null);
  const { id } = useParams<{ id: string }>();

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

  const handleBookmarkToggle = async () => {
    if (!record) return;
    try {
      if (record.isBookmarked) {
        await deleteBookmarkById(record.id);
      } else {
        await createBookmarkById(record.id);
      }
      const next = { ...record, isBookmarked: !record.isBookmarked };
      setRecord(next);
      window.dispatchEvent(
        new CustomEvent("bookmark:toggled", {
          detail: { recordId: record.id, isBookmarked: next.isBookmarked },
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (!record) return <div>로딩 중...</div>;

  const created = formatYmd(record.createdAt);
  const updated = formatYmd(record.updatedAt);
  const timeText =
    created === updated ? created : `${created} (수정: ${updated})`;

  return (
    <div className="w-full flex flex-col items-center p-5 gap-5">
      <HeaderListBox
        title={record.title}
        category={record.categories[0]}
        source={record.source}
        link={record.problemUrl}
        user={record.author.username}
        time={timeText}
        isSuccess={record.status === "success"}
        difficulty={record.difficulty}
        isBookmarked={record.isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
        onEdit={() => navigate(`/record/edit/${record.id}`)}
        onDelete={async () => {
          await deleteRecordById(record.id);
          navigate(-1);
        }}
      />

      {record.detail && (
        <DefaultListBox boxTitle="상세 설명">
          <p className="leading-relaxed text-left whitespace-pre-wrap">
            {record.detail}
          </p>
        </DefaultListBox>
      )}

      <DefaultListBox boxTitle="코드">
        <div className="flex gap-4 flex-col">
          {record.codes.map((c, idx) => (
            <DefaultListBox key={c.id}>
              <div className="w-full flex justify-between mb-2">
                <span>코드 {idx + 1}</span>
                <span>
                  {c.verdict === "pass" ? <SuccessChip /> : <FailChip />}
                </span>
              </div>
              <pre className="bg-[#0F172B] w-full text-white text-sm rounded-lg py-4 px-6 overflow-x-auto">
                <code className="whitespace-pre-wrap break-words">
                  {c.code}
                </code>
              </pre>
            </DefaultListBox>
          ))}
        </div>
      </DefaultListBox>

      {record.steps.length > 0 && (
        <DefaultListBox boxTitle="단계">
          <ol className="space-y-3">
            {record.steps.map((s) => (
              <li key={s.id} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-white text-xs font-semibold">
                  {s.stepOrder}
                </span>
                <p className="flex-1 leading-relaxed text-left">{s.text}</p>
              </li>
            ))}
          </ol>
        </DefaultListBox>
      )}

      {record.ideas.length > 0 && (
        <DefaultListBox boxTitle="핵심 아이디어">
          {record.ideas.map((i) => (
            <p key={i.id} className="text-left">
              {i.content}
            </p>
          ))}
        </DefaultListBox>
      )}

      {record.links.length > 0 && (
        <DefaultListBox boxTitle="다른 풀이 참고">
          {record.links.map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-left underline"
            >
              {l.url}
            </a>
          ))}
        </DefaultListBox>
      )}
    </div>
  );
};

export default ReadRecordPage;
