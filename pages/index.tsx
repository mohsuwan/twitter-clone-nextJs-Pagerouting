import { Header } from "@/components/layout/Header";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import CreatePost from "./create-post";
import { PostsFollower } from "./posts";
import { Loading } from "./Loading-page";

export default function Home() {
  const loginModal = useLoginModal();

  const session = useSession();
  const is_logged = session?.status === "authenticated";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {is_logged ? (
        <>
          <Header label="Home" />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <CreatePost />
              <PostsFollower />
            </>
          )}
        </>
      ) : (
        // </>
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
}
