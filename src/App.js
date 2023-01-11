import "@fontsource/montserrat/500.css";
import "./css/index.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { Redirect, Router } from "@reach/router";
import Login from "./pages/Login";
import theme from "./utils/muiTheme";
import Dashboard from "./pages/Dashboard";
import NearProvider, { NearContext } from "./providers/NearProvider";
import { useContext } from "react";
import Maps from "./pages/Maps";
import Lands from "./pages/Lands";
import Collectibles from "./pages/Collectibles";
import MyLand from "./pages/MyLand";
import City from "./pages/City";
import GreenLand from "./pages/GreenLand";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NearProvider>
        <MTVRSRouter />
      </NearProvider>
    </ThemeProvider>
  );
}

function MTVRSRouter() {
  return (
    <Router>
      <Login path="/" />
      <Dashboard path="/dashboard" />
      <Maps path="maps" />
      <Lands path="lands" />
      <MyLand path="myland" />
      <GreenLand path="greenland" />
      <City path="city" />
      <Collectibles path="collectibles" />
    </Router>
  );
}

function PrivateRoute({ component: Component, path, ...other }) {
  const { isConnecting, isSignedIn } = useContext(NearContext);

  if (!isConnecting && !isSignedIn) {
    return <Redirect to="/" noThrow />;
  }

  return <Component path={path} {...other} />;
}

export default App;
