import useLoginModal from "@/hooks/useLoginModal";
import { FormEventHandler, useCallback, useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import useRegesterModal from "@/hooks/useRegester";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
export const LoginModal = () => {
  const loginModal = useLoginModal();
  const RegesterModal = useRegesterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoding) {
      return;
    }
    loginModal.onClose();
    RegesterModal.onOpen();
  }, [isLoding, loginModal, RegesterModal]);

  const onSupmitHandler = async () => {
    try {
      setIsLoding(true);
      const res: any = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res.ok == true) {
        loginModal.onClose();
      } else {
        toast.error("your email or password is incorrect !");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoding(false);
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoding}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        disabled={isLoding}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        first time use Twitter ?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          creat an account
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoding}
      isOpen={loginModal.isOpen}
      onSubmit={onSupmitHandler}
      title="Login"
      onClose={loginModal.onClose}
      body={bodyContent}
      actionLabel="Sign in"
      footer={footerContent}
    />
  );
};
