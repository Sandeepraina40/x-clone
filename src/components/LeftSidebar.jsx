import Link from 'next/link';
import { FaXTwitter } from 'react-icons/fa6';
import { HiHome } from 'react-icons/hi';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/nextjs';
import MiniProfile from './MiniProfile';

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-screen px-4 py-6 border-r border-gray-200 bg-white text-black">
      {/* Top section */}
      <div className="flex flex-col gap-4">
        <Link href="/">
          <FaXTwitter className="w-10 h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-all duration-200 text-black" />
        </Link>

        <Link
          href="/"
          className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-3 w-fit"
        >
          <HiHome className="w-6 h-6 text-black" />
          <span className="font-semibold hidden xl:inline text-black">Home</span>
        </Link>

        <div className="bg-blue-500 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-10 shadow-md hidden xl:flex items-center justify-center font-medium">
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>

      {/* Bottom section */}
      <SignedIn>
        <MiniProfile />
      </SignedIn>
    </div>
  );
}
