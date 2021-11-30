import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Library = ({ data }) => {
  return (
    <Layout>
      <div className="container bg-black py-12 lg:py-16">
        <div className="flex flex-wrap -mx-3 lg:mx-6">
          {data.allFiles.nodes.map((item) => {
            return Object.entries(item).map(([key, value]) => {
              return value.map((image, index) => {
                const nikonImage = getImage(image)
                return (
                  <div className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-6">
                    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden group hover:border-blue-600">
                      <GatsbyImage image={nikonImage} alt={image.description} />
                      <div className="text-black text-center text-base px-2 py-4">
                        {image.description ? image.description : "No Caption"}
                      </div>
                    </div>
                  </div>
                )
              })
            })
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Library

export const query = graphql`
  query LibraryQuery {
    allFiles: allContentfulPortfolio {
      nodes {
        gallery {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 395
            height: 300
            placeholder: BLURRED
          )
          description
        }
      }
    }
  }
`
