import type { CustomNextPage } from "next";
import { FluidLayout } from "src/layout";
import { SignIn } from "src/pages/signIn";

const SignInPage: CustomNextPage = () => {
  return <SignIn />;
};

SignInPage.getLayout = FluidLayout;

export default SignInPage;
