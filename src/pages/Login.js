// import { Flex, Heading, Text, Image, Link, Button, Container } from "@chakra-ui/react";
import {
  Link,
  Typography,
  Box,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import logoWhite from "../assets/images/mtvr-white.svg";
import { useContext } from "react";
import { NearContext } from "../providers/NearProvider";
import { Redirect } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../utils/muiTheme";
import walletImg from "../assets/images/wallet.png";
import backArrow from "../assets/images/backArrow.svg";
import { typography } from "@chakra-ui/styled-system";
// import { ArrowBackIcon } from "@chakra-ui/icons";

const useStyles = makeStyles({
  bgRed: {
    background: theme.Colors.red500,
    clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
  },
  bgBlue: {
    backgroundColor: theme.Colors.blue700,
  },
  bgBlack: {
    backgroundColor: theme.Colors.darkBlue700,
  },
  btn1: {
    marginTop: "64px",
    padding: "5px 0px",
    width: "100%",
  },
  btn2: {
    marginTop: "24px",
    padding: "5px 0px",
    width: "100%",
    marginBottom: "64px",
  },
  logoWhite: {
    width: "40%",
    maxWidth: "100%",
    marginBottom: "68px",
    marginTop: "51px",
  },
  walletImg: {
    maxWidth: "100%",
    marginBottom: "46px",
  },
  lightBlue100: {
    color: theme.Colors.lightBlue100,
    marginBottom: "12px",
  },
  lightBlue900: {
    color: theme.Colors.lightBlue900,
    padding: "0px 10px",
  },
  mt: {
    marginTop: "68px",
    marginLeft: "-10px",
  },
});

export default function Login() {
  const classes = useStyles();
  const { isConnecting, isSignedIn, login } = useContext(NearContext);

  if (!isConnecting && isSignedIn) {
    return <Redirect to="dashboard" noThrow="noThrow" />;
  }

  return (
    <Box component="section">
      {/* <Box className={classes.bg}> */}
      <Box>
        {/* <Container> */}
        <Grid container>
          {/* <Grid item md={6}>
            <Box height="100%" className={classes.bgBlue}>
              <Box height="50%" width="100%" className={classes.bgRed}></Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50%"
                width="100%"
                className={classes.bgBlue}
              >
                <img src={logoWhite} alt={"logo"} />
              </Box>
            </Box>
          </Grid> */}
          <Grid item md={12} sm={12}>
            <Box height="100%" width="100%" className={classes.bgBlack}>
              <Container maxWidth="sm">
                {/* <Box>
                  <Button
                    className={classes.mt}
                    as={Link}
                    href="https://mtvrs.app"
                  >
                    <img src={backArrow} />
                  </Button>
                </Box> */}
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  minHeight="100vh"
                >
                  {/* <img
                    className={classes.logoWhite}
                    src={logoWhite}
                    alt={"logo"}
                  /> */}
                  <img
                    className={classes.walletImg}
                    src={walletImg}
                    alt={"wallet"}
                  />
                  <Typography className={classes.lightBlue100} variant="h3">
                    Connect Wallet
                  </Typography>
                  <Typography className={classes.lightBlue900} variant="body1">
                    Join the De3Verse to start playing blockchain-powered metaverse
                    and get lands.
                  </Typography>
                  <Button
                    onClick={login}
                    className={classes.btn1}
                    color="secondary"
                    variant="contained"
                  >
                    <Typography variant="h4">Login with NEAR</Typography>
                  </Button>
                  <Button
                    as={Link}
                    href="https://wallet.near.org/"
                    className={classes.btn2}
                    color="default"
                    variant="outlined"
                  >
                    <Typography variant="h4">Create NEAR account</Typography>
                  </Button>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Box>
      {/* </Box> */}
    </Box>
  );
}
