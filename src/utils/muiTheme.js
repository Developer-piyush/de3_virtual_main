import { createTheme } from "@material-ui/core/styles";

// colors
const Colors = {
  // red100: "#FCE7E9",
  // red300: "#F19097",
  red500: "#E53948",
  red700: "#E20001",
  // red900: "#620C13",

  blue100: "#D9E6F2",
  blue300: "#8FB4DA",
  blue500: "#336699",
  blue700: "#24496D",
  blue900: "#162B41",

  // darkBlue100: "#7B8C9D",
  darkBlue300: "#51606E",
  darkBlue500: "#333C44",
  // darkBlue700: "#1E2429",
  darkBlue900: "#0f1749",

  lightBlue100: "#FEFFFF",
  lightBlue300: "#F6F8F9",
  lightBlue500: "#E8EBEE",
  lightBlue700: "#D4DADF",
  lightBlue900: "#C0C9D1",

  purple: "#AF50F2",
  pink: "#F393F0",
  pinkGradient: "linear-gradient(90.54deg, #91092A -38.38%, #661256 49.51%, #540B31 135.35%)"
};

// typography
const FONT_FAMILY = {
  montserrat: "Montserrat, sans-serif",
  poppins: "Poppins, sans-serif",
};

const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const theme = createTheme({
  FONT_WEIGHT,
  Colors,
  palette: {
    primary: {
      main: Colors.pink,
    },
    secondary: {
      main: Colors.purple,
    },
  },

  typography: {
    fontFamily: FONT_FAMILY.poppins,
    color: Colors.lightBlue900,
    h1: {
      fontSize: "4.75rem", //4.75rem = 76px
      fontWeight: FONT_WEIGHT.semiBold,
    },
    h2: {
      fontSize: "3.438rem", //3.438rem = 55px
      fontWeight: FONT_WEIGHT.semiBold,
    },
    h3: {
      fontSize: "1.5rem", //1.5rem = 24px
      fontWeight: FONT_WEIGHT.bold,
    },
    h4: {
      fontSize: "1.125rem", //1.125rem = 18px
      fontWeight: FONT_WEIGHT.bold,
    },
    body1: {
      fontSize: "1rem", //1rem = 16px
      fontWeight: FONT_WEIGHT.regular,
    },
    body2: {
      fontSize: "0.75rem", //0.75rem = 12px
      fontWeight: FONT_WEIGHT.regular,
    },

    //   //button
    //   button: {
    //     textTransform: "none",
    // }
  },

  //overrides
  overrides: {
    //Button
    MuiButton: {
      root: {
        borderRadius: "100px",
        textTransform: "none",
        // "&:hover": {
        //     boxShadow: "none"
        // }
        "&.MuiButton-outlined": {
          color: Colors.lightBlue900,
          borderColor: Colors.lightBlue900,
        },
      },
    },

    MuiListItem: {
      root: {
        width: "auto",
        "&.MuiListItem-gutters": {
          paddingLeft: "0px",
        },
      },
    },

    MuiContainer: {
      root: {
        // [defaultTheme.breakpoints.down('sm')]: {
        // marginLeft: "0",
        // marginRight: "0",
        paddingLeft: "0",
        paddingRight: "0",
        // },
      },
      maxWidthMd: {
        maxWidth: "1000px !important",
      },
      maxWidthLg: {
        maxWidth: "1200px !important",
      },
      maxWidthXl: {
        maxWidth: "1440px !important",
      },
    },

    MuiMenu: {
      paper: {
        marginTop: "50px",
        marginLeft: "25px",
        backgroundColor: Colors.darkBlue300,
        width: "210px",
        height: "146px",
        borderRadius: "16px",
      },
      list: {
        color: Colors.lightBlue100,
        padding: "0px",
      },
    },

    MuiListItem: {
      gutters: {
        paddingLeft: "24px",
      },
    },

    MuiIconButton: {
      label: {
        color: Colors.lightBlue100,
      },
    },

    MuiDrawer: {
      paper: {
        width: "462px",
        minHeight: "100%",
        backgroundColor: Colors.blue900,
      },
    },

    MuiDialog: {
      paper: {
        background: Colors.pinkGradient,
        maxWidth: "100%",
        borderRadius: "16px",
      },
      paperWidthMd: {
        maxWidth: "700px !important",
      },
    },
  },
});

export default theme;
