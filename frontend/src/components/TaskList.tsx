import { List } from '@mui/material';
import type Task from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggleDone: (task: Task) => void;
    onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onToggleDone, onDelete }: TaskListProps) {
    return (
        <List>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggleDone={onToggleDone} onDelete={onDelete} />
            ))}
        </List>
    );
}
