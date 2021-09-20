import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { addTicket } from '../../api/tickets'

import { withRouter } from 'react-router-dom'

class AddTicket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      job: '',
      labor: null,
      isComplete: null
    }
  }

  handleChange = (event) => {
    // the event.target of this event will be an input element
    // which will have a `name` attribute (key in the state) & a 'value' (what the user typed)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmmit = (event) => {
    event.preventDefault()

    const { user, msgAlert, history, match } = this.props
    addTicket(this.state, match.params.carId, user)
      .then(res => history.push('/cars/' + match.params.carId))
      .then(() => msgAlert({ heading: 'Ticket Assigned!', message: 'Your vehicle has been assigned a ticket.', variant: 'success' }))
      .catch(err => {
        msgAlert({
          heading: 'Assigning Ticket failed :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <>
        <p>This Cars year make and model</p>
        <Form onSubmit={this.handleSubmmit}>
          <Form.Group>
            <Form.Label>Job
            </Form.Label>
            <Form.Control
              required
              onChange={this.handleChange}
              name='job'
              value= {this.state.job}
              placeholder='Job'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Labor
            </Form.Label>
            <Form.Control
              required
              name='labor'
              onChange={this.handleChange}
              value= {this.state.labor}
              placeholder='Labor'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Completed
            </Form.Label>
            <Form.Control
              required
              name='isComplete'
              onChange={this.handleChange}
              value= {this.state.isComplete}
              placeholder='Completed'
            />
          </Form.Group>
          <Button type="submit">Add Ticket</Button>
        </Form>
      </>
    )
  }
}

export default withRouter(AddTicket)
