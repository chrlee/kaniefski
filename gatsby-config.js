const lost = require('lost')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://jameskaniefski.com',
    title: 'James Kaniefski',
    subtitle:
      'James Kaniefski is an American fashion designer whose work explores the history, culture, and clothing of the southern United States. Born in Southwest Virginia and raised on a rural farm, James views his native region through the thematic and tonal lens of Southern Gothic literature. He takes inspiration from the contradictory and multifaceted nature of the region, acknowledging both its significant beauty and its many issues. His designs investigate the lives of people who are rarely considered relevant in fashion discourse such as farmers, truckers, hunters, and preachers. His design practice revolves around patternmaking, viewing construction and detailing as the most important symbolic language in fashion design.',
    copyright: 'Copyright © James Kaniefski 2019. All rights reserved. Site by Christian Lee.',
    disqusShortname: '',
    menu: [
      {
        label: 'Fall 2019',
        collection: 'Husks',
        path: '/',
      },
      {
        label: 'Spring 2019',
        collection: 'Meridian',
        path: '/meridian/',
      },
      {
        label: 'About / CV',
        collection: '',
        path: '/about/',
      },
      {
        label: 'Contact',
        collection: '',
        path: '/contact/',
      },
    ],
    author: {
      name: 'JAMES KANIEFSKI',
      email: '#',
      instagram: 'jameskaniefski',
      telegram: '#',
      twitter: '#',
      github: '#',
      rss: '#',
      vk: '#',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static`,
        name: 'img',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
                title
                description: subtitle
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              ),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        layout
                        draft
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-images-anywhere',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto:400,400i,500,700'],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(
                filter: {
                  path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: 'daily',
              priority: 0.7,
            }
          }),
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
  ],
}
