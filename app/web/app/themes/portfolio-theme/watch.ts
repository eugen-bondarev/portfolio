import browserSync from 'browser-sync'
import webpack, { HotModuleReplacementPlugin } from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// @ts-ignore
import getConfig from './webpack.config.ts'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import removePlugin from './scripts/build/removePlugin'
import overrideRule from './scripts/build/overrideRule'
import isBabelLoader from './scripts/build/isBabelLoader'

const prependHmrClient = (
  entry: Record<string, string>
): Record<string, string[]> =>
  Object.keys(entry).reduce(
    (acc, key) => ({
      ...acc,
      [key]: ['webpack-hot-middleware/client', entry[key]],
    }),
    {}
  )

const webpackConfig = getConfig()

webpackConfig.mode = 'development'
webpackConfig.output.pathinfo = true
webpackConfig.plugins.push(new HotModuleReplacementPlugin())
webpackConfig.plugins.push(new ReactRefreshWebpackPlugin())
webpackConfig.entry = prependHmrClient(webpackConfig.entry)
webpackConfig.plugins = removePlugin(
  webpackConfig.plugins,
  'CleanWebpackPlugin'
)
webpackConfig.module.rules = overrideRule(
  webpackConfig.module.rules,
  isBabelLoader,
  (currentRule: any) => {
    const [currentUse, ...rest] = currentRule.use
    return {
      ...currentRule,
      use: [
        {
          ...currentUse,
          options: {
            ...currentUse.options,
            plugins: [
              ...(currentUse.plugins || []),
              require.resolve('react-refresh/babel'),
            ],
          },
        },
        ...rest,
      ],
    }
  }
)

const bundler = webpack(webpackConfig)

browserSync({
  host: '192.168.178.88',
  port: 3000,
  open: false,
  proxy: {
    // target: 'http://localhost',
    target: 'https://neatnest.de',

    middleware: [
      webpackDevMiddleware(bundler),
      webpackHotMiddleware(bundler),
    ] as any,
  },
  files: ['src/**/*.php', 'src/**/*.twig'],
})
