import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Container, makeStyles } from "@material-ui/core";
import Usertable from "./UserTable";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ChildVaccinationPage = (props) => {
  const classes = useStyles();
  const match = useRouteMatch();
  useEffect(() => {
    return () => {
      console.log("clearing from the screen Child Vaccination Page");
    };
  }, [match]);
  return (
    <>
      <Container maxWidth={false}>
        <Usertable />
      </Container>
    </>
  );
};

export default ChildVaccinationPage;
