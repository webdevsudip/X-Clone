import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import usePost from "@/hooks/usePost";

import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import ReplyFeed from "@/components/posts/ReplyFeed";
import Meta from "@/components/Meta";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [title, setTitle] = useState("Post | X");
  const { data: fetchedPost } = usePost(postId as string);

  useEffect(() => {
    if (fetchedPost?.body) {
      setTitle(`${fetchedPost?.user?.name} on X: "${fetchedPost?.body}"`);
    }
  }, [fetchedPost?.user?.name, fetchedPost?.body]);

  return (
    <>
      <Meta title={title} />
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <ReplyFeed postId={postId as string} />
    </>
  );
};

export default PostView;
