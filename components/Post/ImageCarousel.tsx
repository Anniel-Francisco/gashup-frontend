"use client";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

interface Item {
  item: string;
  index: number;
}

interface Props {
  items: Item[];
}

export function ImageCarousel({ items }: Props) {

  return (
    <Carousel
      animation="slide"
      swipe
      navButtonsAlwaysVisible={true}
    >
        {items.map((item, index) => (
          <div className="w-full flex items-center justify-center">
          <Image
            key={index}
            src={item.toString()}
            alt={`Slide ${index}`}
            height={250}
            width={250}
            className="rounded-md"
          />
          </div>
        ))}
    </Carousel>
  );
}
