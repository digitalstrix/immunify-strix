import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { cloneArray } from '../../../../utils/commonUtils';
import Table from "../../../../common/components/Admin/Table";
import PrintedBatchDetails from './ImmCardReportDetailsDataTable';
import { selectBatches, selectReportType } from '../selector';


const generateColumns = (type = 'VAC') => {
  return [
    {
      title: type === 'VAC' ? 'Center' : 'Vendor',
      field: type === 'VAC' ? 'centerName' : 'vendorName'
    },
    {
      title: "Printed Date",
      field: "createdAt"
    },
    {
      title: "Batch Start",
      field: "batchStart",
    },
    {
      title: "Batch End",
      field: "batchEnd",
    },
  ];
}

const Immcardreportdatatable = () => {

  const batches = useSelector(selectBatches);
  const reportType = useSelector(selectReportType);
  return (
    <div>
      <Table
        title="Vaccination Center Card Report"
        columns={generateColumns(reportType)}
        data={cloneArray(batches)}
        detailPanel={[
          {
            render: (rowData) => {
              return <PrintedBatchDetails rowData={rowData}/>;
            }
          }
        ]}
        options={{
          loadingType: "overlay",
          showEmptyDataSourceMessage: true,
          search: true,
          actionsColumnIndex: -1,
          exportButton: true,
        }}
      />
    </div>
  );
};

export default Immcardreportdatatable;
