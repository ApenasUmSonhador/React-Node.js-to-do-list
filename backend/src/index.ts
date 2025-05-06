import app from './server'
import authRoutes from './routes/authRoutes'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use('/auth', authRoutes)