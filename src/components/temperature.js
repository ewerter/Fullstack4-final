import "../App.css";
import React from "react";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ethers } from "ethers";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory
} from "react-router-dom";

 function TemperaturePage(props){
    const [temperature, setTemperature] = React.useState(null)
    const history = useHistory()
    const useStyles = makeStyles(theme => ({
      root: {
        width: 300
      },
      margin: {
        height: theme.spacing(3)
      }
    }));
  
    const marks = [
      {
        value: 0,
        label: "0°C"
      },
      {
        value: 20,
        label: "20°C"
      },
      {
        value: 37,
        label: "37°C"
      },
      {
        value: 100,
        label: "100°C"
      }
    ];
  
  
    const onClickNext = () =>{
      history.push('/voting/summary')
    }
    const onClickPrev = () =>{
      history.goBack();
    }
    
      function valuetext(value) {
      setTemperature(value);
      return `${value}°C`;
    }
  
    function valueLabelFormat(value) {
      return marks.findIndex(mark => mark.value === value) + 1;
    }
    const classes = useStyles();
    return (
      <div className={classes.margin}>
        <Link to="/" component={RouterLink}>
          Back to start
        </Link>
        <Typography id="discrete-slider-always" gutterBottom>
          <h2>
            Temperature
          </h2>
        </Typography>
        <Box m={10} />
  
        <Slider
          defaultValue={null}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          marks={marks}
        />
        <div>
          <Grid containerspacing={1} alignContent='right'>
  
            <Box m={1} />
              <Button
                disabled={!temperature}
                variant='contained'
                color='primary'
                onClick={onClickNext}
                
              >
                Next
              </Button>
          </Grid>    
        </div>
       
  
        <div>
        <Grid alignItems='left'>
        <Box m={1} />
            <Button
              align
              disabled={temperature}
              variant='contained'
              color='primary'
              onClick={onClickPrev}
              
            >
              Previous
            </Button>
        </Grid>
        </div>
      </div>
    );
  }
  
  export default TemperaturePage;
  