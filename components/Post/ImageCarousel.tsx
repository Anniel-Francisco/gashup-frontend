"use client";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

interface Item {
  item: string;
  index: number;
}

interface Props {
  items: (File | Blob | string| Item )[];
}

export function ImageCarousel({ items }: Props) {

  return (
    <Carousel animation="slide" swipe navButtonsAlwaysVisible={true}>
      {items.map((item, index) => (
        <div key={index} className="w-full flex items-center justify-center h-96 bg-[#e0dede]">
          <Image
            key={index}
            src={item.toString()}
            alt={`Slide ${index}`}
            height={250}
            width={300}
            className="h-full w-auto"
          />
        </div>
      ))}
    </Carousel>
  );
}
