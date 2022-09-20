/* eslint-disable no-undef */
import Fastify from "fastify"
import FastifyEnv from "@fastify/env"
import fastifyMongodb from "@fastify/mongodb"
import { routes } from "./routes.js"
import { tests } from "./test/index.js"

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
  dotenv: {
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  },
  data: process.env,
}

const app = Fastify({
  logger: true,
})

routes(app)

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
    await app.listen({ port: 3000 }).then(() => {
      console.log(`Server listening at  http://localhost:${app.server.address().port}`)
    })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

initialize()

if (process.env.NODE_ENV !== 'test') {
  main()
} else {
  tests(app)
}


