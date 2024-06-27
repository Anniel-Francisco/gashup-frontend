"use client";

import React from "react";

interface PostButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  amount: number | null;
}

const PostButton: React.FC<PostButtonProps> = ({ Icon, amount }) => {
  return (
    <div className="p-3 flex items-center gap-1 cursor-pointer">
      <Icon className="fill-slate-500 w-5 h-5" />
      <p>{amount}</p>
    </div>
  );
};

export default PostButton;
