"use client";
import React from "react";

type ContactProps = {};

const Contact = (props: ContactProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto mt-10 space-y-6">
        <h1 className="text-5xl text-center">お問い合わせ</h1>
        <div className="flex flex-col">
          <form
            action={process.env.NEXT_PUBLIC_NEWT_FORM_ENDPOINT}
            method="post"
          >
            <div className="grid grid-cols-2">
              <input
                type="text"
                className="sm:w-[400px] sm:h-[50px] w-[170px] h-[50px] mr-10 my-10 border-[1px] rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
                placeholder="名前"
                id="name"
                name="name"
                required
              />
              <input
                type="email"
                className="sm:w-[450px] sm:h-[50px] w-[170px] h-[50px] border-[1px] my-10 rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
                placeholder="メールアドレス"
                id="email"
                name="email"
                required
              />
            </div>
            <input
              type="tel"
              className="w-full h-[50px] border-[1px] mb-10 rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
              placeholder="電話番号(ハイフンなし)"
              id="tel"
              name="tel"
              required
            />
            <textarea
              className="w-full h-[150px] border-[1px] rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
              placeholder="コメント"
              id="comment"
              name="comment"
              required
            />
            <button
              className="bg-[#3EBCB5] hover:bg-[#46cdc6] w-[150px] h-[50px] mt-10 rounded-lg text-white font-bold"
              type="submit"
            >
              <span className="">送信する</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
