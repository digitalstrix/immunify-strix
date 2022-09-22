import React from "react";
import ReportToolbar from "./ReportToolbar";
import ReportTableData from "./ReportTableData";
import { Box } from "@material-ui/core";

const Index = () => {
  return (
    <div>
      <Box m={3}>
        <ReportToolbar />
      </Box>
      <ReportTableData />
    </div>
  );
};

export default Index;
