const Header = () => {
  return (
    <div className="w-full h-16 border-slate-300 border-b-2 bg-white flex items-center justify-center">
      <div className="flex justify-between max-w-6xl w-full h-full">
        <span className="text-xl font-bold text-slate-900 hover:text-slate-700 cursor-pointer flex items-center gap-2">
          <span className="font-mono text-lg">&lt;/&gt;</span>
          ALGO
        </span>
        {/* TODO: Add Login Button Here */}
        <span>login</span>
      </div>
    </div>
  );
};

export default Header;
