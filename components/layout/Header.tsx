// import PostsView from "@/pages/users/[userId]";
// import PostsView from "@/pages/posts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";
interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const session = useSession();
  const is_logged = session?.status === "authenticated";
  // console.log(session);
  

  const router = useRouter();
  const handelBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-center gap-2 ">
          {showBackArrow && (
            <BiArrowBack
              onClick={handelBack}
              color="white"
              size={20}
              className="cursor-pointer hover:opacity-70 transition"
            />
          )}
          <h1 className="text-white text-xl font-semibold">{label}</h1>
        </div>
      </div>
      {/* {is_logged && <PostsView />} */}
    </>
  );
};
