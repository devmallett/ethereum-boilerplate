import { Card, Timeline, Typography } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import iconImg from '../images/online-gallery.svg'

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const isInchDex = useMemo(() => (Moralis.Plugins?.oneInch ? true : false), [Moralis.Plugins?.oneInch]);

  return (
    <div style={{ display: "flex", gap: "5px"}}>
      <section className="hero">
        <div className="hero-center">
          <article className="hero-info">
            <h1>Welcome.</h1>
            <p> join the movement of new story telling</p>
            {/* <button className="btn">Connect</button> */}
          </article>
          <article className="hero-images">
            <img src={iconImg} className="phone-img" alt="phone" />

          </article>
        </div>

      </section>

    </div>
  );
}
