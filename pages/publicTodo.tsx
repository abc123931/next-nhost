import type { CustomNextPage } from "next";
import { FluidLayout } from "src/layout";
import { PublicTodo } from "src/pages/publicTodo";

const PublicTodoPage: CustomNextPage = () => {
  return <PublicTodo />;
};

PublicTodoPage.getLayout = FluidLayout;

export default PublicTodoPage;
