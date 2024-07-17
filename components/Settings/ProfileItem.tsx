import { MouseEvent as ReactMouseEvent } from "react";
import { IoMdEye } from "react-icons/io";
interface Props {
  name: string;
  description: string;
  showIcon: boolean;
  onClick: (e: ReactMouseEvent) => void;
  onClickIcon?: (e: ReactMouseEvent) => void;
}
export function ProfileItem({
  name,
  description,
  showIcon,
  onClick,
  onClickIcon,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="w-full flex flex-row items-center justify-between hover:bg-[#d0d1d33e] py-2 px-2 hover:cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-[#2c3e50]">{name}</span>
        <span className="text-[#999999] text-sm">{description}</span>
      </div>
      {showIcon ? (
        <IoMdEye color="#2c3e50" size={25} onClick={onClickIcon} />
      ) : (
        ""
      )}
    </div>
  );
}
