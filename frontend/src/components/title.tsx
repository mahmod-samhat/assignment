import * as React from "react";
import { Typography, useTheme } from "@mui/material";

interface TitleProps {}

const Title: React.FC<TitleProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h4"
        component="span"
        fontFamily="'Anton', sans-serif"
        color="black"
        className="responsiveTitle"
      
      >
        HAAT
      </Typography>
      <Typography
        variant="h4"
        color={theme.primary.main}
        component="span"
        fontFamily="'Anton', sans-serif"
        className="responsiveTitle"

      >
        ASSIGNMENT
      </Typography>
    </>
  );
};
export default Title;
