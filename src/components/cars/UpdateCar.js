import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// API request
import { updateCar, showCars } from '../../api/cars'
import CarForm from '../shared/CarForm'

class UpdateItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // using null as a starting value will help us manage the "loading state" of our UpdateItem component
      car: { // this should not be null
        year: null, // must provide starting values for the form inputs
        make: '',
        model: ''
      }
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

  handleChange = (event) => {
    // because `this.state.car` is an object with multiple keys, we have to do some fancy updating
    const userInput = { [event.target.name]: event.target.value }
    this.setState(currState => {
      // "Spread" out current car state key/value pairs, then add the new one at the end
      // this will override the old key/value pair in the state but leave the others untouched
      return { car: { ...currState.car, ...userInput } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, match } = this.props

    updateCar(this.state.car, match.params.id, user)
      .then(res => history.push('/Cars/' + match.params.id))
      .then(() => msgAlert({ heading: 'car Updated!', message: 'Nice work, go check out your car.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'car update failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // if (this.state.car.quantity < 0) {
    //   updateItem.catch()
    // }

    return (
      <>
        <h3>Update One car Page</h3>
        <CarForm
          car={this.state.car}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    )
  }
}

export default withRouter(UpdateItem)
