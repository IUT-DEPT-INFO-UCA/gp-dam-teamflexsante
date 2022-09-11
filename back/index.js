import Fastify, { fastify } from "fastify"
import FastifyEnv from "@fastify/env"
import fastifyMongodb from "@fastify/mongodb"

const schema = {
  type: "object",
  required: ["DB_URL"],
  properties: {
    DB_URL: {
      type: "string",
    },
  },
}

const options = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
}

const app = Fastify({
  logger: true,
})

app.get("/", function (request, reply) {
  reply.send("Hello World")
})

const initialize = async () => {
  app.register(FastifyEnv, options)
  await app.after()

  app.register(fastifyMongodb, {
    forceClose: true,
    url: app.config.DB_URL,
  })
}

const main = async () => {
  try {
    await app.ready()
    await app.listen(process.env.PORT)
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

initialize()
main()
