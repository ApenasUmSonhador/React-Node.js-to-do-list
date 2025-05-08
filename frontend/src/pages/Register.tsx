import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const passwordRules = [
        { rule: 'A senha deve ter pelo menos 6 caracteres', test: (pwd: string) => pwd.length >= 6 },
        { rule: 'A senha deve conter pelo menos uma letra maiúscula', test: (pwd: string) => /[A-Z]/.test(pwd) },
        { rule: 'A senha deve conter pelo menos uma letra minúscula', test: (pwd: string) => /[a-z]/.test(pwd) },
        { rule: 'A senha deve conter pelo menos um número', test: (pwd: string) => /[0-9]/.test(pwd) },
        { rule: 'A senha deve conter pelo menos um caractere especial', test: (pwd: string) => /[!@#$%^&*]/.test(pwd) },
    ];

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { email, password });
            navigate('/login');
        } catch (error: any) {
            const msg = error.response?.data?.error || 'Erro inesperado durante o login';
            alert(`Erro ao registrar: ${msg}`);
            console.error(error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleRegister} mt={8}>
                <Button variant="outlined" color="secondary" onClick={() => navigate('/login')}>
                    Fazer login
                </Button>
                <Typography variant="h4" gutterBottom>Registrar</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    type="password"
                    margin="normal"
                    label="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Typography variant="subtitle1" mt={2}>Requisitos da senha:</Typography>
                <List>
                    {passwordRules.map(({ rule, test }, index) => (
                        <ListItem key={index} disableGutters>
                            {test(password) ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                                <CancelIcon color="error" fontSize="small" />
                            )}
                            <ListItemText primary={rule} sx={{ ml: 1 }} />
                        </ListItem>
                    ))}
                </List>
                <Button variant="contained" type="submit" fullWidth>Cadastrar</Button>
            </Box>
        </Container>
    );
}
