import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showTicket, destroyTicket } from '../../api/tickets'

import Button from 'react-bootstrap/Button'

class ShowTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our ShowCars component
      // car: null,
      ticket: undefined
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { match, user, msgAlert } = this.props
    showTicket(match.params.carId, match.params.ticketId, user)
      .then(res => this.setState({ ticket: res.data.ticket }))
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
    const { match, user, msgAlert, history } = this.props
    destroyTicket(match.params.id, user)
      // Redirect to the list of cars
      .then(() => history.push('/tickets'))
      .then(() => msgAlert({ heading: 'Deleted ticket successfully', message: 'ticket is no more', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Delete ticket failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  render () {
    if (this.state.ticket === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the car state
    const { job, labor, isComplete, owner } = this.state.ticket
    const { history, match, user } = this.props

    return (
      <>
        <h3>Vehicle Ticket(s)</h3>
        <h5>{job} {labor} {isComplete}</h5>
        {/* Compare the signed in user's ID against the owner of this car */}
        {user._id === owner && (
          <>
            <Button onClick={this.handleDelete}>Delete</Button>
            {/* Button with a Link inside should work but is ugly. Better way below. */}
            {/* <Button><Link to={`/cars/${match.params.id}/edit`}>Update</Link></Button> */}
            {/* Provide the Button a `onClick` handler & use the history object to redirect the user */}
            <Button onClick={() => history.push(`/tickets/${match.params.carId}/${match.params.ticketId}/edit`)}>
              Update
            </Button>
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowTicket)
