import 'dotenv/config'
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })

const app = express()

app.use(express.json())

app.post("/user", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
    res.status(201).json({
      message: user
    })
  }
  catch(err) {
    console.error("Server Error", err)
  }
})

app.listen(3000, () => {
  console.log("Running on PORT 3000")
})