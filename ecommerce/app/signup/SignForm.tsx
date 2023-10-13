"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type SignFormProps = {};

const SignForm = (props: SignFormProps) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const Register = () => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    axios
      .post("/api/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.push("/signin");
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-xl font-medium mb-4">新規登録</h1>
        <label htmlFor="" className="mb-2">
          名前
        </label>
        <input
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="名前"
          value={user.name}
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="" className="mb-2">
          メールアドレス
        </label>
        <input
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          placeholder="メールアドレス"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="" className="mb-2">
          パスワード
        </label>
        <input
          type="password"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          placeholder="パスワード"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={Register}
          className="p-2 border bg-[#3EBCB5] rounded-lg text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600"
        >
          登録
        </button>
        <Link
          href="/signin"
          className="text-sm text-center mt-5 text-neutral-600"
        >
          既にアカウントを作成していますか？
        </Link>
        <Link href="/" className="text-center mt-2">
          TOPへ
        </Link>
      </div>
    </div>
  );
};

export default SignForm;
