import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Table from "../../../../common/components/Admin/Table";
import { selectBatchDetails } from '../selector';
import { fetchBatchDetails } from '../reportsSlice';

const formatData = (data) => {
    return data.map(({ subId, link }) => ({
        subId,
        link: <a href={link} title={`Download`} download={'cards.pdf'}>
            Download
        </a>
    }));
};

const PrintedBatchDetails = ({ rowData: { batchId } }) => {
    const dispatch = useDispatch();
    const batchDetails = useSelector(selectBatchDetails);

    useEffect(() => {
        if (!batchDetails[batchId]) {
            dispatch(fetchBatchDetails({ batchId }));
        }
    }, [batchId, batchDetails, dispatch]);

    if (!batchDetails[batchId]) {
        return (<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <CircularProgress />
        </div>);
    }

    return (
      <div>
        <Table
          title="Printed Card Links"
          columns={[
            { title: "Sub Batch Id", field: "subId" },
            { title: "Link", field: "link" },
          ]}
          data={formatData(batchDetails[batchId])}
          options={{
            filtering: false,
            loadingType: "overlay",
            showEmptyDataSourceMessage: true,
            search: false,
            actionsColumnIndex: -1,
            exportButton: false,
          }}
        />
      </div>
    );
  };

  export default PrintedBatchDetails;