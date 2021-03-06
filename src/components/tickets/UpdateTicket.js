import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateTicket, showTicket } from '../../api/tickets'
import TicketForm from '../shared/CarForm'

class UpdateTicket extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our UpdateItem component
      ticket: { // this should not be null
        job: '', // must provide starting values for the form inputs
        labor: null,
        isComplete: null
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
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

  handleChange = (event) => {
    // because `this.state.car` is an object with multiple keys, we have to do some fancy updating
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current car state key/value pairs, then add the new one at the end
      // this will override the old key/value pair in the state but leave the others untouched
      return { ticket: { ...currState.ticket, ...userInput } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, match } = this.props
    console.log('this is carid', match.params.carId)
    updateTicket(this.state.ticket, match.params.carId, match.params.ticketId, user)
      .then(res => history.push('/tickets/' + match.params.carId + '/' + match.params.ticketId))
      .then(() => msgAlert({ heading: 'ticket Updated!', message: 'Nice work, go check out your ticket.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'ticket update failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <h3>Update your vehicles ticket info</h3>
        <TicketForm
          ticket={this.props.ticket}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    )
  }
}

export default withRouter(UpdateTicket)
