import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'

import * as Colors from './colors'
import * as Images from './images'

class Theme extends Component {
  state = {
    primary: Colors.PRIMARY1
  }

  _switchTheme = (type) => {
    this.setState({
      primary: type === 1 ? Colors.PRIMARY1 : type === 2 ? Colors.PRIMARY2 : Colors.PRIMARY3
    })
  }

  render() {
    const { children } = this.props
    const theme = {
      ...this.state,
      switchTheme: this._switchTheme
    }

    return (
      <ThemeProvider theme={theme}>
          {children}
      </ThemeProvider>
    )
  }
}

export {
  Colors,
  Images
}

export default Theme
