import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

class ContactRoute extends React.Component {
  render() {
    const { title } = this.props.data.site.siteMetadata

    return (
      <Layout>
        <div>
          <Helmet title={`Contact Me - ${title}`} />
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">Contact</h1>
                <div className="page__body">
                  <div className="categories">
                    <form name="contact" method="POST" data-netlify="true">
                      <p>
                        <label>Name <br /><input type="text" name="name" /></label>
                      </p>
                      <p>
                        <label>Email <br /><input type="email" name="email" /></label>
                      </p>
                      <p>
                        <label>Message <br /><textarea name="message"></textarea></label>
                      </p>
                      <p>
                        <button type="submit">Send</button>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactRoute

export const pageQuery = graphql`
  query CategoryesQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          collection
          path
        }
        author {
          name
          email
          instagram
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
