import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({
    1: "angelo",
    2: "aline",
    3: "maria"
  })
})

app.listen(3333)