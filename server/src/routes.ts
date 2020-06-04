import express from "express"

import knex from "./database/connection"
import LocalsController from "./controllers/LocalsController"

const routes = express.Router()
const localsController = new LocalsController()

routes.get("/items", async (req, res) => {
  const items = await knex("items").select("*")

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${ item.image }`
    }
  })
  return res.json(serializedItems)
})

routes.post("/locals", localsController.create)

export default routes