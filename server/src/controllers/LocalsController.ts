import { Request, Response } from "express"

import knex from "../database/connection"

class LocalsController{
  async create(req: Request, res: Response) {
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
  }
}

export default LocalsController