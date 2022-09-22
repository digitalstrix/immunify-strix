import React from "react";
import { useSelector } from "react-redux";
import Call from "./Call";
import { selectCallData } from "./selector";

const Index = ({ location: { state } }) => {
  const callData = useSelector(selectCallData);

  return <div>{callData && <Call data={callData} userData={state} />}</div>;
};

export default Index;
