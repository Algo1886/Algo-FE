const Footer = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto flex flex-col justify-between px-6 mt-8 mb-8 gap-2">
          <div
            className="text-xl font-extrabold cursor-pointer"
          >
            &lt;/&gt; ALGO
          </div>
          <a className="hover:underline" href="https://haeun28.notion.site/Terms-of-Service-25b25e18d27a80f2913de3b81a4d08c9?source=copy_link" target="_blank" rel="noopener noreferrer">이용약관</a>
          <a className="hover:underline" href="https://haeun28.notion.site/Privacy-Policy-25b25e18d27a801099a6ced9e313f477?source=copy_link" target="_blank" rel="noopener noreferrer">개인정보 처리방침</a>
          <a className="hover:underline" href="https://forms.gle/FAFvsrsoGm4gkq9n8" target="_blank" rel="noopener noreferrer">문의</a>
        </div>
    </header>
  );
};

export default Footer;
