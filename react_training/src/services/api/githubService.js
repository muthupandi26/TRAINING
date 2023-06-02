import { API_ROUTES, GITHUB_ROUTES } from "../../utils/constants";
import { AxiosBase } from ".";

export default class GithubService extends AxiosBase {
  getGithubUserData = async (userName) => {
    try {
      const response = await this.githubRequests.get(
        `${GITHUB_ROUTES.EXAMPLE.GET_USER_INFO}/${userName}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  getGithubRepoDetails = async () => {
    try {
      const response = await this.githubRequests.get(
        `${GITHUB_ROUTES.EXAMPLE.GET_USER_REPO_INFO}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
}
