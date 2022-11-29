import React, { useState } from "react";
import Map, { GeolocateControl, Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

//"pk.eyJ1IjoiYWRtaW4xMjMzIiwiYSI6ImNsNTRhNnNheTB4aTMza215dzlndW0zOXgifQ.dQ6Mu8nTg2cB9bWoeumU-w"

const Navigator = () => {
  const [position, setPosition] = useState([]);
  const [viewport, setViewport] = useState({});

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [[-122.4, 37.8]] },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 8,
    },
  };

  // useEffect(() => {
  //   navigator.geolocation.watchPosition(function (position) {
  //     setPosition([position.coords.longitude, position.coords.latitude]);
  //     setViewport({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       zoom: 10,
  //     });
  //   });
  // }, [viewport]);

  // const start = () => {
  //   navigator.geolocation.watchPosition(
  //     (data) => {
  //       console.log(
  //         data.coords.latitude,
  //         data.coords.longitude,
  //         data.coords.accuracy
  //       );
  //       setPosition(data.coords.latitude, data.coords.longitude);
  //     },
  //     (err) => console.log(err),
  //     {
  //       enableHighAccuracy: true,
  //     }
  //   );
  // };

  const stop = () => {};

  return (
    <div>
      <Map
        initialViewState={{
          longitude: -237,
          latitude: 12,
          zoom: 5,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoiYWRtaW4xMjMzIiwiYSI6ImNsNTRhNnNheTB4aTMza215dzlndW0zOXgifQ.dQ6Mu8nTg2cB9bWoeumU-w"
      >
        <Source
          type="geojson"
          data={{ type: "Feature", geometry: { type: "LineString" } }}
        />
        <Source type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
        />
      </Map>
    </div>
  );
};

export default Navigator;
