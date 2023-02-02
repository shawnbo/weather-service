
import express, { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { getWeather } from './service/openWeatherService';
import { serve, setup } from 'swagger-ui-express';

const app = express();

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Service App',
      version: '1.0.0',
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
 *  description: Responds with weather JSON data
 *  get:
 *    tag:
 *    - Weather
 *    parameters:
 *    - name: lat
 *      in: query
 *      schema:
 *        type: string
 *      required: true
 *    - name: lon
 *      in: query
 *      schema:
 *        type: string
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
 *                - currentAlerts
 *              properties:
 *                condition:
 *                  type: string
 *                weather:
 *                  type: string
 *                hasAlerts:
 *                  type: string
 *                currentAlerts:
 *                  type: array
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

