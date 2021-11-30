import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Gallery = ({ data }) => {
  return (
    <Layout>
      <div className="container bg-black py-12 lg:py-16">
        {data.allFiles.nodes.map((item) => {
          return Object.entries(item).map(([key, value]) => {
            return value.map((image, index) => {
              const nikonImage = getImage(image)
              console.log(nikonImage)
              return (
                <>
                  <GatsbyImage image={nikonImage} alt={image.description} />
                  <div className="text-white">{image.description ? image.description : ""}</div>
                </>
              )
            })
          })
        })}
      </div>
    </Layout>
  )
}

export default Gallery

export const query = graphql`
  query GalleryQuery {
    allFiles: allContentfulPortfolio {
      nodes {
        gallery {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 650
            height: 400
            placeholder: BLURRED
          )
          description
        }
      }
    }
  }
`
