import DefaultListBox from "@components/ListBox";
import HeaderListBox from "@components/ListBox/HeaderListBox";

function DashboardPage() {
  const handleBookmarkToggle = () => {
    // TODO: 서버 연동 시 API 호출
    console.log("북마크 토글됨");
  };

  return (
    <div className="w-full items-center flex flex-col">
      <h1>대시보드 페이지</h1>
      <HeaderListBox
        title="피보나치 함수"
        tags={["DP", "백트래킹"]}
        link="https://example.com/problem"
        user="이해린"
        time="10:00"
        isSuccess={true}
        difficulty={3}
        isBookmarked={true}
        onBookmarkToggle={handleBookmarkToggle}
      />
      <DefaultListBox boxTitle="코드">
        <code className="bg-black w-full text-white rounded-lg py-4 whitespace-break-spaces flex items-start text-left px-8">
          {`function solution(numbers) {
    return numbers.map(el => {
        if (!(el % 2)) return el + 1;
        const bin = '0' + el.toString(2);
        const idx = bin.lastIndexOf('0');
        return parseInt(bin.substring(0, idx) + '10' + bin.substring(idx + 2), 2);
    });
}`}
        </code>
      </DefaultListBox>
    </div>
  );
}
export default DashboardPage;
