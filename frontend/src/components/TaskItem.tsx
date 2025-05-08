import { IconButton, ListItem, ListItemText } from '@mui/material';
import type Task from '../types/task';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskItemProps {
  task: Task;
  onToggleDone: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleDone, onDelete }: TaskItemProps) {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={() => onToggleDone(task)}>
            <CheckIcon />
          </IconButton>
          <IconButton edge="end" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={task.title}
        secondary={task.description}
        sx={{ textDecoration: task.done ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
}
