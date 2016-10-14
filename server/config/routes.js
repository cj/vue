process.env.VUE_ENV = 'server'

const express = require('express')
const fs = require('fs')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
const serialize = require('serialize-javascript')

const isProd = process.env.NODE_ENV === 'production'

function createRenderer(bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

module.exports = (app, production) => {
  const router = new express.Router()

  // setup the server renderer, depending on dev/prod environment
  let renderer
  let setup
  if (isProd) {
    // create server renderer from real fs
    const bundlePath = resolve('../../dist/server-bundle.js')
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))
  }
  else {
    setup = require('../../build/setup-dev-server')
    setup.devServer(app, bundle => {
      renderer = createRenderer(bundle)
    })
  }

  let html

  router.all('*', (req, res) => {
    // parse index.html template
    html ? html : html = (() => {
      const template = isProd ? fs.readFileSync(resolve('./index.html'), 'utf-8') : setup.webpackMiddleware.fileSystem.readFileSync(path.join(__dirname, '../../dist/index.html'))
      const i = template.indexOf('<div id="app"></div>')
      // styles are injected dynamically via vue-style-loader in development
      return {
        head: template.slice(0, i),
        tail: template.slice(i + '<div id="app"></div>'.length)
      }
    })()

    // var s = Date.now()
    const context = { url: req.url }
    const renderStream = renderer.renderToStream(context)
    let firstChunk = true

    res.type('html')

    if (production && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`)
    }
    else {
      if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
      }

      res.write(html.head)

      renderStream.on('data', chunk => {
        if (firstChunk) {
          // embed initial store state
          if (context.initialState) {
            res.write(
              `<script>window.__INITIAL_STATE__=${
                serialize(context.initialState, { isJSON: true })
              }</script>`
            )
          }
          firstChunk = false
        }
        res.write(chunk)
      })

      renderStream.on('end', () => {
        res.end(html.tail)
        // console.log(`whole request: ${Date.now() - s}ms`)
      })

      renderStream.on('error', err => {
        throw err
      })
    }
  })

  app.use(router);
};
