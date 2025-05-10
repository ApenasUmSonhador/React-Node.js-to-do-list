import { List } from '@mui/material';
import type Task from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggleDone: (task: Task) => void;
    onDelete: (id: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

export default function TaskList({ tasks, onToggleDone, onDelete, onUpdate }: TaskListProps) {
    return (
        <List>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggleDone={onToggleDone} onDelete={onDelete} onUpdate={onUpdate} />
            ))}
        </List>
    );
}
