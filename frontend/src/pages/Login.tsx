import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data?.token) {
                login(res.data.token);
                navigate('/home');
            } else {
                throw new Error('Token não encontrado na resposta');
            }
        } catch (error: any) {
            const msg = error.response?.data?.error || 'Erro inesperado durante o login';
            alert(`Erro ao fazer login: ${msg}`);
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleLogin} mt={8}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" gutterBottom>Login</Typography>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/register')}>
                        Fazer Registro
                    </Button>
                </Box>
                <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth type="password" margin="normal" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" type="submit" fullWidth>Entrar</Button>
            </Box>
        </Container>
    );
}
