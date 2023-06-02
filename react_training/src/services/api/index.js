import axios from "axios";
import {
  API_ROUTES,
  CONFIG,
  GITHUB_ROUTES,
  WEATHER_ROUTES,
} from "../../utils/constants";

export class AxiosBase {
  instance = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    timeout: CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
      credentials: "same-origin",
    },
  });

  gitHubInstance = axios.create({
    baseURL: GITHUB_ROUTES.BASE_URL,
    timeout: CONFIG.TIMEOUT,
    headers: {
      Authorization: "Bearer " + "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",
    },
  });

  weatherInstance = axios.create({
    baseURL: WEATHER_ROUTES.BASE_URL,
    timeout: CONFIG.TIMEOUT,
  });

  responseBody = (response) => {
    return response.data;
  };

  responseError = (error) => {
    throw error.response;
  };

  serializeParams = function (url, params) {
    var str = [];
    for (var p in params)
      if (
        params.hasOwnProperty(p) &&
        params[p] !== undefined &&
        params[p] !== null
      ) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
      }
    return str.length > 0 ? `${url}?${str.join("&")}` : url;
  };

  requests = {
    get: (url, headers) =>
      this.instance
        .get(url, headers)
        .then(this.responseBody)
        .catch(this.responseError),
    post: (url, body, headers) =>
      this.instance
        .post(url, body, headers)
        .then(this.responseBody)
        .catch(this.responseError),
    put: (url, body, headers) =>
      this.instance
        .put(url, body, headers)
        .then(this.responseBody)
        .catch(this.responseError),
    patch: (url) =>
      this.instance
        .patch(url)
        .then(this.responseBody)
        .catch(this.responseError),
    delete: (url, headers) =>
      this.instance
        .delete(url, headers)
        .then(this.responseBody)
        .catch(this.responseError),
  };

  githubRequests = {
    get: (url, headers) =>
      this.gitHubInstance
        .get(url, headers)
        .then(this.responseBody)
        .catch(this.responseError),
  };

  weatherRequests = {
    get: (url, params) =>
      this.weatherInstance
        .get(url, { params })
        .then(this.responseBody)
        .catch(this.responseError),
  };
}
