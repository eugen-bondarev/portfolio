const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const entry = {
  frontend: "./src/frontend/index.tsx",
  blocks: "./src/blocks/index.ts",
  tailwind: "./src/tailwind.scss",
};

const getConfig = () => ({
  ...defaultConfig,
  entry,
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
    chunkFilename: "[name]_[contenthash].js",
    // publicPath: `/wp-content/themes/theme-boilerplate/dist/`,
    publicPath: `/app/themes/portfolio-theme/dist/`, // NAME HERE IS IMPORTANT
  },
});

export default getConfig;
