import type { PropsWithChildren } from "react";

interface DefaultListBoxProps extends PropsWithChildren {
  boxTitle: string;
}

const DefaultListBox = ({ boxTitle, children }: DefaultListBoxProps) => {
  return (
    <div className="bg-white items-start flex flex-col max-w-[1080px] w-full rounded-xl border-gray-300 border p-5 space-y-4">
      <div className="text-xl font-semibold">{boxTitle}</div>
      <div className="flex w-full h-full">{children}</div>
    </div>
  );
};

export default DefaultListBox;
