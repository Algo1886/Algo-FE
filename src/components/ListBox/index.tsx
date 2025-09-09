import type { PropsWithChildren } from "react";

interface DefaultListBoxProps extends PropsWithChildren {
  boxTitle?: string | React.ReactNode;
}

const DefaultListBox = ({ boxTitle, children }: DefaultListBoxProps) => {
  return (
    <div className="bg-white items-start flex flex-col w-full rounded-xl border-gray-200 border p-5 space-y-4">
      {boxTitle && typeof boxTitle === "string" ? (
        <div className="font-semibold">{boxTitle}</div>
      ) : (
        boxTitle
      )}
      <div className="flex w-full h-full flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default DefaultListBox;
