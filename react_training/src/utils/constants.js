const PAGE_ROUTES = {
  HOME: "/",
  ADDEMPLOYEE: "/addEmployee",
  LISTEMPLOYEE: "/listEmployee",
  GITHOME: "/git",
  WEATHER: "/weather",
};

const API_ROUTES = {
  BASE_URL: "http://localhost:8080",
  EXAMPLE: {
    LOGIN_DATA: "/auth/login",
    ADD_EMPLOYEE_DATA: "/employees",
    GET_EMPLOYEE_DATA: "/employees",
    DELETE_EMPLOYEE_DATA: "/employees",
  },
};

const GITHUB_ROUTES = {
  BASE_URL: "https://api.github.com",
  EXAMPLE: {
    GET_USER_INFO: "/users",
    GET_USER_REPO_INFO:
      "/users/muthupandi26/repos?page=1&per_page=10&sort=updated",
  },
};

const WEATHER_ROUTES = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
};

const CONFIG = {
  TIMEOUT: 30000,
};

export { PAGE_ROUTES, API_ROUTES, CONFIG, GITHUB_ROUTES, WEATHER_ROUTES };
