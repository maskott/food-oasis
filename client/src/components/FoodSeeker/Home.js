import React, { useEffect } from "react";
import { withRouter } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import Search from "components/FoodSeeker/Search";
// The three tenant logos happen to be the same at the moment
import logo from "images/foodoasis.svg";
import logoCA from "images/foodoasis.svg";
import logoHI from "images/foodoasis.svg";
import { tenantId, defaultCoordinates } from "helpers/Configuration";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  paper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "24px",
  },
  logoContainer: {
    margin: "20px 0 10px 0",
    textAlign: "center",
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontWeight: "500",
    fontSize: "20px",
    marginBottom: ".25em",
    color: "#4D4D4D",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: "0.5em",
    padding: "0 5vw",
    [theme.breakpoints.down("sm")]: {
      padding: "0 5vw",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0 8.5vw",
    },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#336699",
    padding: "10px 35px",
    borderRadius: "24px",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      padding: "15px",
    },
  },
  inputContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: "1em",
  },
  address: {
    marginTop: theme.spacing(1),
    paddingRight: 0,
  },
  inputRoot: {
    '&[class*="MuiOutlinedInput-root"]': {
      paddingRight: 0,
    },
  },
  endAdornment: {
    display: "none",
  },
  submit: {
    height: "40px",
    minWidth: "25px",
    backgroundColor: "#BCE76D",
    borderRadius: "0 6px 6px 0",
    // marginLeft: ".5em",
    boxShadow: "none",
    "& .MuiButton-startIcon": {
      marginRight: 0,
    },
    "&.Mui-disabled": {
      backgroundColor: "#BCE76D",
      opacity: 0.8,
    },
    "&:hover": {
      backgroundColor: "#C7F573",
      boxShadow: "none",
    },
  },
  logo: {
    width: 161,
    height: "auto",
    textAlign: "center",
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  learnMore: {
    fontSize: "19px",
    color: "white",
    textDecoration: "underline",
    "&:visited": {
      color: "white",
    },
  },
  locationBtn: {
    backgroundColor: '#4CAF50',
    color: "white",
    "&:hover": {
      backgroundColor: "#439846",
    },
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const {
    origin,
    setOrigin,
    userCoordinates,
    setUserCoordinates,
    browserLocation,
    setBrowserLocation
  } = props;

  useEffect(() => {
    window.stormly("event", "visitLandingPage");
  }, []);

  const useMyLocationTrigger = () => {
    let userCoordinates = { latitude: null, longitude: null };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            const userCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserCoordinates(userCoordinates);
            setBrowserLocation(true);
            setOrigin(userCoordinates);
            selectLocation(userCoordinates);
          }
        },
        (error) => {
          // Ususally because user has blocked location
          console.log(`Getting browser location failed: ${error.message}`);
          const userCoordinates = {
            latitude: defaultCoordinates.lat,
            longitude: defaultCoordinates.lon,
          };
          setUserCoordinates(userCoordinates);
          setBrowserLocation(false);
          selectLocation(userCoordinates);
        }
      );
    } else {
      console.log(
        "Browser does not support getting users location - using default location for area"
      );
      const userCoordinates = {
        latitude: defaultCoordinates.lat,
        longitude: defaultCoordinates.lon,
      };
      setUserCoordinates(userCoordinates);
      setBrowserLocation(false);
      selectLocation(userCoordinates);
    }
    return userCoordinates;
  };

  React.useEffect(() => {
    if (props.match.path === "/") {
      sessionStorage.clear();
    }
  }, [props.match.path]);

  const selectLocation = (origin) => {
    setOrigin(origin);
    props.history.push("/organizations");
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Box className={classes.logoContainer}>
          {tenantId === 3 ? (
            <img src={logoHI} alt="logo" className={classes.logo} />
          ) : tenantId === 2 ? (
            <img src={logoCA} alt="logo" className={classes.logo} />
          ) : (
            <img src={logo} alt="logo" className={classes.logo} />
          )}
        </Box>
        <Box className={classes.formContainer}>
          <form
            className={classes.form}
            onSubmit={() => props.history.push("/organizations")}
          >
            {tenantId === 5 ? (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in McKinney
              </Typography>
            ) : tenantId === 4 ? (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in Portland
              </Typography>
            ) : tenantId === 3 ? (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in Hawaii
              </Typography>
            ) : tenantId === 2 ? (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in California
              </Typography>
            ) : tenantId === 6 ? (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in Santa Barbara
              </Typography>
            ) : (
              <Typography variant={"h5"} className={classes.label}>
                Locate free food in Los Angeles
              </Typography>
            )}

            <Box className={classes.inputContainer}>
              <Search
                userCoordinates={userCoordinates}
                setOrigin={selectLocation}
                origin={origin}
                browserLocation={browserLocation}
                showSearchIcon
              />
              {/* <Button
                type="submit"
                disabled={isDefaultOrigin}
                variant="contained"
                className={classes.submit}
                startIcon={
                  <SearchIcon fontSize="large" className={classes.searchIcon} />
                }
              > 
                {""}
              </Button>*/}
            </Box>
            <Box className={classes.inputContainer}>
              <>
                or
              </>
            </Box>
            <Box className={classes.inputContainer}>
              {/* <Search
                userCoordinates={userCoordinates}
                setOrigin={selectLocation}
                origin={origin}
                browserLocation={browserLocation}
              /> */}
              <Button
                className={classes.locationBtn} 
                variant="contained" 
                fullWidth 
                startIcon={<LocationOnIcon />}
                onClick={useMyLocationTrigger}
              >
                Use my current location
              </Button>
            </Box>
            <Box className={classes.inputContainer}>
                <Link component={RouterLink} to="/about" className={classes.learnMore}>
                  Learn about this site
                </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Home);
