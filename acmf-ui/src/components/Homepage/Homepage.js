import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import headerImg from "../../assets/landing.png";

const Header = () => {
  const CustomBox = styled(Box)(({ theme, color = "#004C7B" }) => ({
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    backgroundColor: color,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  return (
    <>
      <CustomBox component="header">
        <BoxText component="section">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#fff",
            }}
          >
            ACMF
          </Typography>

          <Typography
            variant="p"
            component="p"
            sx={{
              py: 1,
              lineHeight: 1.6,
              color: "#fff",
            }}
          >
            • First Line
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              py: 1,
              lineHeight: 1.6,
              color: "#fff",
            }}
          >
            • Second Line
          </Typography>
          <Typography
            variant="p"
            component="p"
            sx={{
              py: 1,
              lineHeight: 1.6,
              color: "#fff",
            }}
          >
            • Third Line
          </Typography>

          <Box>
            <Button
              component={Link}
              to={"/about"}
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                borderRadius: 2,
                color: "#fff",
                backgroundColor: "transparent",
                borderColor: "#fff",
                "&&:hover": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
                "&&:focus": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
              }}
            >
              Get started
            </Button>
          </Box>
        </BoxText>

        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              flex: "1",
              paddingTop: "30px",
              alignSelf: "center",
            },
            [theme.breakpoints.up("md")]: {
              flex: "2",
              alignSelf: "flex-end",
            },
          })}
        >
          <img
            src={headerImg}
            alt="headerImg"
            className="border-2"
            style={{
              width: "65%",
              marginBottom: 10,
              marginLeft: 300,
            }}
          />
        </Box>
      </CustomBox>
      <div className="m-4">
        <div className="ml-8 min-h-screen flex flex-col items-center justify-center bg-[#F1F1F1]">
          <div className="w-full text-center">
            <h1 className="text-4xl font-bold text-[#004C7B] mb-4">
              What is ACMF?
            </h1>
            <p className="text-[#004C7B] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              dolor quam, dapibus vitae massa eget, commodo gravida diam.
              Phasellus tempor bibendum nulla a sollicitudin. Nulla ex sem,
              fringilla aliquet egestas eget, consectetur in odio. Aliquam
              lacinia risus eu tellus pellentesque, et varius nisl condimentum.
              Aliquam pretium est sit amet faucibus tincidunt. Etiam bibendum
              vulputate enim quis mollis. Morbi convallis, arcu at scelerisque
              sollicitudin, massa turpis maximus nibh.
            </p>
            <Button
              component={Link}
              to={"/about"}
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                borderRadius: 2,
                color: "#fff",
                backgroundColor: "transparent",
                borderColor: "#fff",
                "&:hover": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
                "&:focus": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
              }}
            >
              Get started
            </Button>
          </div>
          <div className="flex-1 md:flex-2 mt-8 md:mt-0">
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
