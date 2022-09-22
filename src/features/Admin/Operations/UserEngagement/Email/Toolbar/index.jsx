import React from "react";
import { Box } from "@material-ui/core";
import ActionBtn from "./ActionBtn";

export default function index() {
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <ActionBtn />
      </Box>
    </div>
  );
}
