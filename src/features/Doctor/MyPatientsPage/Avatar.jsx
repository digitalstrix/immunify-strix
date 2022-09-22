import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Avatar({ picture }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <CircularProgress />}
      <img
        style={{ width: 50, borderRadius: "50%" }}
        src={picture}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
