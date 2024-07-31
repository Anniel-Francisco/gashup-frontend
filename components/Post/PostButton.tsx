"use client";

import React from "react";

interface PostButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  amount: number | null;
  callback?: () => void;
  active?: boolean;
  className?: string;
  classNameButton?: string;
}

const PostButton: React.FC<PostButtonProps> = ({
  Icon,
  amount,
  callback,
  active,
  className,
  classNameButton,
}: PostButtonProps) => {
  return (
    <button
      onClick={() => callback && callback()}
      className={`${classNameButton} flex items-center gap-1 cursor-pointer`}
    >
      <Icon
        className={`${className} ${
          active ? "fill-[#9b34b7]" : "fill-slate-500"
        } w-6 h-6`}
      />
      <p>{amount}</p>
    </button>
  );
};

export default PostButton;
