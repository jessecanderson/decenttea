import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

const Map = () => {

    const parseParamInt = (p: string | string[]): number =>
        parseInt(Array.isArray(p) ? p[0] : p, 10);
    const parseParamFloat = (p: string | string[]): number =>
        parseFloat(Array.isArray(p) ? p[0] : p);

    const position: LatLngExpression = [30.4383, 84.2807];
    const ZOOM = 15;

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
        </MapContainer>
    )
}

export default Map;