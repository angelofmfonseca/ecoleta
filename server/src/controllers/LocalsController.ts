import { Request, Response } from "express";

import knex from "../database/connection";

class LocalsController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const local = await knex("locals").where("id", id).first();

    if (!local) {
      return res.status(400).json({
        message: "Local not found.",
      });
    }

    const item = await knex("items")
      .join("items_locals", "items.id", "=", "items_locals.items_id")
      .where("items_locals.locals_id", id)
      .select("items.title");

    return res.json({
      local,
      item,
    });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const locals = {
      image: "image-fake",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await knex("locals").insert(locals);

    const locals_id = insertedIds[0];

    const itemsLocals = items.map((items_id: number) => {
      return {
        items_id,
        locals_id,
      };
    });

    await knex("items_locals").insert(itemsLocals);

    return res.json({
      id: locals_id,
      ...locals,
    });
  }
}

export default LocalsController;
