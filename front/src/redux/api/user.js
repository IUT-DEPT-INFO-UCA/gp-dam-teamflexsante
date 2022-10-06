import { API_URL } from '../../config/API'

export const login = async (payload) => {
  return fetch(API_URL + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
}

export const getUserByToken = async (token) => {
  return fetch(API_URL + '/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }).then((response) => response.json())
}
