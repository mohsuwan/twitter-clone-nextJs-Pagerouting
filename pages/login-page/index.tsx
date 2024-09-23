import { Header } from "@/components/layout/Header";
import useLoginModal from "@/hooks/useLoginModal";
import React from "react";

const LoginPage = () => {
  const loginModal = useLoginModal();

  return (
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
  );
};

export default LoginPage;
