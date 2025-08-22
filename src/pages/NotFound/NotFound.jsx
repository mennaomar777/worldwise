import React from "react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found 😢</h1>
      <p className={styles.subtitle}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
