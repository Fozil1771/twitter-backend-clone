import { Router } from "express"
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient()

// Tweet CRUD

router.post('/', async (req, res) => {
  const { content, userId } = req.body
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        userId
      }
    })

    res.json(result)
  } catch (e) {
    res.status(400).json({ error: "Content is empty" })
  }
})

router.get('/', async (req, res) => {
  const allTweets = await prisma.tweet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true
        }
      }
    }
  });

  res.json(allTweets)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!tweet) {
    res.status(404).json({ error: "Not found" })
  } else {
    res.json(tweet)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { content, image } = req.body;
  try {
    const result = await prisma.tweet.update({
      where: { id: Number(id) },
      data: {
        content,
        image
      }
    })
    res.json(result)
  } catch (error) {
    res.status(400).json({ error: "Failed to update the tweet" })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({ where: { id: Number(id) } })
  res.status(200)
})


export default router;