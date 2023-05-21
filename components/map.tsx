import { NextPage } from "next";
import { useContext, useEffect } from "react";
import * as L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Restaurant } from "../global/restaurant";

interface Props {
  lat: number;
  long: number;
  restaurants: Restaurant[];
}

const Map: NextPage<Props> = ({ lat, long, restaurants }) => {
  let position: L.LatLngExpression = [0, 0];
  if (lat != null || long != null) {
    position = [lat, long];
  } else {
    position = [30.4383, -84.2807];
  }

  const positionOne: L.LatLngExpression = [0, -1];
  const positionTwo: L.LatLngExpression = [0, 0];

  const ZOOM = 15;
  const size = 50;

  useEffect(() => {
    // TODO: This is a hack to get the map to render correctly.
    // Figure out why I did this and how to get it working better?
  }, [restaurants]);

  function ChangeView() {
    const map = useMap();
    map.setView(position, ZOOM);
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={ZOOM}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <ChangeView />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={position}
        icon={L.divIcon({
          iconSize: [size, size],
          // iconAnchor: [size / 2, size + 9],
          className: "first-marker",
          html: "🏠",
        })}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {restaurants.map((restaurant) => {
        return (
          <Marker
            key={restaurant.id}
            position={[restaurant.geolocation.lat, restaurant.geolocation.lng]}
            icon={L.divIcon({
              iconSize: [size, size],
              // iconAnchor: [size / 2, size + 9],
              className: "second-marker",
              html: "🫖",
            })}
          >
            <Popup>
              <div>{restaurant.name}</div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
