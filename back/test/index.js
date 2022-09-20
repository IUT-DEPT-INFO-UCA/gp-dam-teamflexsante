import { userTests } from "./User.js"

export const tests = async (app) => {
  if (!app) {
    throw new Error('app is required')
  }

  await userTests(app)
  
}