import { Router } from "express"

const router = Router();


// Tweet CRUD

router.post('/', (req, res) => {
  res.status(501).json({ error: "Not Implemented" })
})

router.get('/', (req, res) => {
  res.status(501).json({ error: "Not Implemented" })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(501).json({ id: id })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  res.status(501).json({ id: id })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(501).json({ id: id })
})


export default router;