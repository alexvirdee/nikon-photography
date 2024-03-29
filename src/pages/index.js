import React from "react"
import { graphql } from "gatsby"
import Cards from "../components/Cards"
import Hero from "../components/Hero"
import Layout from "../layouts/Layout"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SiteMetadata title="Home" description="Portfolio of Alex Virdee" />
      <Hero />
      <div className="bg-black py-12 lg:py-16">
        {data.portfolio && data.portfolio.nodes.length > 0 ? (
          <Cards items={data.portfolio.nodes} />
        ) : (
          <div className="container">No projects found.</div>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    portfolio: allContentfulPortfolio {
      nodes {
        ...PortfolioCard
      }
    }
  }
`
