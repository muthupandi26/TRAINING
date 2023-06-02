import { WEATHER_ROUTES } from "../../utils/constants";
import { AxiosBase } from ".";

export default class WeatherService extends AxiosBase {
  getDefaultWeatherDetails = async (params) => {
    try {
      const response = await this.weatherRequests.get(
        `${WEATHER_ROUTES.BASE_URL}`,
        params
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
