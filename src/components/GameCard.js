import * as PropTypes from "prop-types";
import Card from "./Card";
import {
  Box,
  List,
  ListItem,
  Chip,
  Typography,
  Button,
} from "@material-ui/core";
import theme from "../utils/muiTheme";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  img: {
    maxWidth: "100%",
    borderRadius: "8px 8px 0px 0px",
  },
  flex: {
    display: "flex",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  textWhite: {
    color: theme.Colors.lightBlue100,
  },
  textGray: {
    color: theme.Colors.lightBlue900,
  },
  listItem: {
    paddingTop: "0px",
  },
  chip: {
    height: "18px",
  },
});

export default function GameCard({
  imgUrl,
  title,
  description,
  tags,
  onOpenClick,
  ...other
}) {
  const classes = useStyles();

  return (
    <Card {...other}>
      {/* GameCard image */}
      {imgUrl != null && imgUrl !== "" && (
        <img
          className={classes.img}
          src={imgUrl}
          borderTopRadius={other.borderRadius ?? "lg"}
        />
      )}

      {/* GameCard content */}
      <Box p={2} display="flex" flexDirection="column">
        {/* Game tags */}
        {/* {tags != null && (
          <List className={classes.flex}>
            {tags.map((tag, idx) => {
              if (tag == null || tag === "") {
                return null;
              }

              return (
                <ListItem className={classes.listItem} key={idx}>
                  <Chip color="primary" className={classes.chip} label={tag} />
                </ListItem>
              );
            })}
          </List>
        )} */}

        {/* Game title */}
        <Typography className={classes.textWhite} variant="h3">
          {/* {title} */}
          Title
        </Typography>
        {/* Game tagline */}
        {description != null && description !== "" && (
          <Box mb={2}>
            <Typography className={classes.textGray} variant="body1">
              {/* {description} */}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry' type and scrambled it
              to make a type specimen book.
            </Typography>
          </Box>
        )}
        <Button color="secondary" variant="contained" onClick={onOpenClick}>
          <Typography className={classes.textWhite} variant="h4">
            Click Me
          </Typography>
        </Button>
      </Box>
    </Card>
  );
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onOpenClick: PropTypes.func,
};

GameCard.defaultProps = {
  imgUrl: null,
  description: null,
  tags: [],
  onOpenClick: null,
};
