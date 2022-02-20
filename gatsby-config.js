/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

module.exports = {
    /**
     * Adding plugins to this array adds them to your Gatsby site.
     *
     * Gatsby has a rich ecosystem of plugins.
     * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
     */
    plugins: [
        {
            /**
             * First up is the WordPress source plugin that connects Gatsby
             * to your WordPress site.
             *
             * visit the plugin docs to learn more
             * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
             *
             */
            resolve: `gatsby-source-wordpress`,
            schema: {
                options: {
                    perPage: 20, // currently set to 100
                    requestConcurrency: 5, // currently set to 15
                    previewRequestConcurrency: 2, // currently set to 5
                },
            },
            options: {
                production: {
                    allow404Images: true,
                    allow401Images: true,
                },
                // the only required plugin option for WordPress is the GraphQL url.
                url:
                    process.env.WPGRAPHQL_URL ||
                    `https://masteringlync.com/graphql`,
            },
        },

        /**
         * We need this plugin so that it adds the "File.publicURL" to our site
         * It will allow us to access static url's for assets like PDF's
         *
         * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/content/assets`,
            },
        },

        `gatsby-plugin-styled-components`,

        /**
         * The following two plugins are required if you want to use Gatsby image
         * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
         * if you're curious about it.
         */
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-image`,
        {
            // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Gatsby Starter WordPress Blog`,
                short_name: `GatsbyJS & WP`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `content/assets/gatsby-icon.png`,
            },
        },

        // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
        `gatsby-plugin-react-helmet`,

        /**
         * this (optional) plugin enables Progressive Web App + Offline functionality
         * To learn more, visit: https://gatsby.dev/offline
         */
        // `gatsby-plugin-offline`,

        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "UA-19978686-5",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
                // Setting this parameter is optional
                anonymize: true,
                // Setting this parameter is also optional
                respectDNT: true,
                // Avoids sending pageview hits from custom paths
                exclude: ["/preview/**", "/do-not-track/me/too/"],
                // Delays sending pageview hits on route update (in milliseconds)
                pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                //-- optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // Enables Google Optimize Experiment ID
                //--experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                //--variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Defers execution of google analytics script after page load
                //--defer: false,
                // Any additional optional fields
                //--sampleRate: 5,
                //--siteSpeedSampleRate: 10,
                //--cookieDomain: "example.com",
            },
        },
    ],
};
