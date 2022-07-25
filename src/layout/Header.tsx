import { useAuthenticated } from "@nhost/react";
import type { FC } from "react";
import { useMemo } from "react";
import { NavLink } from "src/component/Button";
import { pagesPath } from "src/lib/$path";

/**
 * @package
 */
export const Header: FC = () => {
  const isAuth = useAuthenticated();

  const items = useMemo(() => {
    return isAuth
      ? [
          { href: pagesPath.$url().pathname, label: "Root" },
          { href: pagesPath.todo.$url().pathname, label: "Todo" },
        ]
      : [
          { href: pagesPath.$url().pathname, label: "Root" },
          { href: pagesPath.signIn.$url().pathname, label: "ログイン" },
        ];
  }, [isAuth]);

  return (
    <div>
      <h1>Title</h1>
      <nav>
        {items.map(({ href, label }) => {
          return (
            <NavLink key={href} href={href} activeClassName="text-red-500">
              <a className="inline-block p-4">{label}</a>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
