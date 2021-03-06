import React from 'react'
import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default ({ data }) => (
  <article className="sheet">
    <HelmetDatoCms seo={data.datoCmsFestival.seoMetaTags} />
    <div className="sheet__inner">
      <h1 className="sheet__title">{data.datoCmsFestival.title}</h1>
      <p className="sheet__lead">{data.datoCmsFestival.excerpt}</p>
      <div className="sheet__slider">
        <Slider infinite={true} slidesToShow={2} arrows>
          {data.datoCmsFestival.gallery.map(({ resize }) => (
            <img key={resize.src} src={resize.src} />
          ))}
        </Slider>
      </div>
      <div
        className="sheet__body"
        dangerouslySetInnerHTML={{
          __html: data.datoCmsFestival.descriptionNode.childMarkdownRemark.html,
        }}
      />
      <div className="sheet__gallery">
        <Img sizes={data.datoCmsFestival.coverImage.sizes} />
      </div>
    </div>
  </article>
)

export const query = graphql`
  query FestivalQuery($slug: String!) {
    datoCmsFestival(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        resize(height: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
