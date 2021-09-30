// Reminder: Don't forget to render this component in a route (or AuthenticatedRoute) in App.js

// Imports:
// - React, Component
import React, { Component } from 'react'
// - Link
import { Link } from 'react-router-dom'
// - indexCars (or something) (api function)
import { indexTickets } from '../../api/tickets'

// Create a new class inherits from Component
class IndexCars extends Component {
  // - constructor (set up initial state)
  constructor (props) {
    super(props)

    this.state = {
      tickets: null
    }
  }

  // - lifecycle method (right away when this component renders, make a request for all the cars & put em in state)
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexTickets(user)
      .then(res => this.setState({ tickets: res.data.tickets }))
      .then(() => msgAlert({ heading: 'Index success', message: 'Here\'s the tickets', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Index failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  // - render - display the tickets in the state (optionally: loading message)
  render () {
    const { tickets } = this.state
    // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `tickets` state will be `null`
    if (tickets === null) {
      return 'Loading...'
    }

    let ticketJsx
    if (tickets.length === 0) {
      ticketJsx = 'No tickets, go add some'
    } else {
      // I want ticketJsx to be a bunch of li or Link or something with all my tickets info in them
      // .map gives us back a new array that we can display
      ticketJsx = tickets.map(ticket => (
        <li key={ticket._id}>
          <Link to={`/tickets/${ticket._id}`}>
            {ticket.job} {ticket.labor} {ticket.isComplete}
          </Link>
        </li>
      ))
    }

    return (
      <>
        <h3>My Tickets</h3>
        {ticketJsx}
      </>
    )
  }
}

export default IndexCars
