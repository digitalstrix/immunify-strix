import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "../../assets/data/mapStyles";
import * as data from "../../assets/data/dummy-data.json";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 45.421532,
  lng: -75.597189,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <Box mt={3}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={props.zoom}
          options={options}
        >
          {/* {data.features.map((branch) => (
            <Marker
              key={branch.properties.PARK_ID}
              position={{
                lat: branch.geometry.coordinates[1],
                lng: branch.geometry.coordinates[0],
              }}
              onClick={() => {
                setSelectedMarker(branch);
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.geometry.coordinates[1],
                lng: selectedMarker.geometry.coordinates[0],
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
              }}
            >
              <div>
                <h2>{selectedMarker.properties.NAME}</h2>
                <p>{selectedMarker.properties.DESCRIPTIO}</p>
              </div>
            </InfoWindow>
          )} */}
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </Box>
    </div>
  );
};

export default React.memo(Map);
