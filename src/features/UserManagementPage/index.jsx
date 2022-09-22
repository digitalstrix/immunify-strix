import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth={false}>
        <MainToolbar />
        <Box m={3}>
          <UsersTable />
        </Box>
      </Container>
    </>
  );
}
