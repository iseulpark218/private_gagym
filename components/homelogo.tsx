import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/HomeLogo.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeLogo = () => {
  const router = useRouter();

  return (
    <div>
      <main className={styles.main}>
        <img style={{ width: "20vw" }} src="/logo.png" alt="test" />
      </main>
    </div>
  );
};

export default HomeLogo;
