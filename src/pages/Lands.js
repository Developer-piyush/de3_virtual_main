import { Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { NearContext } from "../providers/NearProvider";
import Header from "./Header";
import SuccessModal from "./SuccessModal";
import axios from "axios";

export default function Lands() {
  const { purchaseNFT, getPriceOfNft } = useContext(NearContext);

  const handleMint = async () => {
    // const nfts = await purchaseNFT("d3v#19", "Nabeel");
    // console.log("response of nfts after purchase", nfts);

    // const res = await axios.get(
    //   `${process.env.REACT_APP_BASE_URL}/gen/randomNft`
    // );

    // if (res?.data?.tokenId) {
    //   const price = await getPriceOfNft(res?.data?.tokenId);
    //   if (price !== null) {
    //     const nfts = await purchaseNFT(
    //       res?.data?.tokenId,
    //       price,
    //       "de3verse-testnet"
    //     );
    //   }
    // }

    window.open("https://mint.de3verse.com", '_blank')
  };

  const queryParams = new URLSearchParams(window.location.search);

  // console.log("queryParams", queryParams);
  // console.log("errorCode", queryParams.get("errorCode"));

  // console.log("transactionHashes", queryParams.get("transactionHashes"));

  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState(false);

  useEffect(() => {
    if (queryParams.get("transactionHashes")) {
      setOpen(true);
    } else if (queryParams.get("errorCode")) {
      setFail(true);
    }
  }, []);

  // console.log("open", open);
  // console.log("fail", fail);

  return (
    <>
      <Header />
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <Typography variant="h2" style={{ color: "#F393F0" }}>
          Get Your Land
        </Typography>
        <br />
        <Button
          style={{
            padding: "10px 40px",
            background:
              "linear-gradient(319deg, rgba(113, 10, 126, 1) 0%, rgba(243, 147, 240, 1) 0%, rgba(113, 10, 126, 1) 100%)",
          }}
          variant="contained"
          color="primary"
          onClick={handleMint}
        >
          Mint Now
        </Button>
      </div>

      <SuccessModal open={open} setOpen={setOpen} />
    </>
  );
}
