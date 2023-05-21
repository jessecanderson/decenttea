"use client";

import type { NextPage } from "next";
import TeaSearch from "../components/tea_search";
import dynamic from "next/dynamic";
import Layout from "./layout";
import styles from "../styles/main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Address, State, Action, Position } from "../global/types";
import { Restaurant } from "../global/restaurant";
import AddRestaurant from "../components/add_restaurant";

const MapWithNoSSR = dynamic(() => import("../components/map"), { ssr: false });

const Main: NextPage = () => {
  const [position, updatePosition] = useState({ lat: 0.0, long: 0.0 });
  const [restaurants, updateRestaurants] = useState<Restaurant[]>([]);
  const [hideSearch, udpateHideSearch] = useState(true);

  const results = false;

  const handlePositionUpdate = async (lat: number, long: number) => {
    updatePosition({ lat, long });
    console.log(lat);
    const res = await fetch(`/api/restaurants?lat=${lat}&lng=${long}`);
    console.log(res);
    const data = await res.json();
    updateRestaurants(data.response.restaurants);
  };

  const addClickHandler = () => {
    udpateHideSearch(!hideSearch);
  };

  const submitClickHandler = () => {
    udpateHideSearch(!hideSearch);
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
        {hideSearch ? (
          <div className="flex justify-evenly items-stretch columns-2 gap-1">
            <div className="justify-between relative">
              <div className="absolute top-2 right-4">
                <FontAwesomeIcon
                  size="lg"
                  className="cursor-pointer"
                  icon={faPlusCircle}
                  onClick={addClickHandler}
                />
              </div>
              <div className="content-center px-2">
                <TeaSearch updatePosition={handlePositionUpdate} />
              </div>
            </div>
            <div className={styles["leaflet-container"]}>
              <MapWithNoSSR
                lat={position.lat}
                long={position.long}
                restaurants={restaurants}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <AddRestaurant callback={addClickHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
