import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useAvatar from "../../../assets/img/userAvatar.png";

export default function Avatar({ picture }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {picture && !loaded && <CircularProgress />}
      <img
        style={{ width: 50, borderRadius: "50%" }}
        src={picture || useAvatar}
        onLoad={() => {
          if (picture) {
            setLoaded(true);
          }
        }}
      />
    </>
  );
}
