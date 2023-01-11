import { Typography, Box, Grid, Container } from "@material-ui/core";
import React, { useContext } from "react";
import { NearContext } from "../providers/NearProvider";
import Header from "./Header";

export default function Collectibles() {
  const {
    accountId,
    accountNearBalance,
    isConnecting,
    isSignedIn,
    login,
    userNfts,
  } = useContext(NearContext);

  return (
    <>
      <Header />
      <Container>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Typography variant="h2" style={{ color: "#F393F0" }}>
            Collectibles
          </Typography>
          <Grid container style={{ marginTop: "40px" }}>
            {userNfts?.map((nft) => (
              <Box
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgb(243, 147, 240)",
                  borderRadius: "15px"
                }}
                mr={4}
                mb={4}
              >
                <img style={{ maxWidth: "250px", borderRadius: "15px 15px 0px 0px" }} src={"https://bafybeihh7ejsmmuljzy6vnxqfzh2t7kjtmlefuuzkwpdn2a4tiezv3whdm.ipfs.nftstorage.link/" + nft?.metadata?.media} />
                <Box mt={1.5}>
                  <Typography color="secondary" variant="body1">
                    {nft?.metadata?.title}
                  </Typography>
                  <Typography style={{ color: "#8393AF" }} variant="body1">
                    {nft?.metadata?.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
}
