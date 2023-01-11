import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
export default function Card({ children, ...other }) {
  return (
    <Box {...other}>
      {children}
    </Box>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Card.defaultProps = {
  children: null,
};
