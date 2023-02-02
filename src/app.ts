
import express, { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { getWeather } from './service/openWeatherService';
import { serve, setup } from 'swagger-ui-express';
import { version } from '../package.json';

const app = express();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Service App',
      version: version,
      description: 'A simple app that calls Open Weather Map API'
    },
  },
  apis: ['./src/app.ts']
};

const openapiSpecification = swaggerJSDoc(options);

app.use('/api-docs', serve, setup(openapiSpecification));

/**
 * @openapi
 * /:
 *  get:
 *    tags:
 *      - Weather
 *    description: API endpoint that responds with weather JSON data. It requires latitude and longitude query paramaters
 *    parameters:
 *    - name: lat
 *      in: query
 *      description: Latitude
 *      schema:
 *        type: number
 *      required: true
 *    - name: lon
 *      in: query
 *      description: Longitude
 *      schema:
 *        type: number
 *      required: true
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - condition
 *                - weather
 *                - hasAlerts
 *              properties:
 *                condition:
 *                  type: string
 *                weather:
 *                  type: string
 *                hasAlerts:
 *                  type: string
 *                currentAlerts:
 *                  type: array
 *                  items:
 *                    type: object
 *                    required:
 *                      - event
 *                    properties:
 *                      event:
 *                        type: string
 */
app.get('/', async (req: Request, res: Response) => {
  const lat: string = req.query.lat as string;
  const lon: string = req.query.lon as string;

  try {
    const data = await getWeather(lat, lon);

    return res.json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: {},
      error: (err as Error).message || err
    });
  }
});


export { app };

