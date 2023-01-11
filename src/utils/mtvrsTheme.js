import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: "Montserrat",
  body: "Montserrat",
};

const colors = {
  primary: {
    100: "#D9E6F2",
    300: "#8FB4DA",
    500: "#336699",
    700: "#24496D",
    900: "#162B41",
  },
  secondary: {
    100: "#FCE7E9",
    300: "#F19097",
    500: "#E53948",
    700: "#A81520",
    900: "#620C13",
  },
  greyscale: {
    100: "#FEFFFF", // Brand white
    300: "#AAB3BD",
    500: "#6F7882",
    700: "#353C42",
    900: "#020406", // Brand black
  },
  appBackground: {
    500: "#F6F9FC",
  },
};

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: "appBackground.500",
      color: "greyscale.900",
    },
  },
};

const fontSizes = {
  sm: "14px",
  md: "16px",
  lg: "22px",
  xl: "32px",
  "2xl": "44px",
  "3xl": "64px",
  "4xl": "84px",
  "5xl": "104px",
  "6xl": "124px",
};

const Button = {
  // The styles all button have in common
  baseStyle: {
    maxWidth: "400px",
    borderRadius: "100px",
    _hover: {
      textDecoration: "none",
    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Three variants: filled, outline and ghost
  variants: {
    filled: {
      bg: "secondary.500",
      color: "greyscale.100",
      _hover: {
        bg: "secondary.700",
      },
      _active: {
        bg: "secondary.900",
      }
    },
    outline: {
      borderColor: "primary.900",
      color: "primary.900",
      _hover: {
        bg: "primary.100",
      },
      _active: {
        bg: "primary.300",
      }
    },
    ghost: {
      color: "primary.900",
      _hover: {
        bg: "primary.100",
      },
      _active: {
        bg: "primary.300",
      }
    },
    sidebarBtn: {
      maxWidth: "100%",
      borderRadius: "8px",
      color: "greyscale.100",
      _hover: {
        bg: "primary.700",
      },
      _active: {
        bg: "primary.500",
      }
    },
    sidebarBtnComingSoon: {
      maxWidth: "100%",
      borderRadius: "8px",
      color: "greyscale.300",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};

const Text = {
  // Styles for the base style
  baseStyle: {
    fontSize:"md",
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    emptyState: {
      color: "greyscale.700",
      fontStyle: "italic",
    }
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

const mtvrsTheme = extendTheme({
  fonts,
  colors,
  styles,
  fontSizes,
  components: {
    Button,
    Text,
  },
});

export default mtvrsTheme;
