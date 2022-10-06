export const setToken = (token) => {
  document.cookie = `token=${token}`
}

export const getToken = () => {
  const cookie = document.cookie
  const token = cookie.split('token=')
  return token[1]
}
