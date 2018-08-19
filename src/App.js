import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';

import IncidentList from './components/IncidentList';
import TextField from '@material-ui/core/TextField';
import Suggester from './components/Suggester';
//import Snackbar from '@material-ui/core/Snackbar';

const suggestions = {
  locations: [
    {label: 'M48, vorne'},
    {label: 'M48, hinten'},
    {label: 'U7, Wg 1'},
    {label: 'U7, Wg 2'}
  ],
  moods: [
    {label: 'genervt'},
    {label: 'erfreut'},
    {label: 'verstört'},
  ],
  incidents: [
    {label: 'Unfall'},
    {label: 'Hunde im Abteil'},
    {label: 'Kindergarten zugestiegen'},
    {label: 'Menschen schreien sich an'},
  ]
};

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    color: 'white'
  },
  heroContent: {
    //maxWidth: 600,
    margin: '0 auto',
    //padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    flexGrow: 1
  },
  typo: {
    display: 'inline-flex'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  shape: {
    borderRadius: 0
  }
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      incident: {},
      submittable: false
    }

    this.changed = this.changed.bind(this);
    this.acquireLocation = this.acquireLocation.bind(this);
  }

  changed(what, value) {
    const incident = this.state.incident;
    incident[what] = value;
    const submittable = incident['location'] && incident['mood'] && incident['incident']
    this.setState({ incident, submittable })

  }


  submitIncident() {
    
      console.log("submitted");
  }

  acquireLocation() {
    if (this.props.withBeacons) {
      console.log("starting listeners");
      var listener = function(data) {
        console.log("keys: " + Object.keys(data));
        console.log("values: " + Object.values(data));
      }
      window.broadcaster.addEventListener( "BeaconServiceRegionEnter", listener);
      window.broadcaster.addEventListener( "BeaconServiceRegionUpdate", listener);  
    } else {
      console.log("acquired location");
    }
    
  }

  render() {
    const { classes } = this.props;
    const submitDisabled = false && 'disabled';

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
            <IconButton
                  aria-owns={null}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={this.acquireLocation}
                >
                  <PauseIcon />
                </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Painpal
              </Typography>
            </Toolbar>
          </AppBar>
          <main>

        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
      
          <Paper className={classes.root} >
                <Typography variant="title" color="inherit" className={classes.typo} >
                    Ich bin im               
                </Typography>
                <Suggester suggestions={suggestions.locations} placeholder="Verkehrsmittel" aspect="location" onChange={this.changed} /> 
              </Paper>
              <Paper className={classes.root}>
               
                    <Typography variant="title" color="inherit"  className={classes.typo}>
                    und fühle mich
                    </Typography>
                    <Suggester suggestions={suggestions.moods} placeholder="aufgeregt, genervt, begeistert" aspect="mood" onChange={this.changed} />
              </Paper>
              <Paper className={classes.root}>
                    <Typography variant="title" color="inherit"  className={classes.typo}>
                    weil  
                    </Typography>
                    <Suggester suggestions={suggestions.incidents} placeholder="eine Bierflasche hier herumrollt" aspect="incident" onChange={this.changed} />
              </Paper>
              <Paper className={classes.root}>
                <Button variant="contained" color="primary" disabled={!this.state.submittable} className={classes.button} onClick={this.submitIncident}>
                  Melden
                </Button>
              </Paper>
            
          </div>
        </div>

        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
          <Paper className={classes.root} elevation={1}>
            <IncidentList />
          </Paper>
          </div>
        </div>
        
      </main>
      
      <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
      </MuiThemeProvider>
    </React.Fragment>
    );
  }
}


export default withStyles(styles)(App);

