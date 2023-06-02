import React, { useEffect, useState } from "react";
import ButtonField from "../../components/buttons/ButtonField";
import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/profileCard/Profile";
import GithubService from "../../services/api/githubService";
import styles from "./GitHomePage.module.scss";

function GitHomePage() {
  const getGithubService = new GithubService();
  const [userInfo, setUserInfo] = useState({});
  const [repoInfo, setRepoInfo] = useState([]);

  useEffect(() => {
    getGithubService
      .getGithubUserData("muthupandi26")
      .then((response) => setUserInfo(response))
      .catch((error) => alert(error));
  }, []);

  const getRepo = () => {
    getGithubService
      .getGithubRepoDetails()
      .then((response) => setRepoInfo(response))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Navbar text="GITHUB REST API" />
      <section>
        <h1>Viewing {userInfo.login}'s Repositories </h1>
        <h4>created at {userInfo.created_at} </h4>
        <p>updated at {userInfo.updated_at}</p>
        <ButtonField
          divClassName={`getRepoBtn`}
          type="button"
          buttonText="Get All Repo Details!"
          onClick={getRepo}
        />
        <div className={styles.grid__container}>
          {repoInfo.map((item) => (
            <Profile key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default GitHomePage;
