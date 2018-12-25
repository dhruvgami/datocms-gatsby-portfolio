const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: festival }) => {
        createPage({
          path: `festivals/${festival.slug}`,
          component: path.resolve(`./src/templates/festival.js`),
          context: {
            slug: festival.slug,
          },
        })
      })
      resolve()
    })
  })
}
