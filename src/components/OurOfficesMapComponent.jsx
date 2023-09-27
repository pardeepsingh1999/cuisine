import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CardLayout from "./CardLayout";
import OfficesMockData from "../mockData/offices.json";

const OurOfficesMapComponent = () => {
  return (
    <>
      <CardLayout>
        <div className="card-body p-5">
          <MapContainer
            center={OfficesMockData[0].position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {OfficesMockData.map((each) => (
              <Marker key={each.id} position={each.position}>
                <Popup>{each.title}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardLayout>
    </>
  );
};

export default OurOfficesMapComponent;
