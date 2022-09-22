import React from "react";
import TabBar from "../../../common/components/TabBar";
import Map from "../../../common/components/Map";

import { Typography } from "@material-ui/core";
import ToolBar from "./ToolBar";
import Datatable from "./DataTable";
import Graph from "./Graph";

const Index = () => {
  return (
    <div>
      <Typography variant={"h6"}>Vaccination by Vaccine Type</Typography>
      <ToolBar />
      <TabBar
        tab1title="Data"
        tab1disable={false}
        tab1data={<Datatable />}
        tab2title="Map"
        tab2disable={false}
        tab2data={<Map zoom={12} />}
        tab3title="Graph"
        tab3disable={false}
        tab3data={<Graph />}
      />
    </div>
  );
};

export default Index;
