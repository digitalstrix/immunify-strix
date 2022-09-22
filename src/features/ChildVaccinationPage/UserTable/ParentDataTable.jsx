import React from "react";
import { useSelector } from "react-redux";
import { selectParents, selectChildren } from "../selector";
import { cloneArray } from "../../../utils/commonUtils";

import Table from "../../../common/components/Table";
import Childdatatable from "./ChildDataTable";
import Qrinputfield from "./QrInputField";

const Parentdatatable = () => {
  const parents = useSelector(selectParents);
  const children = useSelector(selectChildren);

  return (
    <div>
      {parents && parents.length > 0 ? (
        <Table
          title={"Parent Details"}
          columns={[
            { title: "Name", field: "fullName" },
            { title: "Email Address", field: "email" },
            { title: "ID Number", field: "idNumber" },
            { title: "Mobile Number", field: "contact" },
          ]}
          data={cloneArray(parents)}
          detailPanel={[
            {
              render: (rowData) => {
                return (
                  <Childdatatable
                    rowdata={rowData}
                    data={cloneArray(children)}
                  />
                );
              },
            },
          ]}
          options={{
            loadingType: "overlay",
            showEmptyDataSourceMessage: true,
            search: false,
            exportButton: true,
          }}
          rowClick={(event, rowData, togglePanel) => togglePanel()}
        />
      ) : (
        <Qrinputfield />
      )}
    </div>
  );
};

export default Parentdatatable;
