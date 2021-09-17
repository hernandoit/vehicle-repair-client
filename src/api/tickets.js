// apiUrl will be either the production or development url defined
// in the apiConfig.js file
import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Ticket Request
// assume that `data` is an object with `title` and `director`
// { title: 'something', director: 'someone' }
// POST /tickets/:carId
export const addTicket = (data, carId, user) => {
  return axios({
    url: apiUrl + '/tickets/' + carId,
    method: 'post',
    data: { ticket: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// GET /tickets/:carId/:ticketId
export const showTickets = (carId, ticketId, user) => {
  return axios({
    url: apiUrl + '/tickets/' + carId + '/' + ticketId,
    // method is optional, default is GET
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// PATCH /tickets/:carId/:ticketId
export const updateTicket = (data, carId, ticketId, user) => {
  return axios({
    url: apiUrl + '/tickets/' + carId + '/' + ticketId,
    method: 'PATCH',
    data: { ticket: data },
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}

// DELETE /tickets/:carId/:ticketId
export const destroyTicket = (carId, ticketId, user) => {
  return axios({
    url: apiUrl + '/tickets/' + carId + '/' + ticketId,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
