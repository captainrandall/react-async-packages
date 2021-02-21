import React from 'react'

import {
  AsyncPackages,
  withAsyncPackages,
  defineAsyncPackages
} from 'react-cdn-provider'

defineAsyncPackages({
  global: {},
  ng: {
    url:
      'https://cdnjs.cloudflare.com/ajax/libs/angular/11.2.0/core.umd.min.js',
    nativeAlias: 'ng'
  },
  vue: {
    url: 'https://cdn.jsdelivr.net/npm/vue@2.6.12',
    nativeAlias: 'Vue',
    attributes: {
      module: true
    }
  }
})

class App extends React.Component {
  render() {
    const { ng } = this.props
    console.log({ ng })
    return (
      <AsyncPackages packages={['vue']} placeholder={<div> </div>}>
        {({ vue }) => <div>asdf {console.log({ vue })}</div>}
      </AsyncPackages>
    )
  }
}

export default withAsyncPackages(['ng'], App)
