import type { NextPage } from "next";
import TeaSearch from "../components/tea_search";
import dynamic from "next/dynamic";
import Layout from "../components/layout";
import styles from "../styles/main.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Address, State, Action, Position } from "../global/types";
import { Restaurant } from "../global/restaurant";
import AddRestaurant from "../components/add_restaurant";

var startingAddress: Address = {
  streetOne: "",
  streetTwo: "",
  city: "",
  state: "",
  zip: "",
};

const MapWithNoSSR = dynamic(() => import("../components/map"), { ssr: false });

const Main: NextPage = () => {
  const [position, updatePosition] = useState({ lat: 0.0, long: 0.0 });
  const [restaurants, updateRestaurants] = useState<Restaurant[]>([]);
  const [showModal, updateShowModel] = useState(false);

  const results = false;

  const handlePositionUpdate = async (lat: number, long: number) => {
    updatePosition({ lat, long });
    const res = await fetch(`/api/restaurants?lat=${lat}&lng=${long}`);
    const data = await res.json();
    updateRestaurants(data.response.restaurants);
  };

  const addClickHandler = () => {
    updateShowModel(!showModal);
  };

  const submitClickHandler = () => {
    updateShowModel(!showModal);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-evenly p-8">
          <p>
            The best place to find <i>Decent</i> tea.
          </p>
        </div>
        <div className="flex justify-evenly items-stretch columns-2 gap-1">
          <div className="justify-between relative">
            <div className="absolute top-0 right-1">
              {!showModal && (
                <FontAwesomeIcon
                  size="lg"
                  className="cursor-pointer"
                  icon={faPlusCircle}
                  onClick={addClickHandler}
                />
              )}
            </div>
            <div className="content-center px-2">
              {showModal ? (
                <AddRestaurant callback={addClickHandler} />
              ) : (
                <TeaSearch updatePosition={handlePositionUpdate} />
              )}
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
      </div>
    </Layout>
  );
};

export default Main;
