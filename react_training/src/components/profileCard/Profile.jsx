import React from "react";
import styles from "./Profile.module.scss";
import { format } from "date-fns";

function Profile(props) {
  return (
    <div className={styles.grid__item}>
      <article className={styles.card}>
        <article className={styles.card__image}>
          <img src={props.item.owner.avatar_url} alt="image will come" />
          <div className={styles.card__image__text}>
            <p>{props.item.owner.login}</p>
            <p className={styles.repo__name}>{props.item.name}</p>
            {props.item.private ? <p>private</p> : <p>public</p>}
          </div>
        </article>
        <div>
          <p>
            This repository was created on {"  "}
            {format(new Date(props.item.created_at), "dd MMMM yyyy")} by{"  "}
            {props.item.owner.login}
          </p>
        </div>
        <div>
          <a href={props.item.html_url} target="_blank" rel="noreferrer">
            View Repo
          </a>
        </div>
        <div>
          <p> used lanugage : {props.item.language}</p>

          <p> forks count : {props.item.forks_count}</p>
        </div>
      </article>
    </div>
  );
}

export default Profile;
