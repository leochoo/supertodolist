import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import { Task } from "./types/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface AllTodoListProps {
  userId: string;
}

export function AllTodoList({ userId }: AllTodoListProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<string[]>([]);
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "Tasks"),
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => doc.data() as Task);
        setData(tasksData);
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when component unmounts
    };
  }, [userId]);
  const toggleRow = (id: string) => {
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.uid)
    );
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.uid);
    return (
      <tr key={item.uid} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selected}
            onChange={() => toggleRow(item.uid)}
            transitionDuration={0}
          />
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.project}</td>
        <td>{item.dueDate && item.dueDate.toDate().toLocaleDateString()}</td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Project</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
