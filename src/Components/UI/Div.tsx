import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface DivProps {
  children: ReactNode;
}

const Div: FC<DivProps> = ({ children }) => {
  return (
    <Box sx={{ border: "1px solid #e2e2e2", padding: 2, marginTop: 3 }}>
      {children}
    </Box>
  );
};

export default Div;
