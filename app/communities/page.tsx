import "@/styles/general/communities.css";
import CreatePost from "@/components/Post/CreatePost";
import MappedPosts from "@/components/Post/MappedPosts";

export default function Communities() {
  return (
    <>
      <CreatePost />
      <MappedPosts className=""/>
    </>
  );
}
