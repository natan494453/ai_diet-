import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function NavBar() {
  return (
    <div className="navbar bg-base-300 lg:px-20">
      <div className="flex-1">
        <Link href={"/"}>
          <p className="btn btn-ghost text-xl">דיאטה AI</p>
        </Link>
      </div>
      <div className="flex-none gap-4">
        <SignedOut>
          <Link href={"/sign-in"}>
            <button className=" btn btn-accent">התחבר</button>
          </Link>
        </SignedOut>

        <SignedIn>
          <SignedIn>
            <div className=" text-xl flex gap-20">
              <Link href={"/dashboard"}>
                <p>מתכונים</p>
              </Link>
              <UserButton />
            </div>
          </SignedIn>
        </SignedIn>
      </div>
    </div>
  );
}
