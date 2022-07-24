import type { CustomNextPage } from "next";
import { FluidLayout } from "src/layout";
import { SignUp } from "src/pages/signUp";

const SignUpPage: CustomNextPage = () => {
  return <SignUp />;
};

SignUpPage.getLayout = FluidLayout;

export default SignUpPage;
