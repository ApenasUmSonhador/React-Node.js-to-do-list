import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import validator from 'validator'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Função para verificar se e-mail é válido
const emailIsValid = (res: Response, email: string): boolean => {
    if (!email || email.trim().length === 0) {
        res.status(400).json({ error: 'Por favor insira um e-mail' })
        return false
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Formato de e-mail inválido' })
        return false
    }

    return true
}

// Função para verificar se a senha é válida e atende aos critérios de segurança
const passwordIsValid = (res: Response, password: string): boolean => {
    if (!password || password.trim().length === 0) {
        res.status(400).json({ error: 'Por favor insira uma senha' })
        return false
    }

    if (password.length < 6) {
        res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' })
        return false
    }
    if (!/[A-Z]/.test(password)) {
        res.status(400).json({ error: 'A senha deve conter pelo menos uma letra maiúscula' })
        return false
    }
    if (!/[a-z]/.test(password)) {
        res.status(400).json({ error: 'A senha deve conter pelo menos uma letra minúscula' })
        return false
    }
    if (!/[0-9]/.test(password)) {
        res.status(400).json({ error: 'A senha deve conter pelo menos um número' })
        return false
    }
    if (!/[!@#$%^&*]/.test(password)) {
        res.status(400).json({ error: 'A senha deve conter pelo menos um caractere especial' })
        return false
    }

    return true
}

// Controlador para registrar um novo usuário, armazenando o e-mail e a senha criptografada no banco de dados
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!emailIsValid(res, email) || !passwordIsValid(res, password)) {
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        })
        res.status(201).json({ message: 'Usuário criado' })
    } catch {
        res.status(400).json({ error: 'E-mail já está em uso' })
    }
}

// Controlador para fazer login, verificando as credenciais do usuário e retornando um token JWT
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!emailIsValid(res, email) || !passwordIsValid(res, password)) {
        return
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
}
