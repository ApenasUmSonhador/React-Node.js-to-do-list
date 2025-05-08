import {
    Button,
    Container,
    TextField,
    Typography,
    List,
    Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import type Task from '../types/task';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:3000/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Erro ao buscar tarefas', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        try {
            const res = await axios.post(
                'http://localhost:3000/tasks',
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks((prev) => [...prev, res.data]);
            setTitle('');
            setDescription('');
        } catch (error: any) {  
            const msg = error.response?.data?.error || 'Erro inesperado durante o login';
            alert(`Erro ao criar a tarefa: ${msg}`);
            console.error('Erro ao criar tarefa', err);
        }
    };

    const handleToggleDone = async (task: Task) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/tasks/${task.id}`,
                {
                    ...task,
                    done: !task.done,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? res.data : t))
            );
        } catch (err) {
            console.error('Erro ao atualizar tarefa', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error('Erro ao deletar tarefa', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
                <Typography variant="h4">Gerenciador de Tarefas</Typography>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Sair
                </Button>
            </Box>

            <TextField
                label="Título"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Descrição"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
            />
            <Box textAlign="right" mt={2} mb={4}>
                <Button variant="contained" onClick={handleCreateTask}>
                    Criar Tarefa
                </Button>
            </Box>

            <List>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleDone={handleToggleDone}
                        onDelete={handleDelete}
                    />
                ))}
            </List>
        </Container>
    );
}
