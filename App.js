import React, { Component } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { StackNavigator } from "react-navigation";
import io from "socket.io-client";

import Main from "./components/Main";
import AddNote from "./components/userIsHome/AddNote";

const socketClient = io("http://45.77.159.108:7000");

const mapSocketClientToNavigation = Component => {
  return class extends Component {
    render() {
      const { navigation, ...other } = this.props;
      const {
        state: { params }
      } = navigation;
      return (
        <Component {...this.props} {...params} socketClient={socketClient} />
      );
    }
  };
};

const App = StackNavigator({
  Home: { screen: mapSocketClientToNavigation(Main) },
  AddNote: { screen: mapSocketClientToNavigation(AddNote) }
});

export default () => <App />;
