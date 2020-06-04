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

    const locals = {
      image: "image-fake",
      name,
      email,
      whatsapp, 
      latitude,
      longitude,
      city, 
      uf
    }
  
    const insertedIds = await knex("locals").insert(locals)
  
    const locals_id = insertedIds[0]
  
    const itemsLocals = items.map((items_id: number) => {
      return {
        items_id,
        locals_id
      }
    })
    
    await knex("items_locals").insert(itemsLocals)
  
    return res.json({
      id: locals_id,
      ...locals
    })
  }
}

export default LocalsController