import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { Input } from "../Input";
import { Modal } from "../Modal";
import useRegesterModal from "@/hooks/useRegester";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export const RegesterModal = () => {
  const loginModal = useLoginModal();
  const RegesterModal = useRegesterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoding) {
      return;
    }
    RegesterModal.onClose();
    loginModal.onOpen();
  }, [isLoding, RegesterModal, loginModal]);
  const onSupmit = useCallback(async () => {
    try {
      setIsLoding(true);
      await axios.post("/api/register", { email, password, name, userName });
      toast.success("Acount created.");
      signIn("credentials", { email, password });
      RegesterModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("some thing is wrong !");
    } finally {
      setIsLoding(false);
    }
  }, [RegesterModal, email, password, name, userName]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        disabled={isLoding}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Name"
        disabled={isLoding}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="User name"
        disabled={isLoding}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        disabled={isLoding}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Alredy have an account ?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoding}
      isOpen={RegesterModal.isOpen}
      onSubmit={onSupmit}
      title="creat an accont"
      onClose={RegesterModal.onClose}
      body={bodyContent}
      actionLabel="Regester"
      footer={footerContent}
    />
  );
};
