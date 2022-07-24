import { useSignUpEmailPassword } from "@nhost/nextjs";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/component/Button";
import { pagesPath } from "src/lib/$path";

type FormValue = {
  email: string;
  password: string;
  dispalyName: string;
};

export const SignUp: FC = () => {
  const router = useRouter();

  const { error, isError, isLoading, signUpEmailPassword } =
    useSignUpEmailPassword();
  const { handleSubmit, register } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
      dispalyName: "",
    },
  });

  const handleClick = handleSubmit(async (data) => {
    await signUpEmailPassword(data.email, data.password, {
      displayName: data.dispalyName,
    });
    router.push(pagesPath.$url().pathname);
  });

  return (
    <div>
      <h2>SignUp</h2>
      <div>
        <div>
          <label>メールアドレス</label>
          <input {...register("email")} type="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input {...register("password")} type="password" />
        </div>
        <div>
          <label>ニックネーム</label>
          <input {...register("dispalyName")} type="text" />
        </div>
      </div>
      <Button
        tag="button"
        className="p-2"
        onClick={handleClick}
        disabled={isLoading}
      >
        登録
      </Button>
      {isError ? <p>{error?.message}</p> : null}
    </div>
  );
};
