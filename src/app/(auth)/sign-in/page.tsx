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

const SignInPage = () => {
  const { user, loading, error, signInWithGoogle, signIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };
  const handleSignIn = async () => {
    try {
      await signIn({
      email,
      password,
    });
    successToast("Successfully signed in.")
    } catch (error) {
      errorToast(`${error}`)
    }
  };
  

  return (
    <div className="p-5 gap-3 flex flex-col  justify-center items-center h-screen w-[100%] md:w-[50%] mx-auto">
      <h1 className="text-center text-4xl ">Sign in</h1>
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

      <Button className="w-full" onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
      <Button
        className="w-full bg-gray-300"
        onClick={handleSignInWithGoogle}
        disabled={loading}
      >
        <GoogleIcon className="w-10 h-10" />
        <div >Continue with Google</div>
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Don't have an account? <span className="font-semibold text-blue-500 cursor-pointer hover:text-blue-600"><Link href={appRoutes.signUp}>
      Sign up.</Link></span></p> 

    </div>
  );
};

export default SignInPage;
