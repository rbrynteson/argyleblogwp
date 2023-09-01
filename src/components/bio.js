/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Bio = () => {
  const { author } = useStaticQuery(graphql`
    query BioQuery {
      # if there was more than one user, this would need to be filtered
      author: wpUser {
        firstName
        twitter: name
        description
        avatar {
          url
        }
      }
    }
  `)

  const avatarUrl = author?.avatar?.url

  return (
    <div className="bio">
      <img
          alt='Richard Brynteson'
          className="bio-avatar"
          src='https://media.licdn.com/dms/image/C4E03AQG2KfNf6GQBiA/profile-displayphoto-shrink_200_200/0/1565024081135?e=1698883200&v=beta&t=J7qrMgUMr_l0TQ7FLpcYPnKtHm90keQlsBUTLZRG2TI'
        />
        <p>
          <strong>Written by Richard Brynteson</strong>&nbsp;
          Office Apps & Services MVP
          <br />
          <a href={`https://twitter.com/rbrynteson`}>
              Follow on Twitter
          </a>
        </p>
    </div>
  )
}

export default Bio
