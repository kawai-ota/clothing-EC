"use client";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { BsChevronCompactUp } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const SignOut = () => {
    if (session && session.user) {
      return (
        <ul className="py-5 px-1 text-neutral-600">
          <li className="hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            {session.user.name}
          </li>
          <li
            onClick={() => signOut()}
            className="whitespace-nowrap hover:text-red-600 px-5 py-2 cursor-pointer"
          >
            ログアウト
          </li>
          <li className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            <Link href="/addproduct">ブランドの出品</Link>
          </li>
          <li className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            <Link href="/favorite">お気に入り</Link>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li
          onClick={() => signIn()}
          className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer"
        >
          ログイン
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-12 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <Link href="/">PAM</Link>
          </div>
          <nav className="max-md:hidden">
            <ul className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
              <li>
                <Link
                  href="/"
                  className={`py-3 inline-block w-full hover:underline ${
                    pathname === "/" ? "underline" : "none"
                  }`}
                >
                  カタログ
                </Link>
              </li>
              <li>
                <Link
                  href="/filters"
                  className={`py-3 inline-block w-full hover:underline ${
                    pathname === "/filters" ? "underline" : "none"
                  }`}
                >
                  フィルター
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`py-3 inline-block w-full hover:underline ${
                    pathname === "/contact" ? "underline" : "none"
                  }`}
                >
                  お問い合わせ
                </Link>
              </li>
              {session?.user && (
                <li>
                  <Link
                    href="/mybrands"
                    className={`py-3 inline-block w-full hover:underline ${
                      pathname === "/mybrands" ? "underline" : "none"
                    }`}
                  >
                    マイブランド
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center space-x-4"
        >
          <div className="relative cursor-pointer">
            <BsFillPersonFill size={35} />
            <div
              className={`absolute bg-white z-[2] rounded-lg shadow-lg ${
                showProfile ? "" : "hidden"
              }`}
            >
              <SignOut />
            </div>
          </div>
          {session ? (
            <Link href="/cart">
              <div className="p-3 bg-gray-100 rounded-full ml-4">
                <CiShoppingCart size={20} />
              </div>
            </Link>
          ) : (
            <Link href="/auth">
              <div className="p-3 bg-gray-100 rounded-full ml-4">
                <CiShoppingCart size={20} />
              </div>
            </Link>
          )}
          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden"
          >
            <BsChevronCompactUp
              className={`transition ease-in duration-150 ${
                showNav ? "rotate-180" : "0"
              }`}
            />
          </span>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav ? "pb-4 px-5" : "h-0 invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col text-[15px] opacity-75 px-2">
          <li>
            <Link
              href="/"
              className={`py-3 inline-block w-full hover:underline ${
                pathname === "/" ? "underline" : "none"
              }`}
            >
              カタログ
            </Link>
            <Link
              href="/filters"
              className={`py-3 inline-block w-full hover:underline ${
                pathname === "/filters" ? "underline" : "none"
              }`}
            >
              フィルター
            </Link>
            <Link
              href="/contact"
              className={`py-3 inline-block w-full hover:underline ${
                pathname === "/contact" ? "underline" : "none"
              }`}
            >
              お問い合わせ
            </Link>
            {session?.user && (
              <Link
                href="/mybrands"
                className={`py-3 inline-block w-full hover:underline ${
                  pathname === "/mybrands" ? "underline" : "none"
                }`}
              >
                マイブランド
              </Link>
            )}
          </li>
        </ul>
        {/* <div className="flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3">
          <input
            type="text"
            className="outline-none w-full bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
            placeholder="探す"
            autoComplete="false"
          />
          <button>
            <BiSearch size={20} className="opacity-50" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
