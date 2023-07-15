import { Card } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface DivProps {
  children: ReactNode;
}

const Div: FC<DivProps> = ({ children }) => {
  return (
    <Card
      variant="outlined"
      sx={{ padding: 2, backgroundColor: "#F1F7FA", marginBottom: 3 }}
    >
      {children}
    </Card>
  );
};

export default Div;
