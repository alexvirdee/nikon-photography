import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../layouts/Layout"
import SiteMetadata from "../components/SiteMetadata"

const AboutPage = ({ data }) => (
  <Layout>
    <SiteMetadata title="About" description="Sample description" />

    <div className="bg-black">
      <div className="container py-12 lg:pb-16">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl mb-6">
              About Me
            </h1>

            <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-400 sm:text-2xl">
              Fort Lauderdale based software developer & photography enthusiast.
            </h2>
            <div className="mt-4 leading-loose text-gray-200">
              Welcome to my photography website! I tend to travel quite often so I figured it would be a good idea to build a website that I can consistently add my favorite photographs that I take from my travels. Feel free to download & share <span role="img" aria-label="sunglass-emoji">😎</span>
              <div className="mb-6"></div>
              <div className="font-bold text-lg">My Gear:</div>
              <ul>
                <li>Camera: Nikon D810</li>
                <li>Telephoto: Tamron 70-200mm</li>
                <li>Wide Angle: Nikkor 20mm prime</li>
                <li>Portrait: Nikkor 50mm prime</li>
                <li>Tripod: Zomei Q111</li>
                <li>Flash: Altura Photo</li>
              </ul>
              <br />
              <br />
              I'm happy to hear from you:
              <br />
              <a
                href="mailto:alex.virdee08@gmail.com"
                className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
              >
                contact@alexvirdee.com
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-2/5 md:pl-12">
            <GatsbyImage
              image={data.author.childImageSharp.gatsbyImageData}
              alt="Alex Virdee"
              className="rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default AboutPage

export const query = graphql`
  query {
    author: file(relativePath: { eq: "keys-about.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, width: 600, height: 480, placeholder: BLURRED)
      }
    }
  }
`
