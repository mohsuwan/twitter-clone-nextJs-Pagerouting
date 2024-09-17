import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
interface IUserDataProps {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  username: string;
  image: string;
}

export const FollowBar = () => {
  const router = useRouter();

  const session = useSession();
  const is_logged = session?.status === "authenticated";
  const [usersData, setUsersData] = useState<IUserDataProps[]>([]);
  useEffect(() => {
    axios("https://dummyjson.com/users")
      .then((res) => setUsersData(res.data.users))
      .catch((err) => console.log(err));
  }, []);
  // console.log(usersData);

  // const onIdselect = (id: any) => {
  // setSelectId(id);
  // };
  // console.log(usersData);
  // const onClick = useCallback(( even: any) => {
  //   even.stopPropagation();
  //   // const userId  = ele=>{}
  //   // const url =  axios(`https://dummyjson.com/users/${user.id}`)
  //   // .then((res) => setUsersData(res.data.users))
  //   // .catch((err) => console.log(err));
  //   // const url = `https://dummyjson.com/users/${id}`

  // }, []);
  // const [id, setId] = useState("");

  // const onClick = useCallback(({ even, user }: any) => {
  //   even.stopPropagation();
  //   // () => router.push(`/pages/users/${user.id}`)
  //   router.push(`/pages/users/${user.id}`);
  // }, []);

  return (
    <>
      {is_logged && (
        <div className="px-6 py-4 hidden lg:block">
          <div className="bg-neutral-800 rounded-xl p-4">
            <h2 className="text-white text-xl font-semibold">who to follow</h2>
            <div className="flex flex-col gap-6 mt-4">
              {usersData.map((user): any => {
                return (
                  <div
                    onClick={() => router.push(`/users/${user.id}`)}
                    key={user.id}
                    className="flex flex-row gap-4 items-center cursor-pointer"
                  >
                    <HandleImages userImage={user?.image} />
                    <div className="flex flex-col ">
                      <p className=" text-white font-semibold text-sm">
                        {user.firstName} {user.maidenName} {user.lastName}
                      </p>
                      <p className="text-neutral-400 text-sm">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const HandleImages = ({ userImage }: { userImage: string }) => {
  const [image, setImage] = useState(userImage);

  return (
    <Image
      src={image}
      alt={image}
      width={25}
      height={25}
      className="rounded-full w-6 h-6 bg-white"
      onError={() => setImage("/public/default-avatar.webp")}
    />
  );
};
