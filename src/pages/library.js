import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Library = ({ data }) => {
  const dataHld = data.allFiles.nodes
  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = (event) => {
    const query = event.target.value

    const posts = data.allFiles.nodes.map((item) => {
      return Object.entries(item).map(([key, value]) => {
        return value.map((image) => {
          return image
        })
      })
    })

    const filteredData = posts.map((imageArr) => {
      return imageArr.map((item) => {
        return Object.entries(item).filter(([key, value]) => {
          return value.description.toLowerCase().includes(query.toLowerCase())
        })
      })
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : dataHld

  return (
    <Layout>
      <div className="bg-black">
        <div className="container py-12 lg:py-16">
          <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0 lg:mx-12">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl mb-6">
              Library
            </h1>
            <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-400 sm:text-2xl">
              Search for a photo
            </h2>
            <div className="mt-4">
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text"
                onChange={handleInputChange}
                placeholder="Photo Search"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 lg:mx-6">
            {posts.map((item) => {
              return Object.entries(item).map(([key, value]) => {
                return value.map((image, index) => {
                  const nikonImage = getImage(image)
                  const filteredImage = getImage(image[1])
                  return (
                    <div
                      key={index}
                      className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-6"
                    >
                      <div className="bg-white hover:bg-blue-800 hover:text-white h-full shadow-sm hover:shadow-xl rounded-md overflow-hidden group">
                        <GatsbyImage
                          image={!hasSearchResults ? nikonImage : filteredImage}
                          alt={
                            !hasSearchResults
                              ? image.description
                              : image[1].description
                          }
                        />
                        <div className="text-center text-base font-roboto px-2 py-4">
                          {!hasSearchResults
                            ? image.description
                            : hasSearchResults
                            ? image[1].description
                            : "No Caption"}
                        </div>
                      </div>
                    </div>
                  )
                })
              })
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Library

export const query = graphql`
  query LibraryQuery {
    allFiles: allContentfulPortfolio(sort: { fields: gallery___title }) {
      nodes {
        gallery {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 480
            height: 342
            placeholder: BLURRED
          )
          title
          description
        }
      }
    }
  }
`
