equire("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Digital Fortress`,
    description: `Now test your investigation skills and compete with your friends.`,
    author: `@romitkarmakar`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: '',
        protocol: "https",
        hostname: "",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true,
      },
    },
    `gatsby-plugin-offline`
  ],
}
