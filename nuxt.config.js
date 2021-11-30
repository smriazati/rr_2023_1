export default {
  target: 'static',
  head: {
    titleTemplate: "%s | Roots of Resistance",
    title: 'Roots of Resistance',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Roots of Resistance: The Tuchyn Story teaches students about Jewish resistance during the Holocaust in the village of Tuchyn, Ukraine.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: ['~/assets/sass/main.scss'],
  plugins: ['~/plugins/maps.client', '~/plugins/router-actions.client', '~/plugins/vimeo.client'],
  components: true,
  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true
    }
  },
  buildModules: [
    '@nuxtjs/google-fonts', 'nuxt-gsap-module',
  ],
  googleFonts: {
    prefetch: true,
    families: {
      'Atkinson+Hyperlegible': true,
    }
  },
  modules: [
    '@nuxtjs/style-resources',
    '@nuxt/content',
  ],
  styleResources: {
    scss: [
      '~/assets/sass/imports/imports.scss'
    ],
    hoistUseStatements: true  
},
  env: {
    mapsApi: process.env.GOOGLEMAPSAPI,
  },
  privateRuntimeConfig: {
    mapsApi: process.env.GOOGLEMAPSAPI
  },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}
