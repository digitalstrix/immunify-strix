import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: (props) => ({
    font: "inherit",
    letterSpacing: "inherit",
    backgroundColor: "none",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: props.error ? "red" : "#c4c4c4",
    borderRadius: 3,
    color: "black",
    height: 56,
    width: "100%",
    boxSizing: "border-box",
    margin: 0,
    padding: "18.5px 14px",
  }),
});

let autoComplete;
let currentCountry;

const elementId = "places-auto-complete-custom";

const loadScript = (url, callback) => {
  const existingScript = document.getElementById(elementId);
  if (existingScript) {
    existingScript.remove();
  }
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = elementId;

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, onChange, country, autoCompleteRef) {
  if (currentCountry !== country) {
    console.log(currentCountry);
    console.log(country);
    currentCountry = country;
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country } }
    );
    autoComplete.setFields([
      "address_components",
      "formatted_address",
      "place_id",
      "geometry",
    ]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery, onChange)
    );
  } else {
    console.log(currentCountry);
    console.log(country);
  }
}

async function handlePlaceSelect(updateQuery, onChange) {
  const addressObject = autoComplete.getPlace();
  if (addressObject) {
    const { formatted_address, address_components } = addressObject;
    let displayValue = formatted_address;
    let query = formatted_address;
    if (address_components && address_components.length >= 4) {
      query = addressObject;
      // displayValue = address_components[0].long_name;
    }
    updateQuery(displayValue);
    onChange(query);
  }
  console.log(addressObject);
}

function SearchLocationInput({
  onChange,
  value,
  error,
  country,
  disabled,
  placeholderValue,
}) {
  const [query, setQuery] = useState("");
  const classes = useStyles({ error: error ? !query : error });
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    if (currentCountry !== country) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, onChange, country, autoCompleteRef)
      );
    }
  }, [country, onChange]);

  console.log(value);
  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        required={true}
        placeholder={placeholderValue || "City"}
        value={query !== "" ? query : null}
        defaultValue={value}
        disabled={disabled}
        className={classes.root}
      />
    </div>
  );
}

export default SearchLocationInput;
