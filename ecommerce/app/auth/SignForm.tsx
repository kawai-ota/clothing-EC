"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Input from "../components/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import SignButton from "../components/SignButton";

type Variant = "LOGIN" | "REGISTER";

const SignForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() =>
          toast.error("入力情報に誤りがあるかすでに登録されています。")
        )
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("入力情報に誤りがあります。");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("ログインに成功しました");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-10 rounded-lg shadow-lg flex flex-col">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <>
              <h1 className="text-xl">新規登録</h1>
              <Input
                id="name"
                label="名前"
                register={register}
                errors={errors}
                disabled={isLoading}
                required={false}
              />
            </>
          )}
          {variant === "LOGIN" && <h1 className="text-xl">ログイン</h1>}
          <Input
            id="email"
            label="メールアドレス"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
          <span style={{ color: "red" }}>
            {errors.email && "メールアドレスは必須です"}
          </span>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="パスワード"
            type="password"
          />
          <span style={{ color: "red" }}>
            {errors.password && "パスワードは必須です"}
          </span>
          <div>
            <SignButton disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "ログイン" : "新規登録"}
            </SignButton>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-10 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "新規登録をしますか？"
              : "すでにアカウントが存在しています"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "アカウントを作成する" : "ログインする"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
