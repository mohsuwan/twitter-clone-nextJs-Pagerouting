import { Header } from "@/components/layout/Header";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CreatePost from "../create-post";
import useLoginModal from "@/hooks/useLoginModal";
import { useEffect, useState } from "react";
import Loading from "../Loading-page";

const ProfileView = () => {
  const session = useSession();
  // console.log(session.data?.user);
  const loginModal = useLoginModal();

  // const is_logged = session?.status === "authenticated";

  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session?.status === "authenticated") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    setIsLoading(false);
  }, [session.status]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isLogged ? (
        <>
          <Header showBackArrow label="User Profile" />
          <div className="border-b-[1px] border-neutral-800 pb-5">
            <div className=" bg-neutral-700 h-44 relative">
              <Image
                src="/Image/jerusalem.jpg"
                alt="user Image"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute -bottom-16 left-4">
                <Image
                  src="/Image/default-avatar.webp"
                  alt="image"
                  width={50}
                  height={50}
                  className="rounded-full w-24 h-24 bg-white"
                />
              </div>
            </div>
            <div className="mt-24 px-4">
              <div className="flex flex-col">
                <p className="text-white text-2xl font-semibold">
                  Mohammad Suwan
                </p>
                <p className="text-md text-neutral-500">
                  suwanabdnabeelmoh@gmail.com
                </p>
              </div>
            </div>
          </div>
          <CreatePost />
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
