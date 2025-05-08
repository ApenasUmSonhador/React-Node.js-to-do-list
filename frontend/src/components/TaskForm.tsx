import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface TaskFormProps {
    onCreate: (title: string, description: string) => void;
}

export default function TaskForm({ onCreate }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onCreate(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} mt={4}>
            <TextField
                fullWidth
                label="Título"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                fullWidth
                label="Descrição"
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" type="submit">Adicionar Tarefa</Button>
        </Box>
    );
}
