import { useState } from "react";
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

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface Task {
  uid: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
}

interface AllTodoListProps {
  data: Task[];
}

export function AllTodoList({ data }: AllTodoListProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<string[]>([]);

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
        <td>{item.dueDate.toLocaleDateString()}</td>
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
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
