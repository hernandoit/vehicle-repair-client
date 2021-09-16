// Reminder: Don't forget to render this component in a route (or AuthenticatedRoute) in App.js

// Imports:
// - React, Component
import React, { Component } from 'react'
// - Link
import { Link } from 'react-router-dom'
// - indexCars (or something) (api function)
import { indexCars } from '../../api/cars'
// - optional messages

// Create a new class inherits from Component
class IndexCars extends Component {
  // - constructor (set up initial state)
  constructor (props) {
    super(props)

    this.state = {
      cars: null
    }
  }

  // - lifecycle method (right away when this component renders, make a request for all the cars & put em in state)
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexCars(user)
      .then(res => this.setState({ cars: res.data.cars }))
      .then(() => msgAlert({ heading: 'Index success', message: 'Here\'s the cars', variant: 'success' }))
      .catch(err => msgAlert({ heading: 'Index failed :(', message: 'Something went wrong: ' + err.message, variant: 'danger' }))
  }

  // - render - display the cars in the state (optionally: loading message)
  render () {
    const { cars } = this.state
    // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `cars` state will be `null`
    if (cars === null) {
      return 'Loading...'
    }

    let carJsx
    if (cars.length === 0) {
      carJsx = 'No cars, go create some'
    } else {
      // I want carJsx to be a bunch of li or Link or something with all my cars info in them
      // .map gives us back a new array that we can display
      carJsx = cars.map(car => (
        <li key={car._id}>
          <Link to={`/cars/${car._id}`}>
            {car.year} {car.make} {car.model}
          </Link>
        </li>
      ))
    }

    return (
      <>
        <h3>All The Cars:</h3>
        {carJsx}
      </>
    )
  }
}

export default IndexCars
