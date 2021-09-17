// apiUrl will be either the production or development url defined
// in the apiConfig.js file
import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Car Request
// assume that `data` is an object with `title` and `director`
// { title: 'something', director: 'someone' }
export const addCar = (data, user) => {
  return axios({
    url: apiUrl + '/cars',
    method: 'POST',
    data: { car: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// Index request
// no data, we will need a token
export const indexCars = (user) => {
  return axios({
    // method key sets the HTTP verb/method for this request
    // GET is the default method, so we can include or not up to us
    method: 'GET',
    url: apiUrl + '/cars',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// GET /cars/:id
export const showCars = (id, user) => {
  return axios({
    url: apiUrl + '/cars/' + id,
    // method is optional, default is GET
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// DELETE /cars/:id
export const destroyCar = (id, user) => {
  return axios({
    url: apiUrl + '/cars/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// PATCH /cars/:id
export const updateCar = (data, id, user) => {
  return axios({
    url: apiUrl + '/cars/' + id,
    method: 'PATCH',
    data: { car: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
