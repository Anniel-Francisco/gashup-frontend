import { Rightbar } from "@/types/rightbar";
import "@/styles/rightbar.css";

export default function RightBar() {
  const data: Rightbar[] = [
    { name: "Vegeta777", followers: 1000000 },
    { name: "Save The World", followers: 235000 },
    { name: "Anime", followers: 22000 },
    { name: "Anime Zone", followers: 200000 },
    { name: "Food", followers: 300000 },
    { name: "Sport", followers: 5000000 },
  ];
  function formatNumber(number: number) {
    return number.toLocaleString("en-US");
  }
  function RightBar() {
    return (
      <div className="rightbar-element p-4">
        <h1 className="text-lg font-medium">Famous Communities</h1>
        <div className="rightbar-item-container overflow-y-scroll pr-1" style={{height: '420px'}}>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="rightbar-item flex flex-row items-center gap-4 mt-4 p-2 cursor-pointer"
              >
                <div className="image-container"></div>
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>{formatNumber(item.followers)} followers</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div className="rightbar pt-2">{<RightBar />}</div>;
}
