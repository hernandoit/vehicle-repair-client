import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showCars, destroyCar } from '../../api/cars'

import Button from 'react-bootstrap/Button'
import IndexTickets from '../tickets/IndexTickets'

class ShowCar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      car: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    showCars(match.params.id, user)
      .then(res => this.setState({ car: res.data.car }))
      .then(() => msgAlert({
        heading: 'Show car success',
        message: 'Check out the car',
        variant: 'success'
      }))
      .catch(err => msgAlert({
        heading: 'Show car failed :(',
        message: 'Something went wrong: ' + err.message,
        variant: 'danger'
      }))
  }

  handleDelete = (event) => {
    const { match, user, msgAlert, history } = this.props
    destroyCar(match.params.id, user)
      .then(() => history.push('/cars'))
      .then(() => msgAlert({ heading: 'Deleted car successfully', message: 'car is no more', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Delete car failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  render () {
    if (this.state.car === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the car state
    // owner
    const { year, make, model } = this.state.car
    // user
    const { history, match } = this.props
    const { car } = this.state
    const displayTickets = car.tickets.map(ticket => (
      <IndexTickets key={ticket.id} job={ticket.job} labor={ticket.labor} isComplete={ticket.isComplete} />
    ))
    return (
      <>
        <div>
          <h1>{year} {make} {model}</h1>
          <Button onClick={this.handleDelete}>Delete Vehicle</Button>
          <Button onClick={() => history.push(`/cars/${match.params.id}/edit`)}>Update Vehicle</Button>
          <Button onClick={() => history.push(`/add-tickets/${match.params.id}`)}>Add Ticket</Button>
        </div>
        <p>{displayTickets}</p>
      </>
    )
  }
}

export default withRouter(ShowCar)
