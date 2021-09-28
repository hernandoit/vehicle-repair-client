import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TicketForm = ({ ticket, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='job'>
      <Form.Label>Job</Form.Label>
      <Form.Control
        required
        name='job'
        value={ticket.job}
        placeholder='Job'
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId='labor'>
      <Form.Label>Labor</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='labor'
        value={ticket.labor}
        placeholder='Labor'
      />
    </Form.Group>
    <Form.Group controlId='isComplete'>
      <Form.Label>Completed</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='isCompleted'
        value={ticket.isComplete}
        placeholder='Completed'
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>

)

export default TicketForm
