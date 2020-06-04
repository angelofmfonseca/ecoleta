import { Request, Response } from "express";

import knex from "../database/connection";

class LocalsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const locals = await knex("locals")
      .join("items_locals", "locals.id", "=", "items_locals.locals_id")
      .whereIn("items_locals.items_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("locals.*");

    return res.json(locals);
  }

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

    return res.json({ local, item });
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

    const trx = await knex.transaction();

    const insertedIds = await trx("locals").insert(locals);

    const locals_id = insertedIds[0];

    const itemsLocals = items.map((items_id: number) => {
      return { items_id, locals_id };
    });

    await trx("items_locals").insert(itemsLocals);

    await trx.commit();

    return res.json({
      id: locals_id,
      ...locals,
    });
  }
}

export default LocalsController;
