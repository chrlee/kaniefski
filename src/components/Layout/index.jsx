import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import favicon from './photo.jpg'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="James Kaniefski"
                link={[
                  { rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }
                ]}  />
        {children}
      </div>
    )
  }
}

export default Layout
