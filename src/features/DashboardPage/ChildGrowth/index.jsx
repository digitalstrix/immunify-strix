import React from "react";
import { Typography } from "@material-ui/core";
import ToolBar from "./ToolBar";
import TabBar from "../../../common/components/TabBar";
import DataTable from "./DataTable";
import Graph from "./Graph";

const Index = () => {
  return (
    <div>
      <Typography variant={"h6"}>Child Growth Details</Typography>
      <ToolBar />
      <TabBar
        tab1title="Data"
        tab1disable={false}
        tab1data={<DataTable />}
        tab2title="Graph"
        tab2disable={false}
        tab2data={<Graph />}
        tab3title="Map"
        tab3disable={true}
      />
    </div>
  );
};

export default Index;
