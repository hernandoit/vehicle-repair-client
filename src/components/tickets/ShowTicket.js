// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// // API request
// import { showTicket, destroyTicket } from '../../api/tickets'

// import Button from 'react-bootstrap/Button'

// class ShowTicket extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       ticket: null
//     }
//   }

//   componentDidMount () {
//     const { ticket } = this.props
//     this.setState({ ticket: ticket })
//     console.log(ticket)
//   }

// handleUpdate = () => {
//   const { user, msgAlert, history, match } = this.props
//   updateTicket(this.state.ticket, match.params.carId, user, this.state.ticket._id)
//     .then(() => history.push('/'))
//     .then(() => history.push(match.url))
//     .then(() => msgAlert({
//       heading: 'Show Ticket success',
//       message: 'Check out the ticket',
//       variant: 'success'
//     }))
//     .catch(err => msgAlert({
//       heading: 'Show ticket failed :(',
//       message: 'Something went wrong: ' + err.message,
//       variant: 'danger'
//     }))
// }

// handleDelete = (event) => {
//   const { match, user, history, msgAlert } = this.props // msgAlert
//   destroyTicket(match.params.carId, user, match.params.ticketId)
//     // Redirect to the index of lists
//     .then(() => history.push('/'))
//     .then(() => history.push(match.url))
//     .then(() => msgAlert({ heading: 'Deleted ticket successfully', message: 'ticket is no more', varant: 'success' }))
//     .catch(err => msgAlert({ heading: 'Delete ticket failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
// }

// render () {
//   if (this.state.ticket === null) {
//     return 'Loading...'
//   }

//   const { history, match, job, labor, isComplete } = this.props
//   return (
//     <>
//       <h1>Ticket</h1>
//       <p>Job: {job}</p>
//       <p>Labor: {labor}</p>
//       <p>Completed: {'' + isComplete}</p>
//       <Button onClick={this.handleDelete}>Delete Ticket</Button>
//       <Button onClick={() =>
//         history.push(`/tickets/${match.params.carId}/${match.params.ticketId}`)}>Update Ticket</Button>
//     </>
//   )
// }
// }

// export default withRouter(ShowTicket)
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showTicket, destroyTicket } from '../../api/tickets'

import Button from 'react-bootstrap/Button'

class ShowTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticket: null
    }
  }

  componentDidMount () {
    const { match, user, msgAlert } = this.props
    showTicket(match.params.carId, match.params.ticketId, user)
      .then(res => this.setState({ ticket: res.data.ticket }))
      .then(() => msgAlert({
        heading: 'Show ticket success',
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
    destroyTicket(match.params.carId, match.params.ticketId, user)
      .then(() => history.push('/tickets'))
      .then(() => msgAlert({ heading: 'Deleted car successfully', message: 'car is no more', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Delete car failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  render () {
    if (this.state.ticket === null) {
      return 'Loading...'
    }

    const { history, match } = this.props

    return (
      <>
        <div>
          <Button onClick={this.handleDelete}>Delete Vehicle</Button>
          <Button onClick={() => history.push(`/tickets/${match.params.carId}/${match.params.ticketId}/edit`)}>Update Vehicle</Button>
          <Button onClick={() => history.push(`/add-tickets/${match.params.id}`)}>Add Ticket</Button>
        </div>
      </>
    )
  }
}

export default withRouter(ShowTicket)
