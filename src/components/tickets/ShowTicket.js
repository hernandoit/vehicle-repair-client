import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateTicket, destroyTicket } from '../../api/tickets'

import Button from 'react-bootstrap/Button'

class ShowTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our ShowCars component
      // car: null,
      ticket: {}
    }
  }

  componentDidMount () {
    const { ticket } = this.props
    console.log('this is ticket in show', ticket)
    this.setState({ ticket: ticket })
  }

  // handleDelete = (event) => {
  //   const { match, user, msgAlert, history } = this.props
  //   destroyTicket(match.params.id, user)
  //     // Redirect to the list of cars
  //     .then(() => history.push('/cars/:carId'))
  //     .then(() => msgAlert({ heading: 'Deleted ticket successfully', message: 'ticket is no more', variant: 'success' }))
  //     .catch(err => msgAlert({ heading: 'Delete ticket failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  // }
handleUpdate = () => {
  const { user, msgAlert, history, match } = this.props
  updateTicket(this.state.ticket, match.params.carId, user, this.state.ticket._id)
    .then(() => history.push('/'))
    .then(() => history.push(match.url))
    .then(() => msgAlert({
      heading: 'Show Ticket success',
      message: 'Check out the ticket',
      variant: 'success'
    }))
    .catch(err => msgAlert({
      heading: 'Show ticket failed :(',
      message: 'Something went wrong: ' + err.message,
      variant: 'danger'
    }))
}

handleDelete = (event) => {
  const { match, user, history } = this.props // msgAlert
  destroyTicket(match.params.carId, user, match.params.ticketId)
    // Redirect to the index of lists
    .then(() => history.push('/'))
    .then(() => history.push(match.url))
    // .then(() => msgAlert({ heading: 'Deleted ticket successfully', message: 'ticket is no more', varant: 'success' }))
    // .catch(err => msgAlert({ heading: 'Delete ticket failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
}

render () {
  if (this.state.ticket === null) {
    return 'Loading...'
  }

  // Get the owner (a user id) from the car state
  const { history, match } = this.props
  const { ticket } = this.state
  const showTickets = ticket.map(ticket => (
    <ShowTicket key={ticket.id} job={ticket.job} labor={ticket.labor} isComplete={ticket.isComplete} />
  ))
  return (
    <>
      <h1>Ticket</h1>
      <h3>{showTickets}</h3>
      <p>Job:</p>
      <p>Labor:</p>
      <p>Completed:</p>
      <Button onClick={this.handleDelete}>Delete Ticket</Button>
      <Button onClick={() =>
        history.push(`/cars/${match.params.carId}/${match.params.ticketId}/edit`)}>Update Ticket</Button>
    </>
  )
}
}

export default withRouter(ShowTicket)
