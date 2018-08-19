import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const Choices = (props) => {

    return <List>
    <ListItem button>
      {/*
      <Avatar>
        <BeachAccessIcon />
      </Avatar>
      */
      /*secondary="Jan 9, 2014" */
      }
      <ListItemText primary="Steht im Stau"  />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Sehr ungemütliche Leute" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Klimaanlage ausgefallen" />
    </ListItem>
  </List>;
}

export default Choices;