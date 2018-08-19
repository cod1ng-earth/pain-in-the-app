import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import axios from 'axios';

const mockIncidents = [
  {
    "id": "c88f9aab0",
    "timestamp": "2018-08-18T22:18:18+00:00",
    "beaconId": "x3m43",
    "trip": "M37",
    "wagon": 1,
    "feeling": "super gekühlt",
    "happening": "Klimaanlage läuft super"
},
{
  "id": "a89f9aab0",
  "timestamp": "2018-08-18T22:16:30+00:00",
  "beaconId": "x3m21",
  "trip": "U7",
  "wagon": 3,
  "feeling": "schlecht",
  "happening": "nochmal Kotze in der Ecke2"
}
]
class  IncidentList extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      incidents: []
    }
  }

  componentDidMount() {
    axios.get('https://master-7rqtwti-sj5exd4ymwjcu.eu-2.platformsh.site/bvg/data_output')
    .then(response => {
      this.setState({incidents: response.data});
      //console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    

  }

  render() {
/*
      <Avatar>
        <BeachAccessIcon />
      </Avatar>
      */
      /*secondary="Jan 9, 2014" */
    
    const items = this.state.incidents.map( (inc) => {
        return <ListItem button key={inc.id}>
        <Avatar>
          {inc.trip}
        </Avatar>
          <ListItemText primary={inc.feeling} secondary={inc.happening} />
        </ListItem>
    })
    return <List>
      {items}
      </List>;
  }
    
}

export default IncidentList;