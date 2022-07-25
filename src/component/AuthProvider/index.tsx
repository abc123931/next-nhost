import { useAuthenticationStatus } from "@nhost/nextjs";
import type { FC } from "react";

type Props = {
  children: JSX.Element;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <p>...loading</p>;
  }

  return children;
};
