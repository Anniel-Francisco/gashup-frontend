"use client";
import { Avatar } from "@/components/Avatar/Avatar";

export default function CommunityDescription({ name }: any) {
  return (
    <div className="flex justify-between items-center pt-5 p-4  bg-gray-200">
      <div className="flex gap-3 flex-col">
        <h2 className="text-2xl">{name}</h2>

        <span className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quis
          quidem itaque mollitia consequuntur autem magni repellendus fugiat
          sunt obcaecati dignissimos aperiam, id quaerat aspernatur, distinctio
          labore? Amet, nostrum voluptatem! Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Obcaecati, aut natus nulla, neque
          repellat fugiat maiores ratione rerum iure sunt vero odio asperiores
          nobis, in explicabo qui facilis nihil labore.
        </span>
      </div>
    </div>
  );
}
