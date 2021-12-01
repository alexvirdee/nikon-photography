import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import MenuMobile from "./MenuMobile"
import { FaBars } from "react-icons/fa"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { site } = useStaticQuery(graphql`
    query {
      site {
        data: siteMetadata {
          menu {
            name
            to
          }
        }
      }
    }
  `)

  return (
    <div className="container pt-6 pb-12 md:pt-12">
      <div className="flex justify-between items-center">
        <Link to="/">
          <StaticImage
            width={60}
            height={60}
            src="../images/logo.png"
            placeholder="blurred"
            alt="logo"
          />
        </Link>

        <button
          className="sm:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <FaBars className="h-6 w-auto text-gray-900 fill-current -mt-1" />
        </button>

        <div className="hidden sm:block">
          {site.data.menu.map((link, key) => (
            <Link
              key={`menu_desktop_link${key}`}
              className="ml-6 sm:ml-8 text-sm sm:text-base font-medium px-px border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-blue-200 transition duration-150 ease-in-out"
              activeClassName="border-blue-600 text-gray-900 hover:border-blue-600"
              to={link.to}
            >
              {link.name}
            </Link>
          ))}
          <a
            className="ml-6 sm:ml-8 text-sm sm:text-base font-medium px-px border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-blue-200 transition duration-150 ease-in-out"
            href="http://www.alexvirdee.com/"
          >
            Portfolio
          </a>
          <a
            className="ml-6 sm:ml-8 text-sm sm:text-base font-medium px-px border-b-2 pb-2 border-transparent text-gray-700 hover:text-gray-800 hover:border-blue-200 transition duration-150 ease-in-out"
            href="https://alexvirdee-blog.netlify.app/"
          >
            Blog
          </a>
        </div>
      </div>
      <MenuMobile
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        links={site.data.menu}
      />
    </div>
  )
}

export default Header
