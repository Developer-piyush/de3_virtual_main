import { AppBar, Box, Button, Container, IconButton, Link, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';
import { NearContext } from "../providers/NearProvider";
import logo from "../assets/images/logo.png";
import menuIcon from "../assets/images/menuIcon.png";
import logod3 from "../assets/images/logod3.png";
import discordIcon from "../assets/images/discordIcon.png";
import twitterIcon from "../assets/images/twitterIcon.png";
import theme from "../utils/muiTheme";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';

const pages = ['Dashboard', 'Map', 'Purchase Land', 'Collectibles', 'Discord', 'Twitter'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = makeStyles({
  justify: {
    justifyContent: "space-between",
    "&.MuiToolbar-gutters": {
      padding: 0,
    },
  },
  bg: {
    background: theme.Colors.darkBlue900,
    // borderBottom: "1px solid rgb(175 80 242 / 75%)",
    boxShadow: "0px 8px 13px -7px rgb(175 80 242 / 75%)",
  },
  textLight: {
    color: theme.Colors.lightBlue100,
  },
  textWhite: {
    color: theme.Colors.lightBlue100,
  },
  connectBtn: {
    padding: "6px 13px 6px 13px",
    border: "1px solid #AF50F2",
    borderRadius: "12px",
    background: "transparent",
    color: "#AF50F2",
    "&:hover": {
      padding: "6px 13px 6px 13px",
      border: "1px solid #AF50F2",
      borderRadius: "12px",
      background: "transparent",
      color: "white",
      transition: "color 0.3s ease-in-out",
    },
  },
  list: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: "0px",
    "& li": {
      marginRight: "16px",
      fontFamily: "Poppins, sans-serif",
    },
    "& a": {
      textDecoration: "none",
      color: "white",
      "&:hover": {
        color: "#AF50F2",
        transition: "color 0.3s ease-in-out",
      },
    },
  },
  icon: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFlter: "blur(10px)",
    borderRadius: "25px",
    padding: "8px 15px",
    color: "white",
    height: "max-content",
    marginRight: "5px",
    transition: "0.5s",
  },
});

function Header2() {

  const classes = useStyles();
  const {
    accountId,
    accountNearBalance,
    isConnecting,
    isSignedIn,
    login,
    userNfts,
  } = useContext(NearContext);
  const [nearToUsd, setNearToUsd] = useState();

  useEffect(() => {
    axios
      .get("https://helper.testnet.near.org/fiat", { withCredentials: true })
      .then((nearPrice) => {
        if (nearPrice) {
          setNearToUsd(nearPrice.data.near.usd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // adiing data into global states
  window.setStates({
    login: isSignedIn,
    userAddress: accountId,
    balance: {
      near: accountNearBalance,
      usd: accountNearBalance * nearToUsd,
    },
    nfts: userNfts,
  });


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={classes.bg} position="static">
      <Container maxWidth="xl">
        <Toolbar className={classes.justify} disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            {/* <img className={classes.img} src={logo} alt="Logo" /> */}
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <img
                src={logo}
                style={{ maxWidth: "55px", verticalAlign: "middle" }}
              />
              <img src={logod3} style={{ verticalAlign: "middle" }} />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img
              onClick={handleOpenNavMenu}
              src={menuIcon}
              style={{ paddingLeft: 15, maxWidth: "30px", verticalAlign: "middle" }}
            />
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/maps" style={{ color: "white", textDecoration: 'none' }}>Map</a>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/lands" style={{ color: "white", textDecoration: 'none' }}>Purchase Land</a>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/collectibles" style={{ color: "white", textDecoration: 'none' }}>My Collectibles</a>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/city" style={{ color: "white", textDecoration: 'none' }}>City</a>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/collectibles" style={{ color: "white", textDecoration: 'none' }}>
                  <Box className={classes.icon}>
                    <img className="v-align" src={discordIcon} />
                  </Box>
                </a>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <a href="/collectibles" style={{ color: "white", textDecoration: 'none' }}>
                  <Box className={classes.icon} style={{ padding: "8px" }}>
                    <img className="v-align" src={twitterIcon} />
                  </Box>
                </a>
              </MenuItem>

            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>


            <Box display="flex" alignItems="center" >
              <ul className={classes.list}>
                <li>
                  <a href="/maps">Map</a>
                </li>
                <li>
                  <a href="/lands">Purchase Land</a>
                </li>
                <li>
                  <a href="/collectibles">My Collectibles</a>
                </li>
                <li>
                  <a href="/city">City</a>
                </li>
                <li>
                  <a href="/collectibles">
                    <Box className={classes.icon}>
                      <img className="v-align" src={discordIcon} />
                    </Box>
                  </a>
                </li>
                <li>
                  <a href="/collectibles">
                    <Box className={classes.icon} style={{ padding: "8px" }}>
                      <img className="v-align" src={twitterIcon} />
                    </Box>
                  </a>
                </li>
              </ul>

            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>


            {accountId === null && accountNearBalance === null ? (
              <Button
                className={classes.connectBtn}
                variant="contained"
                color="primary"
                onClick={login}
              >
                Connect Wallet
              </Button>
            ) :
              <Box ml={1.5} component="span">
                <Typography className={classes.textLight} variant="h4">
                  {accountId}
                </Typography>
                <Typography className={classes.textLight} variant="h4">
                  {accountNearBalance}
                </Typography>
              </Box>

            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header2;
