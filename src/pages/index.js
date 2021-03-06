import React from 'react'
import Link from 'gatsby-link'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'


const IndexPage = ({ data }) => (
  <Masonry className="showcase">
    {data.allDatoCmsFestival.edges.map(({ node: festival }) => (
      <div key={festival.id} className="showcase__item">
        <figure className="card">
          <Link to={`/festivals/${festival.slug}`} className="card__image">
            <Img sizes={festival.coverImage.sizes} />
          </Link>
          <figcaption className="card__caption">
            <h6 className="card__title">
              <Link to={`/festivals/${festival.slug}`}>{festival.title}</Link>
            </h6>
            <div className="card__description">
              <p>{festival.excerpt}</p>
            </div>
          </figcaption>
        </figure>
      </div>
    ))}
  </Masonry>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsFestival(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            sizes(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
