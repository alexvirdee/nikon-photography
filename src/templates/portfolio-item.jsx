import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import SiteMetadata from "../components/SiteMetadata"
import Button from "../components/Button"
import Cards from "../components/Cards"
import Carousel from "../components/Carousel"
import Layout from "../layouts/Layout"

const PortfolioItem = (props) => {
  const { description, gallery, name, related, summary, thumbnail, url } =
    props.data.item

  return (
    <Layout>
      <SiteMetadata
        title={name}
        description={summary}
        image={thumbnail.localFile.publicURL}
      />
      <div className="bg-black py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-2/3 pb-8">
              {gallery && gallery.length === 1 && (
                <GatsbyImage image={gallery[0].gatsbyImageData} alt={name} />
              )}
              {gallery && gallery.length > 1 && <Carousel images={gallery} />}
            </div>
            <div className="w-full lg:w-1/3 lg:pl-8 xl:pl-12">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl mb-4">
                {name}
              </h1>
              <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
                {summary}
              </h2>
              {description && (
                <div className="my-4 text-base text-gray-100 whitespace-pre-line">
                  {description.description}
                </div>
              )}
              {url && (
                <div className="mt-8">
                  <Button href={url}>More info</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {related && (
        <div className="bg-gray-100 py-12 lg:py-16">
          <div className="container">
            <h2 className="text-3xl sm:text-4xl leading-tight font-extrabold tracking-tight text-gray-900 mb-8">
              You may also like
            </h2>
          </div>
          <Cards items={related} hideLastItemOnMobile={true} />
        </div>
      )}
    </Layout>
  )
}

export default PortfolioItem

export const query = graphql`
  query PortfolioItemQUery($slug: String!) {
    item: contentfulPortfolio(slug: { eq: $slug }) {
      description {
        description
      }
      gallery {
        id
        gatsbyImageData(width: 960, height: 650, placeholder: BLURRED)
        title
      }
      name
      related {
        ...PortfolioCard
      }
      summary
      thumbnail {
        localFile {
          publicURL
        }
      }
      url
    }
  }
`
