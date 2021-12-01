import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Library = ({ data }) => {
  console.log(data)
  let dataHld = data;

  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = (event) => {
    const query = event.target.value

    console.log("Query", query);

    const images = data.allFiles.nodes.map((item) => {
      return Object.entries(item).map(([key, value]) => {
        return value.map((image) => {
          return image
        })
      })
    })

    console.log("Log the post arrays", images)

    const filteredData = images.forEach((imageArr) => {
      console.log("Image array", imageArr)
      imageArr.forEach((item) => {
        console.log("Item", item)
        Object.entries(item).filter(([key, value]) => {
          console.log("Value", value)
          console.log("Description", value.description)
          let match = value.description.toLowerCase().includes(query.toLowerCase())
          console.log("match", match)
          return match
          return value.description.toLowerCase().includes(query.toLowerCase())
        })
      })
    })

    console.log("filtered data", filteredData)

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery

  dataHld = hasSearchResults ? filteredData : dataHld

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
          <div className="mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              onChange={handleInputChange}
              placeholder="Photo Search"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 lg:mx-6">
          {dataHld.allFiles.nodes.map((item) => {
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
    allFiles: allContentfulPortfolio(sort: {fields: gallery___title}) {
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
