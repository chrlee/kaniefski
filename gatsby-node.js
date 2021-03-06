const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx')
    const pageTemplate = path.resolve('./src/templates/page-template.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                layout
                category
              }
            }
          }
        }
      }
    `).then(result => {
      if (result.error) {
        console.log(result.errors)
        reject(result.errors)
      }

      _.each(result.data.allMarkdownRemark.edges, edge => {
        if (_.get(edge, 'node.frontmatter.layout') === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug },
          })
        }
      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)
    let slug = fileNode.fields.slug
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}
