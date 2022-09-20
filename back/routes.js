import { register, login } from "./controllers/User.js"

export const routes = (app) => {
  if (!app) {
    throw new Error('app is required')
  }

  app.get('/', (request, reply) => {
    reply.send('Hello World')
  })

  app.post('/user/register', async (request, reply) => {
    await register(app, request, reply)
  })

  app.post('/user/login', async (request, reply) => {
    await login(app, request, reply)
  })

}