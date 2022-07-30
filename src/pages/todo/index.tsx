import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuthenticated, useUserId } from "@nhost/react";
import type { FC } from "react";
import { useCallback } from "react";
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

const TODO_FRAGMENT = gql`
  fragment Todo on todos {
    id
    isCompleted
    isPublic
    title
  }
`;

const TODO_FORM_MUTATION = gql`
  ${TODO_FRAGMENT}
  mutation TodoFormCreate($title: String!, $userId: uuid!) {
    insertTodo(object: { title: $title, userId: $userId }) {
      ...Todo
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
        return (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};

const TODO_ITEM_DELETE_MUTATION = gql`
  ${TODO_FRAGMENT}
  mutation TodoItemDelete($id: uuid!) {
    deleteTodo(id: $id) {
      ...Todo
    }
  }
`;

const TODO_ITEM_UPDATE_MUTATION = gql`
  ${TODO_FRAGMENT}
  mutation TodoItemUpdate($id: uuid!, $_set: todos_set_input!) {
    updateTodo(pk_columns: { id: $id }, _set: $_set) {
      ...Todo
    }
  }
`;

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const [deleteTodo] = useMutation(TODO_ITEM_DELETE_MUTATION, {
    refetchQueries: [{ query: TODO_LIST_QUERY }],
  });
  const [update] = useMutation(TODO_ITEM_UPDATE_MUTATION);
  const handleDelete = useCallback(async () => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
    } catch (error) {
      console.error(error);
      alert("エラー");
    }
  }, [deleteTodo, todo.id]);

  const handleChangeComplete = useCallback(async () => {
    try {
      await update({
        variables: { id: todo.id, _set: { isCompleted: !todo.isCompleted } },
      });
    } catch (error) {
      console.error(error);
      alert("エラー");
    }
  }, [todo.id, todo.isCompleted, update]);

  const handleChangePublic = useCallback(async () => {
    try {
      await update({
        variables: { id: todo.id, _set: { isPublic: !todo.isPublic } },
      });
    } catch (error) {
      console.error(error);
      alert("エラー");
    }
  }, [todo.id, todo.isPublic, update]);

  return (
    <div>
      <p>{todo.title}</p>
      <div>
        <label>完了</label>
        <input
          type="checkbox"
          onChange={handleChangeComplete}
          checked={todo.isCompleted}
        />
      </div>
      <div>
        <label>公開</label>
        <input
          type="checkbox"
          onChange={handleChangePublic}
          checked={todo.isPublic}
        />
      </div>
      <button onClick={handleDelete}>削除</button>
    </div>
  );
};
