import React from "react";

import { Box, Typography } from "@material-ui/core";
import ToolbarSummary from "./ToolbarSummary";
import TableSummary from "./TableSummary";

const Index = () => {
  return (
    <div>
      <Box mt={3}>
        <Typography variant={"h6"}>Summary</Typography>
        <ToolbarSummary />
        <TableSummary />
      </Box>
    </div>
  );
};

export default Index;
