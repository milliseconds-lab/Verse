import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc, { Options } from 'swagger-jsdoc'

export const options: Options = {
  swaggerDefinition: {
    info: {
      title: 'Verse API',
      version: '1.0',
      description: 'Verse API Specifications'
    },
    host: 'localhost:3000',
    basePath: '/api'
  },
  apis: ['/routes/**/*.js', './swagger/*', './models/**/*.js']
}

const specs = swaggerJSDoc(options)

export { swaggerUI, specs }
