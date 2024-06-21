import { CSSProperties } from "react";
// TYPES
import { IUser } from "@/types/user";
interface Props {
  size: number;
  image?: Blob | undefined | string | null;
  onClick?: () => void;
  session?: IUser | null;
  styles?: CSSProperties;
}

export function Avatar({ size, image, onClick, session, styles }: Props) {
  return (
    <div
      className="bg-center bg-cover flex items-center justify-center rounded-full"
      style={{
        backgroundColor: image ? "#d3d3d3" : "#2c3e50",
        backgroundImage: image ? `url('${image}')` : "",
        width: `${size}px`,
        height: `${size}px`,
        ...styles,
      }}
      onClick={onClick}
    >
      {!image ? (
        <span className="text-lg font-semibold text-white">
          {session?.name.charAt(0)}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
