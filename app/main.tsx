"use client";

import type { NextPage } from "next";
import TeaSearch from "../components/tea_search";
import dynamic from "next/dynamic";
import Layout from "./layout";
import styles from "../styles/main.module.css";
import { useState } from "react";
import { Address, State, Action, Position } from "../global/types";
import { Restaurant } from "../global/restaurant";

const MapWithNoSSR = dynamic(() => import("../components/map"), { ssr: false });

const Main: NextPage = () => {
  const [position, updatePosition] = useState({ lat: 0.0, long: 0.0 });
  const [restaurants, updateRestaurants] = useState<Restaurant[]>([]);

  const results = false;

  const handlePositionUpdate = async (lat: number, long: number) => {
    updatePosition({ lat, long });
    console.log(lat);
    const res = await fetch(`/api/restaurants?lat=${lat}&lng=${long}`);
    console.log(res);
    const data = await res.json();
    updateRestaurants(data.response.restaurants);
  };

  return (
    <div className="p-8">
      <div className="flex justify-evenly p-8">
        <p>
          The best place to find <i>Decent</i> tea.
        </p>
      </div>
      <div className="flex justify-evenly items-stretch columns-2">
        <div className="content-center px-8">
          {results ? (
            <div>Result list is here.</div>
          ) : (
            <TeaSearch updatePosition={handlePositionUpdate} />
          )}
        </div>
        <div className={styles["leaflet-container"]}>
          <MapWithNoSSR
            lat={position.lat}
            long={position.long}
            restaurants={restaurants}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
