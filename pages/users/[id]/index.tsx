import { Header } from "@/components/layout/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import jsonData from "@/posts-dummy.json";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLoginModal from "@/hooks/useLoginModal";
import Loading from "@/pages/Loading-page";

interface PostsInterface {
  id: number;
  image?: string;
  title: string;
  firstName: string;
  lastName: string;
  username: string;
  reactions: { likes: number; dislikes: number };
}

const ProfileView = () => {
  const router = useRouter();
  const id = Number(router?.query?.id);
  const session = useSession();
  const is_logged = session?.status === "authenticated";
  const loginModal = useLoginModal();

  const [IdData, setIdData] = useState<PostsInterface | null>(null);
  const [postsUseData, setPostsUseData] = useState<PostsInterface[]>([]);
  const [isLoding, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndMergePosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://dummyjson.com/users");
        const mergedPosts = mergePostsWithUsers(jsonData.posts, data.users);
        setPostsUseData(mergedPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersAndMergePosts();
  }, []);

  useEffect(() => {
    if (id && postsUseData.length > 0) {
      const matchingData: PostsInterface | undefined = postsUseData.find(
        (post) => post.id === id
      );

      setIdData(matchingData || null);
    }
  }, [id, postsUseData]);

  const mergePostsWithUsers = (posts: any[], users: any[]) => {
    return posts.map((post) => {
      const matchingUser = users.find((user) => user.id === post.id);
      return matchingUser ? { ...post, ...matchingUser } : post;
    });
  };

  if (isLoding) {
    return <Loading />;
  }

  return (
    <>
      {is_logged && IdData ? (
        <>
          <Header showBackArrow label="Follow Profile" />
          <div>
            <div className="bg-neutral-700 h-44 relative">
              <Image
                src={`${IdData.image}`}
                alt="user Image"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute -bottom-16 left-4">
                <Image
                  src={`${IdData.image}`}
                  alt="image"
                  width={50}
                  height={50}
                  className="rounded-full w-24 h-24 bg-white"
                />
              </div>
            </div>
            <div className="mt-24 px-4">
              <div className=" flex flex-col">
                <p className="text-white text-2xl font-semibold">
                  {IdData.title} {IdData.lastName}
                </p>
                <p className="text-md text-neutral-500 ">@{IdData.username}</p>
              </div>
            </div>
          </div>
          <div className="border-y-[1px] border-neutral-800 p-5 mt-5 cursor-pointer hover:border-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
              <Image
                src={`${IdData.image}`}
                alt="user Image"
                width={35}
                height={35}
                className="bg-white rounded-full"
              />
              <div className="flex flex-row items-center gap-2">
                <p className="text-white font-semibold cursor-pointer hover:underline">
                  {IdData.firstName} {IdData.lastName}
                </p>
                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{IdData.username}
                </span>
              </div>
            </div>
            <div className="text-white mt-1">{IdData.title}</div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiOutlineHeart size={20} />
                <p>{IdData.reactions.likes}</p>
              </div>
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{IdData.reactions.dislikes}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Header label="Please Login" />

          <div className="py-60">
            <h1 className="text-white text-2xl font-bold text-center mb-4">
              Welcome to Twitter
            </h1>
            <div className="flex flex-row items-center justify-center">
              <div
                onClick={loginModal.onOpen}
                className="mt-6 px-12 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition"
              >
                <p className="text-center font-semibold text-white text-[20px]">
                  Login
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileView;
