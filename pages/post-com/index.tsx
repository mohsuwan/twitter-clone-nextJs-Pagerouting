import Image from "next/image";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

export const PostCom = ({ posts }: { posts: any }) => {
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:border-neutral-900 transition">
      <div
        // onClick={() => router.push(`/users/${posts.id}`)}
        className="flex flex-row items-start gap-3"
      >
        <Image
          src={`${posts?.image}`}
          alt="user Image"
          width={35}
          height={35}
          className="bg-white rounded-full"
        />
        <div className="flex flex-row items-center gap-2">
          <p className="text-white font-semibold cursor-pointer hover:underline">
            {posts?.name}
          </p>
          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            @{posts.email}
          </span>
        </div>
      </div>
      <div className="text-white mt-1">{posts.title}</div>
      <div className="flex flex-row items-center mt-3 gap-10">
        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
          <AiOutlineHeart size={20} />
          <p>0</p>
        </div>
        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
          <AiOutlineMessage size={20} />
          <p>0</p>
        </div>
      </div>
    </div>
  );
};
