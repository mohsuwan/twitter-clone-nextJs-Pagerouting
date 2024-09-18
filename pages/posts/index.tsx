import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jsonData from "@/posts-dummy.json";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
// import { Loading } from "../Loading-page";

interface PostsInterface {
  id: number;
  image?: string;
  title: string;
  firstName: string;
  lastName: string;
  username: string;
  reactions: { likes: number; dislikes: number };
}

//  function PostsFollower() {
//   const router = useRouter();

//   const [postsUseData, setPostsUseData] = useState<PostsInterface[]>([]);
//   // const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsersAndMergePosts = async () => {
//       try {
//         // setIsLoading(true);
//         const { data } = await axios.get("https://dummyjson.com/users");

//         const mergedPosts = mergePostsWithUsers(jsonData.posts, data.users);

//         // setTimeout(() => {
//           setPostsUseData(mergedPosts);
//         // }, 3000);
//       } catch (err) {
//         console.error(err);
//       }
//       //  finally {
//         // setIsLoading(false);
//       // }
//     };

//     fetchUsersAndMergePosts();
//   }, []);

//   const mergePostsWithUsers = (posts: any[], users: any[]) => {
//     return posts.map((post) => {
//       const matchingUser = users.find((user) => user.id === post.id);
//       return matchingUser ? { ...post, ...matchingUser } : post;
//     });
//   };
//   // if (isLoading) {
//   //   return <Loading />;
//   // }

//   return (
//     <>
//       {postsUseData.map((posts, index): any => {
//         return (
//           <div
//             key={index}
//             className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:border-neutral-900 transition"
//           >
//             <div
//               onClick={() => router.push(`/users/${posts.id}`)}
//               className="flex flex-row items-start gap-3"
//             >
//               <Image
//                 src={`${posts.image}`}
//                 alt="user Image"
//                 width={35}
//                 height={35}
//                 className="bg-white rounded-full"
//               />
//               <div className="flex flex-row items-center gap-2">
//                 <p className="text-white font-semibold cursor-pointer hover:underline">
//                   {posts.firstName} {posts.lastName}
//                 </p>
//                 <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
//                   @{posts.username}
//                 </span>
//               </div>
//             </div>
//             <div className="text-white mt-1">{posts.title}</div>
//             <div className="flex flex-row items-center mt-3 gap-10">
//               <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
//                 <AiOutlineHeart size={20} />
//                 <p>{posts.reactions.likes}</p>
//               </div>
//               <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
//                 <AiOutlineMessage size={20} />
//                 <p>{posts.reactions.dislikes}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// }

import React from "react";

const PostsFollower = () => {
  const router = useRouter();

  const [postsUseData, setPostsUseData] = useState<PostsInterface[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndMergePosts = async () => {
      try {
        // setIsLoading(true);
        const { data } = await axios.get("https://dummyjson.com/users");

        const mergedPosts = mergePostsWithUsers(jsonData.posts, data.users);

        // setTimeout(() => {
        setPostsUseData(mergedPosts);
        // }, 3000);
      } catch (err) {
        console.error(err);
      }
      //  finally {
      // setIsLoading(false);
      // }
    };

    fetchUsersAndMergePosts();
  }, []);

  const mergePostsWithUsers = (posts: any[], users: any[]) => {
    return posts.map((post) => {
      const matchingUser = users.find((user) => user.id === post.id);
      return matchingUser ? { ...post, ...matchingUser } : post;
    });
  };
  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      {postsUseData.map((posts, index): any => {
        return (
          <div
            key={index}
            className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:border-neutral-900 transition"
          >
            <div
              onClick={() => router.push(`/users/${posts.id}`)}
              className="flex flex-row items-start gap-3"
            >
              <Image
                src={`${posts.image}`}
                alt="user Image"
                width={35}
                height={35}
                className="bg-white rounded-full"
              />
              <div className="flex flex-row items-center gap-2">
                <p className="text-white font-semibold cursor-pointer hover:underline">
                  {posts.firstName} {posts.lastName}
                </p>
                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{posts.username}
                </span>
              </div>
            </div>
            <div className="text-white mt-1">{posts.title}</div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiOutlineHeart size={20} />
                <p>{posts.reactions.likes}</p>
              </div>
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{posts.reactions.dislikes}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostsFollower;
