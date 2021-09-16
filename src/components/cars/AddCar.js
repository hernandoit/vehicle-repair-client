import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { addCar } from '../../api/cars'

import { withRouter } from 'react-router-dom'

class AddCar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      year: null,
      make: '',
      model: ''
    }
  }

  handleChange = (event) => {
    // the event.target of this event will be an input element
    // which will have a `name` attribute (key in the state) & a 'value' (what the user typed)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history } = this.props

    addCar(this.state, user)
      .then(res => history.push('/'))
      .then(() => msgAlert({ heading: 'Car Added!', message: 'Nice work, your vehicle has been added.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Adding Car failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <Form onSubmit={this.handleSubmmit}>
          <Form.Group>
            <Form.Label>Year
            </Form.Label>
            <Form.Control
              required
              onChange={this.handleChange}
              name='year'
              value= {this.state.year}
              placeholder='Year'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Make
            </Form.Label>
            <Form.Control
              required
              name='make'
              onChange={this.handleChange}
              value= {this.state.make}
              placeholder='Make'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Model
            </Form.Label>
            <Form.Control
              required
              name='model'
              onChange={this.handleChange}
              value= {this.state.model}
              placeholder='Model'
            />
          </Form.Group>
          <Button type="submit">Add Vehicle</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(AddCar)
