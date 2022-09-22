import React from "react";
import { Typography } from "@material-ui/core";
import TabBar from "../../../common/components/TabBar";
import Datatable from "./DataTable";
import Map from "../../../common/components/Map";
import Toolbar from "./ToolBar";

const Index = () => {
  return (
    <div>
      <Typography variant={"h6"}>Vaccination by Age</Typography>
      <Toolbar />
      <TabBar
          tab1title="Data"
          tab1disable={false}
          tab1data={<Datatable />}
          tab2title="Map"
          tab2disable={false}
          tab2data={<Map zoom={12} />}
          tab3title="Graph"
          tab3disable={true}
      />
    </div>
  );
};

export default Index;
