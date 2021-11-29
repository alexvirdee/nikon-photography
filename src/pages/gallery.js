import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../layouts/Layout"

const Gallery = ({ data }) => {
  //   console.log("Gallery Data: ", data)
  return (
    <Layout>
      <div className="border-solid border-4 border-blue-600">
        <div className="text-lg text-blue-600 text-center">All Images</div>
        {data.allFiles.nodes.map((item) => {
          Object.entries(item).map(([key, value]) => {
            value.map((image) => {
              console.log("Individual image", image)
              return (
                <>
                  <GatsbyImage
                    image={image.gatsbyImageData}
                    alt={image.description}
                  />
                </>
              )
            })
          })
        })}
        {/* {Object.entries(data).map(([key, value]) => {
           console.log(key)
       })} */}
        {/* {data.allFiles.nodes.map((item) => {
          // console.log("item: ", item)
          Object.keys(item).map((images) => {
            // console.log(item[images])
            item[images].map((image, index) => {
              console.log("Individual image", image)
              return (
                <>
                  <div>Individual Image</div>
                  <GatsbyImage
                    image={image.gatsbyImageData}
                    alt={image.description}
                  />
                </>
              )
            })
          })
        })} */}
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
          gatsbyImageData(layout: CONSTRAINED)
          description
        }
      }
    }
  }
`
