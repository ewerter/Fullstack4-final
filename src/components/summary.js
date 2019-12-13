import React, { Fragment } from "react";
import "./summary.css";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Button } from "@material-ui/core";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { typography } from "@material-ui/system";
import { useHistory } from "react-router-dom";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import firebase from "../firebase";

function SummaryPage(props) {
  const [metamaskAddr, setMetamaskAddr] = React.useState("");
  const [savedUsername, setSavedUsername] = React.useState("");
  let temperature = props.temperature;
  let birthday = props.selectedDate;
  let candidate = props.candidate;
  let happiness = props.happiness;
  let province = props.province;
  let history = useHistory();

  function castVote() {
    const db = firebase.firestore();
    const increment = firebase.firestore.FieldValue.increment(1);
    const batch = db.batch();
    let candidateRef = db.collection("Results").doc("Candidate");
    let birthdayRef = db.collection("Results").doc("birthday");
    let happinessRef = db.collection("Results").doc("happiness");
    let provinceRef = db.collection("Results").doc("province");
    let temperatureRef = db.collection("Results").doc("temperature");
    batch.set(
      candidateRef,
      { [window.localStorage.getItem("candidate")]: increment },
      { merge: true }
    );
    batch.set(
      birthdayRef,
      { [window.localStorage.getItem("birthday")]: increment },
      { merge: true }
    );
    batch.set(
      happinessRef,
      { [window.localStorage.getItem("happiness")]: increment },
      { merge: true }
    );
    batch.set(
      provinceRef,
      { [window.localStorage.getItem("province")]: increment },
      { merge: true }
    );
    batch.set(
      temperatureRef,
      { [window.localStorage.getItem("temperature")]: increment },
      { merge: true }
    );
    batch.commit();
  }

  //  db.collection("Results")
  //   .onSnapshot(snapshot => {
  //     let votesFirebase = snapshot.docs.map(doc => ({
  //       ...doc.data()
  //     }));
  //     db.collection("Results").doc("Candidate")
  //       .set(window.localStorage.getItem("vote")":"(votesFirebase[0][window.localStorage.getItem("vote")] + 1)
  //     )

  // });

  const onClick = async () => {
    try {
      castVote();
      const accounts = await window.ethereum
        .enable()
        .then(data => console.log(data));
    } catch (error) {
      if (error.code === 4001) {
        console.log("Error msg: " + error.message);
        // setSavedUsername("");
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Typography variant="body1" display="block" gutterBottom>
        Cast Your Vote
      </Typography>
      <Typography variant="h4" display="block" gutterBottom>
        Summary
      </Typography>
      <Typography variant="body2" display="block" gutterBottom>
        Who is your favorite candidate?
      </Typography>
      <div className="summary-answers-text" display="block">
        {candidate}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        How happy are you with the current candidate?
      </Typography>
      <div className="summary-answers-text" display="block">
        {happiness}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        When is your birthday?
      </Typography>
      <div className="summary-answers-text" display="block">
        {birthday.toString('yyyy-mm-dd')}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        Which province do you reside in?
      </Typography>
      <div className="summary-answers-text" display="block">
        {province}
      </div>

      <Typography variant="body2" display="block" gutterBottom>
        What is your ideal room temperature?
      </Typography>
      <div className="summary-answers-text" display="block">
        {temperature} °C
      </div>
      <Box m={1} />
      <TextField
        className="textfield-donate"
        id="outlined-basic"
        variant="outlined"
        label="Donate ETH to your candidate (optional)"
      />
      <Box m={1} />
      <TextField
        className="textfield-donate"
        id="outlined-basic"
        label="Donate ETH to charity (optional)"
        variant="outlined"
      />
      <Box m={1} />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={onClick}>
            {" "}
            <DoneAllIcon />
            <Typography variant="button"> Cast Votes</Typography>
          </Button>
        </Grid>
        <Box m={1} />
        <Grid item>
          <Button
            variant="outlined"
            type="button"
            onClick={() => history.goBack()}
          >
            <Typography variant="button">back</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SummaryPage;
