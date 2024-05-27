import SideBar from "@/components/SideBar";
import Feed from "@/components/Feed";
import RightBar from "@/components/RightBar";

export default function Home() {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Feed />
      <RightBar />
    </div>
  );
}
