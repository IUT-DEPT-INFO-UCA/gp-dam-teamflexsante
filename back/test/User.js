import t from "tap"


const register = async (app) => {

}

const login = async (app) => {

}

export const userTests = async (app) => {
  if (!app) {
    throw new Error('app is required')
  }

  register(app)
  login(app)
}
