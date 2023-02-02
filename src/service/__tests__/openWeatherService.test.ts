import nock from "nock";

import * as httpUtility from "../../utilities/httpUtility";
import { getWeather } from '../openWeatherService';

jest.mock("../../utilities/httpUtility");
describe('openWeatherService test', () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should return hot', async () => {
    (httpUtility.get as jest.Mock).mockResolvedValue({
      main: { temp: 90 },
      weather: [{ main: '' }],
      alerts: []
    });

    const results = await getWeather('0', '0');

    expect(results).toMatchObject({ temperature: 'hot' });
  });

  it('should return moderate', async () => {
    (httpUtility.get as jest.Mock).mockResolvedValue({
      main: { temp: 50 },
      weather: [{ main: '' }],
      alerts: []
    });

    const results = await getWeather('0', '0');

    expect(results).toMatchObject({ temperature: 'moderate' });
  });

  it('should return cold', async () => {
    (httpUtility.get as jest.Mock).mockResolvedValue({
      main: { temp: 49 },
      weather: [{ main: '' }],
      alerts: []
    });

    const results = await getWeather('0', '0');

    expect(results).toMatchObject({ temperature: 'cold' });
  });

  it('should handle an error', async () => {
    await expect(getWeather('', '')).rejects.toThrow();
  });
});