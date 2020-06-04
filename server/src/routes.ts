import express from "express"

import LocalsController from "./controllers/LocalsController"
import ItemsController from "./controllers/ItemsController"

const routes = express.Router()

const localsController = new LocalsController()
const itemsController = new ItemsController()

routes.get("/items", itemsController.index)

routes.post("/locals", localsController.create)

export default routes