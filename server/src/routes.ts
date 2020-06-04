import express from "express"

import knex from "./database/connection"

const routes = express.Router()

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

routes.post("/locals", async (req, res) => {
  const {
    name,
    email,
    whatsapp, 
    latitude,
    longitude,
    city, 
    uf,
    items
  } = req.body;

  const insertedIds = await knex("locals").insert({
    image: "image-fake",
    name,
    email,
    whatsapp, 
    latitude,
    longitude,
    city, 
    uf
  })

  const locals_id = insertedIds[0]

  const itemsLocals = items.map((items_id: number) => {
    return {
      items_id,
      locals_id
    }
  })
  
  await knex("items_locals").insert(itemsLocals)

  return res.json({ success: true })
})

export default routes