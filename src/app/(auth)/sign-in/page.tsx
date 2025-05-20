"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { usePathname, useRouter } from "next/navigation";

const SignInPage = () => {
  const { user, loading, error, signInWithGoogle } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };
  return (
    <div className="p-5 flex flex-col  justify-center items-center h-screen">
      <h1 className="text-center text-4xl pb-4">Login with Google</h1>
      {user ? (
        <div className="flex gap-3 items-center ">
          <img
            width={50}
            height={50}
            className="border-r-[50%]"
            src={user.photoURL || undefined}
            alt="User Avatar"
          />

          <h2>Welcome, {user.displayName}!</h2>
        </div>
      ) : (
        <Button
          className="w-[100%] md:w-[50%] "
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in with Google "}
        </Button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignInPage;
