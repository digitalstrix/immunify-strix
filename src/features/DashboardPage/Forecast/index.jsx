import React from "react";
import { Typography } from "@material-ui/core";
import TabBar from "../../../common/components/TabBar";

import ToolBar from "./ToolBar";
import DataTable from "./DataTable";
import Graph from "./Graph";

const Index = () => {
  return (
    <div>
      <Typography variant={"h6"}>Forcast for Next Month</Typography>
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
