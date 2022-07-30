import { gql, useQuery } from "@apollo/client";
import type { FC } from "react";

export const PublicTodo: FC = () => {
  return (
    <div>
      <h2>Public Todo</h2>
      <TodoList />
    </div>
  );
};

const TODO_FRAGMENT = gql`
  fragment Todo on todos {
    id
    isCompleted
    isPublic
    title
  }
`;

const TODO_LIST_QUERY = gql`
  ${TODO_FRAGMENT}
  query TodoList {
    todos {
      ...Todo
    }
  }
`;

type Todo = {
  id: string;
  isCompleted: boolean;
  isPublic: boolean;
  title: string;
};

const TodoList: FC = () => {
  const {
    data,
    error,
    loading: isLoading,
  } = useQuery<{ todos: Todo[] }>(TODO_LIST_QUERY);

  if (error) {
    return <p>エラーです</p>;
  }

  if (isLoading) {
    return <p>...loading</p>;
  }

  if (!data) {
    return <p>TODOがありません</p>;
  }

  return (
    <ul>
      {data.todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};
