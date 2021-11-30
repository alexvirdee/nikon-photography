import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Library = ({ data }) => {
  return (
    <Layout>
      <div className="container bg-black py-12 lg:py-16">
        <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0 lg:mx-12">
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl mb-6">
            Library
          </h1>
          <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-400 sm:text-2xl">
            Search for a photo
          </h2>
        </div>
        <div className="flex flex-wrap -mx-3 lg:mx-6">
          {data.allFiles.nodes.map((item) => {
            return Object.entries(item).map(([key, value]) => {
              return value.map((image, index) => {
                const nikonImage = getImage(image)
                return (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-6"
                  >
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
            width: 480
            height: 342
            placeholder: BLURRED
          )
          description
        }
      }
    }
  }
`
