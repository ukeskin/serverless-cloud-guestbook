import { api, data } from "@serverless/cloud";

api.get("/api/messages", async (req, res) => {
  let result = await data.get("message:*");
  res.json(result);
});

api.post("/api/messages", async (req, res) => {
  let message = req.body;

  let id = Math.random().toString(36).substring(7);

  await data.set(`message:${id}`, message);
  res.json({
    success: true,
  });
});

api.get("/api/*", (req, res) => {
  console.log(`404 - api`);
  res.status(404).send({ error: "not found" });
});
