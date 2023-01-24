import { API_URL } from '../../config/API'

export const register = async (payload) => {
    return fetch(API_URL + '/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then((response) => response.json())
  }