export const register = async (app, request, reply) => {
  const { db } = app.mongo;
  const { name, email, password } = request.body;
  const user = await db.collection("users").insertOne({ name, email, password });
  reply.send(user);
} 

export const login = async (app, request, reply) => {
  const { db } = app.mongo;
  const { email, password } = request.body;
  const user = await db.collection("users").findOne({ email, password });
  reply.send(user);
}
