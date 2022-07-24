import { useSignOut, useUserData } from "@nhost/react";
import type { FC } from "react";
import { Button } from "src/component/Button";

export const Index: FC = () => {
  const user = useUserData();
  const { signOut } = useSignOut();

  return (
    <div>
      <h2>Index</h2>
      <p>{user ? user.displayName : "ログインしてください"}</p>
      {user ? (
        <Button
          tag="button"
          className="p-2"
          onClick={() => {
            return signOut();
          }}
        >
          ログアウト
        </Button>
      ) : null}
    </div>
  );
};
