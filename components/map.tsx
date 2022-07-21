import { NextPage } from "next";
import { useContext } from "react";
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
// import { AddressContext } from "../context/addressprovider";


const Map: NextPage<{ lat: number, long: number }> = (props) => {
    let position: L.LatLngExpression = [0, 0];
    if (props.lat != null || props.long != null) {
        position = [props.lat, props.long];
    } else {
        position = [30.4383, -84.2807];
    }

    const ZOOM = 15;
    const size = 20;

    return (
        <MapContainer
            center={position}
            zoom={ZOOM}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}
                icon={L.divIcon({
                    iconSize: [size, size],
                    // iconAnchor: [size / 2, size + 9],
                    className: "mymarker",
                    html: "🫖",
                })}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;