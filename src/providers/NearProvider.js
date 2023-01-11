import { createContext, useCallback, useEffect, useState } from "react";
import { connect, keyStores, WalletConnection, utils } from "near-api-js";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import NFT from "../models/NFT";
import Purchasable from "../models/Purchasable";
import viewToMax from "../utils/viewToMax";

// --- Production: mainnet ---
const config = {
  networkId: "mainnet",
  contractName: "de3verse_deploy.near",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

// --- Development: testnet ---
// const config = {
//   networkId: "testnet",
//   contractName: "collectiontesting.testnet",
//   nodeUrl: "https://rpc.testnet.near.org",
//   walletUrl: "https://wallet.testnet.near.org",
//   helperUrl: "https://helper.testnet.near.org",
//   explorerUrl: "https://explorer.testnet.near.org",
// };

const GAS = "300000000000000"; // max gas for any transaction

export const NearContext = createContext({});

export default function NearProvider({ children }) {
  // Internal state
  const [, setNearConnection] = useState(null);
  const [walletConnection, setWalletConnection] = useState(null);
  const [accountId, setAccountId] = useState(null);

  // External state.
  const [isConnecting, setIsConnecting] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggingIn] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountNearBalance, setAccountNearBalance] = useState(null);
  const [userNfts, setUserNfts] = useState([]);

  useEffect(() => {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connectNear = async () => {
      try {
        const near = await connect({ ...config, keyStore });
        const walletConnection = new WalletConnection(near);

        setNearConnection(near);
        setWalletConnection(walletConnection);

        if (walletConnection.isSignedIn()) {
          const account = walletConnection.account();
          localStorage.setItem("token", walletConnection.getAccountId());
          setAccount(account);
          setAccountId(walletConnection.getAccountId());
          setIsSignedIn(true);
        }
      } catch (e) {
        console.error(e);
        setIsError(true);
      }
      setIsConnecting(false);
    };

    connectNear();
  }, []);

  const getAccountAndNearBalance = useCallback(async () => {
    if (account == null) {
      localStorage.setItem("token", "");
      setAccountNearBalance(null);
      return;
    }

    let balance;
    try {
      balance = await account.getAccountBalance();
    } catch (e) {
      console.error(e);
      setAccountNearBalance(null);
      return;
    }

    setAccountNearBalance(utils.format.formatNearAmount(balance.available, 2));
  }, [account]);

  useEffect(() => {
    // Fetch the near balance.
    getAccountAndNearBalance();
  }, [getAccountAndNearBalance]);

  const login = useCallback(() => {
    walletConnection?.requestSignIn({
      contractId: process.env.REACT_APP_CONTRACT_NAME,
    });
  }, [walletConnection]);

  const logout = useCallback(() => {
    walletConnection?.signOut();
    setIsSignedIn(false);
    setAccountId(null);
    setAccount(null);
  }, [walletConnection]);

  const getNftsForAccount = useCallback(async () => {
    if (account == null || accountId == null) {
      throw new Error("account must be defined");
    }

    const tokens = await account?.viewFunction(
      process.env.REACT_APP_CONTRACT_NAME,
      "nft_tokens_for_owner",
      { account_id: accountId }
    );

    return tokens;

    return (tokens ?? []).map(NFT.fromNear);
  }, [account, accountId]);

  const getPriceOfNft = useCallback(
    async (tokenId) => {
      if (account == null) {
        throw new Error("Account must be defined");
      }

      return account?.viewFunction(
        process.env.REACT_APP_CONTRACT_NAME,
        "get_price_of_nft",
        { token_id: tokenId }
      );
    },
    [account]
  );

  useEffect(() => {
    const nfts = getNftsForAccount();
    nfts
      .then((res) => {
        const toStore = res.map((nft) => {
          return {
            title: nft?.metadata?.title,
            description: nft?.metadata?.description,
            media: nft?.metadata?.media,
          }
        })
        localStorage.setItem("nfts", JSON.stringify(toStore));
        setUserNfts(res);
      })
      .catch((err) => { });
  }, [account, accountId]);

  const getMetadataForToken = useCallback(
    async (tokenType) => {
      if (account == null) {
        throw new Error("account must be defined");
      }

      const token = await account.viewFunction(
        process.env.REACT_APP_CONTRACT_NAME,
        "metadata_get",
        {
          token_type: tokenType,
        }
      );

      if (token == null) {
        return null;
      }

      const tokenList = await viewToMax(
        account,
        process.env.REACT_APP_CONTRACT_NAME,
        "minted_tokens_list",
        { token_type: tokenType },
        "offset"
      );

      const tokenMaxSupply = parseInt(token.copies);
      const numOfMintedTokens = tokenList?.length ?? 0;

      const isAvailable =
        !isNaN(tokenMaxSupply) && numOfMintedTokens < tokenMaxSupply;

      return Purchasable.fromNear(tokenType, token, isAvailable);
    },
    [account]
  );

  const purchaseNFT = useCallback(
    async (tokenId, priceOfNft, collectionId) => {
      // let price = Number(priceOfNft).toFixed(1);
      // let amount = price.toString();
      let price = priceOfNft + 2;
      // console.log("price", price)
      // debugger
      if (account == null) {
        throw new Error("Account must be defined");
      }

      return account.functionCall({
        contractId: process.env.REACT_APP_CONTRACT_NAME,
        methodName: "mint_nft",
        args: {
          token_id: tokenId,
          collection_id: collectionId,
        },
        gas: GAS,
        attachedDeposit: price,
        // attachedDeposit: parseNearAmount(amount),
      });
    },
    [account]
  );

  const redeemSurprisePack = useCallback(
    (tokenId) => {
      if (account == null) {
        throw new Error("Account must be defined");
      }

      return account.functionCall({
        contractId: process.env.REACT_APP_CONTRACT_NAME,
        methodName: "metamon_redeem_surprise_pack",
        args: {
          token_id: tokenId,
        },
        gas: GAS,
      });
    },
    [account]
  );

  const evolveToNextGeneration = useCallback(
    (firstTokenId, secondTokenId) => {
      if (
        firstTokenId == null ||
        secondTokenId == null ||
        firstTokenId === "" ||
        secondTokenId === "" ||
        firstTokenId === secondTokenId
      ) {
        throw new Error("Tokens must be unique and defined");
      }

      if (account == null) {
        throw new Error("Accoutn msut be defined");
      }

      return account.functionCall({
        contractId: process.env.REACT_APP_CONTRACT_NAME,
        methodName: "metamon_evolve",
        args: {
          token1_id: firstTokenId,
          token2_id: secondTokenId,
        },
        gas: GAS,
      });
    },
    [account]
  );

  return (
    <NearContext.Provider
      value={{
        isConnecting,
        isLoggingIn,
        isError,
        isSignedIn,
        login,
        logout,
        accountNearBalance,
        accountId,
        getAccountAndNearBalance,
        getNftsForAccount,
        purchaseNFT,
        redeemSurprisePack,
        getMetadataForToken,
        evolveToNextGeneration,
        userNfts,
        getPriceOfNft
      }}
    >
      {children}
    </NearContext.Provider>
  );
}


