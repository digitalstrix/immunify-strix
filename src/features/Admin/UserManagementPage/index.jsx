import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Box, Container, makeStyles } from "@material-ui/core";
import MainToolbar from "./MainToolbar";
import TabBar from "../../../common/components/TabBar";
import ImmUsersTable from "./ImmUsersTable";
import VacUsersTable from "./VacUsersTable";
import {getCountries, getUsersAddedByAdmin} from './userManagementSlice'
import { selectUser } from "../../User/selector";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedUser = useSelector((state) => selectUser(state));
  useEffect(() => {
    dispatch(getUsersAddedByAdmin({createdBy: selectedUser?.personId}));
    dispatch(getCountries());
  }, []);


  return (
    <div className={classes.root}>
      
      <Container maxWidth={false}>
        <MainToolbar />
        <Box m={3}>
          <TabBar
            tab1title="Imm Users List"
            tab1data={<ImmUsersTable />}
            tab2title="Vac Users List"
            tab2data={<VacUsersTable />}
            tab3hide="none"
            tab4hide="none"
            tab5hide="none"
            tab6hide="none"
            variant="fullWidth"
          />
        </Box>
      </Container>
    </div>
  );
}
