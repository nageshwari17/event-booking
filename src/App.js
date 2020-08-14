import React, { Fragment } from 'react';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header'
import EventList from './components/Events/EventList';
import EventBooking from './components/Events/EventBooking'
import './App.css';

const useStyles = makeStyles((theme) => ({
  Container : {
    marginTop: '40px'
  }
}));


function App() {
  const classes = useStyles();
  return (
    <Router>
      <Fragment>
        <Header />
        <Container fixed className={classes.Container}>
        <Switch>
          <Route exact path='/' component={EventList}></Route>
          <Route path='/event-booking/:id' component={EventBooking}></Route>
        </Switch>
        </Container>
      </Fragment>
    </Router>
  );
}

export default App;
