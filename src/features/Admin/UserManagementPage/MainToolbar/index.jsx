import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import { PersonAddOutlined, BusinessOutlined } from "@material-ui/icons";

import Breadcrumb from "./Breadcrumb";
import ActionBtn from "./ActionBtn";
import ImmUseraddForm from "../ImmUseraddForm";
import VacUserAddForm from "../VacUseraddForm";

const Index = () => {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Breadcrumb />
        <Box display="flex">
          <Box mr={3}>
            <ActionBtn
              btnlabel="Add Imm User"
              btnicon={<PersonAddOutlined />}
              dialogtitle="Add Imm User"
              dialogcontent={<ImmUseraddForm />}
            />
          </Box>
          <Box mr={3}>
            <ActionBtn
              btnlabel="Add Vac User"
              btnicon={<PersonAddOutlined />}
              dialogtitle="Add Vac User"
              dialogcontent={<VacUserAddForm />}
            />
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
Index.propTypes = {
  className: PropTypes.string,
};
export default Index;
