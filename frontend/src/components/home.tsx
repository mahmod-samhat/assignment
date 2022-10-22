import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Image } from "mui-image";

import people_search from "../assets/people-search.jpg";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box height="100%">
        <Grid
          container
          height="100%"
          justifyContent="center"
          sx={{
            placeItems: "center",
            background: `linear-gradient(36deg, ${theme.primary.main} 50%, ${theme.secondary.main} 40%, ${theme.primary.main} 91%)`,
          }}
        >
          <Grid item xs={12} sm={5} padding="50px">
            <Typography variant="h3" fontFamily="'Anton', sans-serif">
              wellcome To Haat Assignment
            </Typography>
            <Typography
              variant="h5"
              fontWeight="200"
              marginY={5}
              fontFamily="Bebas Neue"
            >
              enjoy in my user system mangement
            </Typography>
          </Grid>
          <Grid height="100%" item xs={12} sm={7} sx={{ background: "white" }}>
            <Image height="100%" src={people_search} fit="contain" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Home;
