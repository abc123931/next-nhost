import { useSignInEmailPassword } from "@nhost/nextjs";
import Link from "next/link";
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

export const SignIn: FC = () => {
  const router = useRouter();

  const { error, isError, isLoading, signInEmailPassword } =
    useSignInEmailPassword();
  const { handleSubmit, register } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
      dispalyName: "",
    },
  });

  const handleClick = handleSubmit(async (data) => {
    await signInEmailPassword(data.email, data.password);
    router.push(pagesPath.$url().pathname);
  });

  return (
    <div>
      <h2>SignIn</h2>
      <div>
        <div>
          <label>メールアドレス</label>
          <input {...register("email")} type="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input {...register("password")} type="password" />
        </div>
      </div>
      <Button
        tag="button"
        className="p-2"
        onClick={handleClick}
        disabled={isLoading}
      >
        ログイン
      </Button>
      {isError ? <p>{error?.message}</p> : null}
      <Link href={pagesPath.signUp.$url().pathname}>
        <a>sign up</a>
      </Link>
    </div>
  );
};
