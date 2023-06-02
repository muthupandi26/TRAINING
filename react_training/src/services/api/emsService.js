import { API_ROUTES } from "../../utils/constants";
import { AxiosBase } from "./index";

export default class EmsService extends AxiosBase {
  loginData = async (body) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.EXAMPLE.LOGIN_DATA}`,
        body
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  addEmployeeData = async (body, headers) => {
    try {
      const response = await this.requests.post(
        `${API_ROUTES.EXAMPLE.ADD_EMPLOYEE_DATA}`,
        body,
        headers
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  getEmployeeData = async (headers) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.EXAMPLE.GET_EMPLOYEE_DATA}`,

        headers
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  deleteEmployeeData = async (deleteIndex, headers) => {
    try {
      const response = await this.requests.delete(
        `${API_ROUTES.EXAMPLE.DELETE_EMPLOYEE_DATA}/${deleteIndex}`,
        headers
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  getSingleEmployeeData = async (getIndex, headers) => {
    try {
      const response = await this.requests.get(
        `${API_ROUTES.EXAMPLE.GET_EMPLOYEE_DATA}/${getIndex}`,

        headers
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  updateEmployeeData = async (getIndex, body, headers) => {
    try {
      const response = await this.requests.put(
        `${API_ROUTES.EXAMPLE.GET_EMPLOYEE_DATA}/${getIndex}`,
        body,
        headers
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
