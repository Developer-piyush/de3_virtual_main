import {
  Button,
  Typography,
  Dialog,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import { NearContext } from "../providers/NearProvider";
import theme from "../utils/muiTheme";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@reach/router";

const useStyles = makeStyles({
  main: {
    backgroundColor: theme.Colors.darkBlue,
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "64px",
    },
  },
  btn: {
    minWidth: "300px",
    minHeight: "48px",
    background:
      "linear-gradient(319deg, rgba(113, 10, 126, 1) 0%, rgba(243, 147, 240, 1) 0%, rgba(113, 10, 126, 1) 100%)",
    [theme.breakpoints.down("xs")]: {
      minWidth: "300px",
    },
  },
  link: {
    textDecoration: "none",
  },
  borderBottom: {
    borderBottom: "1px solid rgba(35, 215, 240, 0.25)",
    "&:last-child": {
      borderBottom: "0",
    },
  },
});

export default function SuccessModal({ open, setOpen }) {
  const { purchaseNFT } = useContext(NearContext);

  const handleMint = async () => {
    const nfts = await purchaseNFT("d3v#10", "Nabeel");
    // console.log("nfts after purchase", nfts);
  };

  const queryParams = new URLSearchParams(window.location.search);
  console.log(queryParams.get("errorCode"));

  console.log(queryParams.get("transactionHashes"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog maxWidth="sm" open={open}>
        <Box px={mobile ? 2 : 10} py={mobile ? 2 : 4} textAlign="center">
          <Typography variant="h2" style={{ color: "#F393F0" }}>
            Awesome!
          </Typography>
          <Box mt={1} mb={mobile ? 3 : 4}>
            <Typography variant="body1" style={{ color: "#F393F0" }}>
              You have successfully minted the Land
              <span
                style={{
                  color: theme.Colors.white,
                  fontWeight: theme.FONT_WEIGHT.semiBold,
                }}
              >
                {/* {boughtTokenId} */}
              </span>
            </Typography>
          </Box>
          <Box mb={mobile ? 2 : 3.5}>
            <Button
              className={classes.btn}
              color="secondary"
              variant="contained"
            >
              <Link
                className={classes.link}
                to="/collectibles"
              >
              <Typography style={{ color: "#0f1749" }} variant="h6">
                Go to My Collectibles
              </Typography>
              </Link>
            </Button>
          </Box>
          <Button
            mb={mobile ? 2 : 0}
            onClick={handleClose}
            className={classes.btn}
            color="secondary"
            variant="contained"
          >
            <Link
                className={classes.link}
                to="/lands"
              >
            <Typography style={{ color: "#0f1749" }} variant="h6">
              Done
            </Typography>
            </Link>
          </Button>
        </Box>
      </Dialog>
      ;
    </>
  );
}
