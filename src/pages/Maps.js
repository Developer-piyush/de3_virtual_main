import { CircularProgress, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "../components/Loading";
import Header from "./Header";
import { isMobile } from 'react-device-detect';


export default function Maps() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${process.env.REACT_APP_BASE_URL}/map/loader.js`,
    dataUrl: `${process.env.REACT_APP_BASE_URL}/map/data`,
    frameworkUrl: `${process.env.REACT_APP_BASE_URL}/map/framework.js`,
    codeUrl: `${process.env.REACT_APP_BASE_URL}/map/wasm`,
  });

  if (!isMobile) {

    return (
      <>
        <Header />
        {!isLoaded &&
          <Grid container justifyContent="center" style={{
            height: '100%',
            minHeight: "80vh",
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Loading value={loadingProgression * 100} />
          </Grid>
        }
        <Unity
          unityProvider={unityProvider}
          style={{ width: "100%", height: "90vh", visibility: isLoaded ? "visible" : "hidden" }}
        />

      </>
    );
  }

  return (
    <>
      <Header />
      <Grid container justifyContent="center" style={{
        height: '100%',
        minHeight: "80vh",
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography style={{ color: "white" }} align="center">Please open in PC/Laptop browser, mobile not supported</Typography>
      </Grid>
    </>
  )

}
