import React, { useState, useEffect, useMemo } from "react";
import Table from "../../../../../common/components/Admin/Table";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import { Box, Divider, IconButton, Tooltip, Typography } from "@material-ui/core";
import { deleteTradename, loadTradenames } from "../tradenameSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectTradenames, selectTradenameAddStatus, selectUserId, selectTradenameDeletingStatus } from "../selector";
import { cloneArray } from "../../../../../utils/commonUtils";
import MainDialog from "../../../../../common/components/Admin/Dialog";
import { DialogContent, DialogActions } from "../../../../../common/components/Admin/Dialog";
import { ListRounded } from "@material-ui/icons";
import { generateAddTradenamePayload } from "../../../../../utils/vaccineUtils";

const AllVaccinesDialog = ({ data }) => {
  return (
    <>
      <DialogContent dividers>
        <Box p={4}>
          {data.map((item, index) => {
            return (
              <>
                <Typography key={index}>{item.name}</Typography>
                <Divider />
              </>
            );
          })}
        </Box>
      </DialogContent>
    </>
  );
};

const Index = () => {
  const dispatch = useDispatch();
  const tradenames = useSelector(selectTradenames);
  const tradenamesUpdate = useSelector(selectTradenameAddStatus);
  const tradenamesDeleteStatus = useSelector(selectTradenameDeletingStatus);
  const [vaccineList, setVaccineList] = useState([]);
  const [open, setOpen] = useState(false);
  const personId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(loadTradenames());
  }, [dispatch, tradenamesUpdate, tradenamesDeleteStatus]);

  console.log("all tradenames ===>", tradenames);
  console.log("delete tradenames ===>", tradenamesDeleteStatus);



  return (
    <div>
      <MainDialog
        tooltip='Vaccine List'
        dialogtitle='Vaccine List'
        dialogcontent={<AllVaccinesDialog data={vaccineList} handleClose={() => setOpen(false)} dialogactiontitle='Close' />}
        maxWidth='sm'
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <Table
        title={null}
        data={cloneArray(tradenames)}
        columns={[
          { title: "Tradename", field: "tradeName" },
          { title: "Vaccine", render: (rowData) => rowData.vaccines.length ? rowData.vaccines[0].name + "..." : 'No vaccines' },
          { title: "Manufacturer", field: "manufacturerCompanyName" },
          { title: "Dose Count", render: (rowData) => rowData.doses?.length },
          { title: "D1", render: (rowData) => rowData.doses[0]?.startDay > 0 ? rowData.doses[0]?.startDay + ' Days' : rowData.doses[0]?.startWeek > 0 ? rowData.doses[0]?.startWeek + ' Week' : rowData.doses[0]?.startMonth > 0 ? rowData.doses[0]?.startMonth + ' Month' : rowData.doses[0]?.startYear > 0 ? rowData.doses[0]?.startYear + ' Year' : null },

          { title: "D2", render: (rowData) => rowData.doses[1]?.startDay > 0 ? rowData.doses[1]?.startDay + ' Days' : rowData.doses[1]?.startWeek > 0 ? rowData.doses[1]?.startWeek + ' Week' : rowData.doses[1]?.startMonth > 0 ? rowData.doses[1]?.startMonth + ' Month' : rowData.doses[1]?.startYear > 0 ? rowData.doses[1]?.startYear + ' Year' : null },

          { title: "D3", render: (rowData) => rowData.doses[2]?.startDay > 0 ? rowData.doses[2]?.startDay + ' Days' : rowData.doses[2]?.startWeek > 0 ? rowData.doses[2]?.startWeek + ' Week' : rowData.doses[2]?.startMonth > 0 ? rowData.doses[2]?.startMonth + ' Month' : rowData.doses[2]?.startYear > 0 ? rowData.doses[2]?.startYear + ' Year' : null },

          { title: "D4", render: (rowData) => rowData.doses[3]?.startDay > 0 ? rowData.doses[3]?.startDay + ' Days' : rowData.doses[3]?.startWeek > 0 ? rowData.doses[3]?.startWeek + ' Week' : rowData.doses[3]?.startMonth > 0 ? rowData.doses[3]?.startMonth + ' Month' : rowData.doses[3]?.startYear > 0 ? rowData.doses[3]?.startYear + ' Year' : null },

          { title: "D5", render: (rowData) => rowData.doses[4]?.startDay > 0 ? rowData.doses[4]?.startDay + ' Days' : rowData.doses[4]?.startWeek > 0 ? rowData.doses[4]?.startWeek + ' Week' : rowData.doses[4]?.startMonth > 0 ? rowData.doses[4]?.startMonth + ' Month' : rowData.doses[4]?.startYear > 0 ? rowData.doses[4]?.startYear + ' Year' : null },
        ]}
        actions={[
          {
            icon: "list",
            tooltip: "Vaccine List",
            onClick: (event, rowData) => alert("You deleted " + rowData.trade_name),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => alert("You deleted " + rowData.trade_name),
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.icon) {
              case "list":
                return (
                  <Tooltip title='Vaccine List'>
                    <IconButton
                      aria-label='Delete'
                      color='inherit'
                      onClick={(event, rowData) => {
                        setVaccineList(props.data.vaccines);
                        setOpen(true);
                      }}>
                      <ListRounded />
                    </IconButton>
                  </Tooltip>
                );
              case "delete":
                return (
                  <Tooltip title='Delete'>
                    <IconButton
                      aria-label='Delete'
                      color='inherit'
                      onClick={(event, rowData) => {
                        console.log('selectesd', props)
                        // const payload = generateAddTradenamePayload(inputs);
                        dispatch(deleteTradename({ manufacturerId: props.data.id, adminId: personId }))
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                );

              default:
                break;
            }
          },
        }}
        options={{ headerStyle: { fontWeight: "bold" }, actionsColumnIndex: -1, exportButton: true }}
      />
    </div>
  );
};

export default Index;
