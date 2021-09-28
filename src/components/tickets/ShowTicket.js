import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateTicket, destroyTicket } from '../../api/tickets'

import Button from 'react-bootstrap/Button'

class ShowTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tickets: null
    }
  }

  componentDidMount () {
    const { ticket } = this.props
    this.setState({ tickets: ticket })
    console.log(this.state.ticket)
  }

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
  const { match, user, history, msgAlert } = this.props // msgAlert
  destroyTicket(match.params.carId, user, match.params.ticketId)
    // Redirect to the index of lists
    .then(() => history.push('/'))
    .then(() => history.push(match.url))
    .then(() => msgAlert({ heading: 'Deleted ticket successfully', message: 'ticket is no more', varant: 'success' }))
    .catch(err => msgAlert({ heading: 'Delete ticket failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
}

render () {
  if (this.state.ticket === null) {
    return 'Loading...'
  }

  const { history, match, job, labor, isComplete } = this.props
  return (
    <>
      <h1>Ticket</h1>
      <p>Job: {job}</p>
      <p>Labor: {labor}</p>
      <p>Completed: {isComplete}</p>
      <Button onClick={this.handleDelete}>Delete Ticket</Button>
      <Button onClick={() =>
        history.push(`/tickets/${match.params.carId}/${match.params.ticketId}`)}>Update Ticket</Button>
    </>
  )
}
}

export default withRouter(ShowTicket)
