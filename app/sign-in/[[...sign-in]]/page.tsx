import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen flex justify-center h-[80vh] items-center">
      <SignIn forceRedirectUrl={"/dashboard"} path="/sign-in" />
    </div>
  );
}
