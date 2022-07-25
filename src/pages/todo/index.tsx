import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuthenticated, useUserId } from "@nhost/react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/component/Button";

export const Todo: FC = () => {
  return (
    <div>
      <h2>Todo</h2>
      <TodoForm />
      <TodoList />
    </div>
  );
};

const TODO_FORM_MUTATION = gql`
  mutation TodoFormCreate($title: String!, $userId: uuid!) {
    insertTodo(object: { title: $title, userId: $userId }) {
      id
    }
  }
`;

const TodoForm: FC = () => {
  const id = useUserId();
  const [create] = useMutation(TODO_FORM_MUTATION, {
    refetchQueries: [{ query: TODO_LIST_QUERY }],
  });
  const { handleSubmit, register, reset } = useForm<{ title: string }>({
    defaultValues: { title: "" },
  });

  const handleClick = handleSubmit(async (data) => {
    try {
      if (!id) {
        return;
      }
      await create({
        variables: {
          title: data.title,
          userId: id,
        },
      });
      reset();
    } catch (error) {
      console.error(error);
      alert("エラー");
    }
  });

  return (
    <div>
      <input type="text" {...register("title")} />
      <Button tag="button" className="p-2" onClick={handleClick}>
        作成
      </Button>
    </div>
  );
};

const TODO_LIST_QUERY = gql`
  query TodoList {
    todos {
      id
      isCompleted
      isPublic
      title
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
  const isAuth = useAuthenticated();
  const {
    data,
    error,
    loading: isLoading,
  } = useQuery<{ todos: Todo[] }>(TODO_LIST_QUERY, { skip: !isAuth });

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
