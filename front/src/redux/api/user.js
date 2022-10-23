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

export const register = async (payload) => {
  return fetch(API_URL + '/user/register', {
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

export const getUserById = async (id) => {
  return fetch(API_URL + '/user/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json())
}

export const postFeelingForm = async (payload, token) => {
  return fetch(API_URL + '/user/feeling', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      feeling: payload
    })
  }).then((response) => response.json())
}

export const sendRequest = async (payload, token) => {
  return fetch(API_URL + '/group/request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
}

export const acceptRequest = async (payload, token) => {
  return fetch(API_URL + '/group/accept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(payload)
  }).then((response) => response.json())
}

export const generateFakeData = async () => {
  return fetch(API_URL + '/user/generate', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json())
}
