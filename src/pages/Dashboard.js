import Sidebar from "../components/Sidebar";
import Header from "./Header";
import { Box, Container, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import balance from "../assets/images/balance.svg";
import myGame1 from "../assets/images/myGames1.svg";
import myGame2 from "../assets/images/myGames2.svg";
import collectibles from "../assets/images/collectibles.png";
import theme from "../utils/muiTheme";
import GameCard from "../components/GameCard";
import { navigate } from "@reach/router";
import useSWR from "swr";
import prismicFetcher from "../utils/prismicFetcher";
import { RichText } from "prismic-reactjs";
import { useContext } from "react";
import { NearContext } from "../providers/NearProvider";
import { FETCH_OWNED_NFTS } from "../utils/constants";
import logo from "../assets/images/logo.png";

const useStyles = makeStyles({
  main: {
    background: theme.Colors.darkBlue900,
    minHeight: "100vh",
  },
  head: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    fontSize: "76px",
    margin: "0px",
    letterSpacing: "-2px",
    background:
      "conic-gradient(from 180deg at 50% 50%, #E018E7 0deg, #7976E8 360deg)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    textAlign: "center",
  },
  subHead: {
    fontFamily: "'Poppins', sans-serif",
    color: "white",
    fontWeight: "200",
    fontSize: "55px",
    marginTop: "-13px",
    marginBottom: "10px",
    "& span": {
      /* color: #F393F0; */
      background:
        "conic-gradient(from 180deg at 50% 50%, #7976E8 0deg, #B3B3B3 360deg)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    },
  },
  para: {
    color: "white",
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
  },
  mintBtn: {
    background:
      "linear-gradient(319deg, rgba(113, 10, 126, 1) 0%, rgba(243, 147, 240, 1) 0%, rgba(113, 10, 126, 1) 100%)",
    padding: "10px 14px 10px 14px",
    borderRadius: "11px",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const { data: games } = useSWR("game", prismicFetcher);
  const { isConnecting, getNftsForAccount } = useContext(NearContext);
  const isGamesLoading = games == null;
  const { data: ownedNfts } = useSWR(
    !isConnecting && !isGamesLoading ? FETCH_OWNED_NFTS : null,
    getNftsForAccount
  );

  const isNftsLoading = ownedNfts == null;

  return (
    <>
      {/* Header */}
      <Header />

      {/* Show main page content */}
      <Box component="section" className={classes.main} py={3.8}>
        <Container maxWidth="lg">
          <Box mt={5}>
            <Grid container spacing={6} style={{ alignItems: "center" }}>
              <Grid item md={6}>
                <Box>
                  <Typography className={classes.head} variant="h2">
                    De3Verse
                  </Typography>
                  <Typography className={classes.subHead} variant="h2">
                    Dive Into<span> New World</span>
                  </Typography>
                  <Typography className={classes.para} variant="body1">
                    With de3Verse you can see the digital world feel more real
                    and you can explore with a new style.
                  </Typography>
                  <Box textAlign="center" mt={3}>
                    <Button
                      className={classes.mintBtn}
                      variant="contained"
                      color="primary"
                      href="/city"
                    >
                      Explore
                    </Button>
                    <Button
                      style={{ marginLeft: "24px" }}
                      variant="outlined"
                      color="secondary"
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box>
                  <img width="100%" src={logo} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
