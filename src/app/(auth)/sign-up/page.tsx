"use client";
import GoogleIcon from "@/components/common/GoogleIcon";
import { errorToast, successToast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appRoutes } from "@/lib/routes";
import { useAuthStore } from "@/stores/auth.store";
import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const { user, loading, error, signInWithGoogle, signUp } = useAuthStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };
  const handleSignUp = async () => {
    try {
      if (name === "") {
       errorToast("Fill name please.")
      }
       await signUp({
          name,
          email,
          password,
        });
    } catch (error) {
      errorToast(`${error}`);
    }
  };

  return (
    <div className="p-5 gap-3 flex flex-col  justify-center items-center h-screen w-[100%] md:w-[50%] mx-auto">
      <h1 className="text-center text-4xl">Sign Up</h1>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button className="w-full" onClick={handleSignUp} disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account?{" "}
        <span className="font-semibold text-blue-500 cursor-pointer hover:text-blue-600">
          <Link href={appRoutes.signIn}>Sign in.</Link>
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
