import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import jsonData from "@/postes_posted.json";
import { useState } from "react";
import toast from "react-hot-toast";
import PostCom from "../post-com";

interface NewPostsInterface {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  title?: string | null;
}
const CreatePost = () => {
  const { data: session } = useSession();
  const [data, setData] = useState("");
  const [arrayOfPosts, setArrayOfPosts] =
    useState<NewPostsInterface[]>(jsonData);
  console.log(arrayOfPosts);
  const onClick = async () => {
    if (session?.user && data.trim()) {
      const newPost: NewPostsInterface = {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        title: data,
      };

      // setTimeout(() => {
      setArrayOfPosts((prevPosts) => [...prevPosts, newPost]);
      // }, 3000);

      setData("");
      try {
        const response = await fetch("/api/create-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (response.ok) {
          toast.success("Post Created");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 px-5 py-2">
        <div className="flex flex-row gap-4">
          <div>
            <Image
              src="/Image/default-avatar.webp"
              alt="image"
              width={35}
              height={35}
              className="rounded-full h-12 w-14 bg-white"
            />
          </div>

          <div className="w-full">
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="What's happening?"
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white overflow-hidden"
            ></textarea>
            <div className="mt-4 flex flex-row justify-end">
              <Button label="Tweet" onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
      {arrayOfPosts
        .slice()
        .reverse()
        .map((posts: any, index) => (
          <PostCom posts={posts} key={index} />
        ))}
    </>
  );
};

export default CreatePost;
