import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { showCars, destroyCar } from '../../api/cars'
// import { addTicket } from '../../api/tickets'
import Button from 'react-bootstrap/Button'

class ShowCars extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our ShowCars component
      car: null,
      ticket: null
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
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
      // Redirect to the list of cars
      .then(() => history.push('/cars'))
      .then(() => msgAlert({ heading: 'Deleted car successfully', message: 'car is no more', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Delete car failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  render () {
    if (this.state.car === null) {
      return 'Loading...'
    }

    // Get the owner (a user id) from the car state
    const { year, make, model, owner } = this.state.car
    const { history, match, user } = this.props

    return (
      <>
        <h3>Vehicle Ticket(s)</h3>
        <h5>{year} {make} {model}</h5>
        <p>This is where my tickets should be seen</p>
        {/* Compare the signed in user's ID against the owner of this car */}
        {user._id === owner && (
          <>
            <Button onClick={() => history.push(`/add-tickets/${match.params.id}`)}>Add Ticket</Button>
            <Button onClick={this.handleDelete}>Delete</Button>
            {/* Button with a Link inside should work but is ugly. Better way below. */}
            {/* <Button><Link to={`/cars/${match.params.id}/edit`}>Update</Link></Button> */}
            {/* Provide the Button a `onClick` handler & use the history object to redirect the user */}
            <Button onClick={() => history.push(`/cars/${match.params.id}/edit`)}>
              Update
            </Button>
          </>
        )}
      </>
    )
  }
}

export default withRouter(ShowCars)
