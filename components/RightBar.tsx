import { Rightbar } from "@/types/rightbar";
import "@/styles/rightbar.css";

export default function RightBar() {
  const data: Rightbar[] = [
    { name: "Vegeta777", followers: 1000000 },
    { name: "Save The World", followers: 235000 },
    { name: "Anime", followers: 220000 },
    { name: "Anime Zone", followers: 200000 },
    { name: "Food War", followers: 300000 },
    { name: "Sport", followers: 5000000 },
  ];
  function formatNumber(number: number) {
    return number.toLocaleString("en-US");
  }
  function RightBar() {
    return (
      <div className="rightbar-element p-4">
        <h3 className="rightbar-head text-lg font-semibold">Famous Communities</h3>
        <div className="rightbar-item-container overflow-y-scroll pr-1">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="rightbar-item flex flex-row justify-between items-end mt-2 pt-2 pr-2 pb-2"
              >
                <div className=" flex flex-row gap-4 items-center">
                  <div className="image-container cursor-pointer"></div>
                  <div className="text-span flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-light">{formatNumber(item.followers)} followers</span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="join-button rounded-sm"
                  >
                    Join
                  </button>
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
