import React from "react";
import { GrMail } from "react-icons/gr";

type ContactProps = {};

const Contact = (props: ContactProps) => {
  const email = "bv21053@shibaura-it.ac.jp";

  const handleContact = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto mt-10 space-y-6">
        <h1 className="text-5xl text-center">お問い合わせ</h1>
        <h2>
          (現在機能開発中に伴い、メールマークからお問い合わせお願いいたします。)
        </h2>
        <div className="flex flex-col">
          <div className="grid grid-cols-2">
            <input
              type="text"
              className="sm:w-[400px] sm:h-[50px] w-[170px] h-[50px] mr-10 my-10 border-[1px] rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
              placeholder="名前"
            />
            <input
              type="email"
              className="sm:w-[450px] sm:h-[50px] w-[170px] h-[50px] border-[1px] my-10 rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
              placeholder="メールアドレス"
            />
          </div>
          <input
            type="tel"
            className="w-full h-[50px] border-[1px] mb-10 rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
            placeholder="電話番号(ハイフンなし)"
          />
          <textarea
            className="w-full h-[150px] border-[1px] rounded-lg focus:border-[#31ACA3] px-3 focus:border-2 outline-none"
            placeholder="コメント"
          />
          <button className="bg-[#3EBCB5] hover:bg-[#46cdc6] w-[150px] h-[50px] mt-10 rounded-lg text-white font-bold">
            <span className="">送信する</span>
          </button>
        </div>
        <div className="mt-10 text-2xl cursor-pointer" onClick={handleContact}>
          <GrMail size={120} className="text-[#3EBCB5] " />
        </div>
      </div>
    </>
  );
};

export default Contact;
