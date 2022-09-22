import React from "react";
import TabBar from "../../../../common/components/TabBar";
import Reports from "./Reports";
import Prescriptions from "./Prescriptions";

const index = ({ data }) => {
  return (
    <div>
      <TabBar
        tab1title="Lab Reports"
        tab1data={<Reports data={data} />}
        tab2title="Prescriptions"
        tab2data={<Prescriptions data={data} />}
        tab3hide="none"
        tab4hide="none"
        tab5hide="none"
        tab6hide="none"
        variant="fullWidth"
        centered={true}
      />
    </div>
  );
};

export default index;
