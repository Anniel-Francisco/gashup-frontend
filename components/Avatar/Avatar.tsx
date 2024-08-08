import { CSSProperties } from "react";
// TYPES
import { IUser } from "@/types/user";
interface Props {
  size?: number;
  image?: Blob | undefined | string | null;
  onClick?: () => void;
  name?: string;
  borderColor?: string;
  borderWidth?: number;
  letterSize?: number;
  session?: IUser | null;
  pointer?: boolean;
  styles?: CSSProperties;
  className?: string;
}

export function Avatar({
  size,
  image,
  onClick,
  name,
  session,
  styles,
  letterSize,
  pointer,
  borderWidth,
  borderColor,
  className,
}: Props) {
  return (
    <div
      className={`${className} bg-center bg-cover flex items-center justify-center rounded-full border-[.5px] border-gray-500`}
      style={{
        backgroundColor: image ? "#d3d3d3" : "#2c3e50",
        backgroundImage: image ? `url('${image}')` : "",
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: borderWidth ?? 0,
        borderColor: borderColor ?? "transparent",
        cursor: pointer ? "pointer" : "default",
        ...styles,
      }}
      onClick={onClick}
    >
      {!image ? (
        <span
          style={{ fontSize: `${letterSize}px` }}
          className="text-lg font-semibold text-white"
        >
          {name ? name.charAt(0) : session ? session?.name.charAt(0) : "G"}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
