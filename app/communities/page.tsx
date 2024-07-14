import "@/styles/general/communities.css";
import CreatePost from "@/components/Post/CreatePost";
import MappedPosts from "@/components/Post/MappedPosts";

export default function Communities() {
  return (
    <div className="p-3 pr-5">
      <h1>Communities</h1>
      <CreatePost />
      <MappedPosts className=""/>
    </div>
  );
}
