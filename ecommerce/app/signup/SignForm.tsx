"use client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Input from "../components/Input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

const AuthForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data); // Wait for the axios post request to complete
      await signIn("credentials", data); // Wait for the signIn function to complete
      router.push("/"); // Redirect to the desired page
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            label="名前"
            register={register}
            errors={errors}
            disabled={isLoading}
            required={false}
          />

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
          <Button disabled={isLoading} fullWidth type="submit">
            新規登録
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
