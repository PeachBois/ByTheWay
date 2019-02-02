import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase/index'
import { compose } from 'recompose'
import { me, logout } from '../store/user'
import { setRadius, setCap } from '../store/posts'

class ChangeName extends Component {
  constructor () {
    super()
    this.state = {
      displayName: '',
      radius: 4,
      roomCap: 2
    }
  }
  componentDidMount () {
    this.setState({ displayName: this.props.user.username })
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    if (this.state.displayName !== '') {
      this.props.me({
        username: this.state.displayName,
        roles: this.props.user.rules,
        imgUrl: this.props.user.imgUrl,
        email: this.props.user.email
      })
      this.props.setRadius(this.state.radius)
      this.props.setCap(this.state.roomCap)
      console.log('done')
    }
    this.props.history.push('/locating')
  }

  render () {
    if (!this.props.user.imgUrl) {
      this.props.history.push('/')
    }

    let { displayName } = this.state
    const { imgUrl } = this.props.user
    return (
      <div className='box'>
        <div className='title'>
          <p className='title'>ALOL</p>
          <button
            onClick={async () => {
              await this.props.logout()
              this.props.history.push('/')
            }}
          >
            X
          </button>
        </div>
        <div className='body'>
          <div className='userSpace'>
            <img src={imgUrl} className='userImg' />

            <div className='changeName'>
              <p className='title'>Set A Display Name</p>
              <input
                type='text'
                value={displayName}
                name='displayName'
                onChange={this.handleChange}
              />
              <div className='apart'>
                <p className='title'>Search Threshold:</p>

                <select
                  name='radius'
                  className='input'
                  value={this.state.radius}
                  onChange={this.handleChange}
                >
                  <option value='1'>1 (largest search area)</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8 (smallest search area) </option>
                </select>
              </div>
              <div className='apart'>
                <p className='title'>Max Users:</p>
                <select
                  name='roomCap'
                  className='input'
                  value={this.state.roomCap}
                  onChange={this.handleChange}
                >
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='bottomBar'>
          <img src='computer.png' className='bottomBar' />
          <div className='change'>
            <button type='submit' onClick={this.handleSubmit}>
              Login
            </button>
          </div>
        </div>
        <div className='body'>
          <h4 className='log'>
            >:Here you can change your display name, as well as how many people
            you want in a chat and how exact your search area is!
          </h4>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return { user: state.user }
}

const mapDispatch = dispatch => {
  return {
    me: name => dispatch(me(name)),
    setRadius: radius => dispatch(setRadius(radius)),
    setCap: cap => dispatch(setCap(cap)),
    logout: () => dispatch(logout())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
const MessageBoxConnect = compose(
  withRouter,
  withFirebase,
  connect(
    mapState,
    mapDispatch
  )
)

export default MessageBoxConnect(ChangeName)

/**
 * PROP TYPES
 */
