const Footer = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto flex flex-col justify-between px-6 mt-8 mb-8 gap-2">
          <div
            className="text-xl font-extrabold cursor-pointer"
          >
            &lt;/&gt; ALGO
          </div>
          <p>이용약관</p>
          <p>개인정보 처리 방침</p>
          <p>문의</p>
        </div>
    </header>
  );
};

export default Footer;
