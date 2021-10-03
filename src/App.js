/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// Import individual custom components from our components directory
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
// Import Auth components
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
// Import our Cars components
import AddCar from './components/cars/AddCar'
import IndexCars from './components/cars/IndexCars'
import ShowCars from './components/cars/ShowCars'
import UpdateCar from './components/cars/UpdateCar'
// Import our Tickets components
import AddTicket from './components/tickets/AddTicket'
import ShowTicket from './components/tickets/ShowTicket'
import IndexTickets from './components/tickets/IndexTickets'
import UpdateTicket from './components/tickets/UpdateTicket'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      const newMsgAlert = { heading, message, variant, id }
      return {
        msgAlerts: [...state.msgAlerts, newMsgAlert]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
	      <Header user={user} />
	      {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
	      <main className='container'>
	        <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/add-cars'
            render={() => (
              <AddCar msgAlert={this.msgAlert} user={user}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/cars'
            render={() =>
              <IndexCars msgAlert={this.msgAlert} user={user}/>}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/cars/:id'
            render={() => (
              <ShowCars user={user} msgAlert={this.msgAlert}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/cars/:id/edit'
            render={() => (
              <UpdateCar user={user} msgAlert={this.msgAlert}/>
            )}
          />
          {/* paths dont have to match the backend naming convention could be /donuts/:carId and it wouldn't make a difference */}
          <AuthenticatedRoute
            user={user}
            path='/add-tickets/:carId'
            render={() => (
              <AddTicket msgAlert={this.msgAlert} user={user}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/tickets'
            render={() => (
              <IndexTickets user={user} msgAlert={this.msgAlert}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/tickets/:carId/:ticketId'
            render={() => (
              <ShowTicket user={user} msgAlert={this.msgAlert}/>
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/tickets/:carId/:ticketId/edit'
            render={() => (
              <UpdateTicket user={user} msgAlert={this.msgAlert}/>
            )}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
