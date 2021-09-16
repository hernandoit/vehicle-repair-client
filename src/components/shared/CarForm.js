import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CarForm = ({ car, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='year'>
      <Form.Label>Year</Form.Label>
      <Form.Control
        required
        name='year'
        value={car.year}
        placeholder='Year'
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId='make'>
      <Form.Label>Make</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='make'
        value={car.make}
        placeholder='Make'
      />
    </Form.Group>
    <Form.Group controlId='model'>
      <Form.Label>Model</Form.Label>
      <Form.Control
        onChange={handleChange}
        required
        name='model'
        value={car.model}
        placeholder='Model'
      />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>

)

export default CarForm
