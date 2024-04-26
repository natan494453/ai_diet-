import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import Res from "./Res";
export default function NavBar() {
  return (
    <div className=" fixed top-0 w-screen z-[50000000000000000000000000]  ">
      <div className="navbar bg-base-300 lg:px-20   ">
        <div className="flex-1 ">
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
            <div className=" text-xl flex gap-20 max-lg:hidden">
              <Link href={"/dashboard"}>
                <p>מתכונים</p>
              </Link>
              <Link href={"/fav"}>
                <p>מועדפים</p>
              </Link>
            </div>
            <Res />
          </SignedIn>

          <UserButton />
        </div>
      </div>
    </div>
  );
}
