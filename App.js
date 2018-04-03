import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import styled from "styled-components";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      userIsHome: false
    };
  }

  userIsHome() {
    console.log('Home');
  }

  UserIsNotHome() {
    console.log("Not Home");
  }

  render() {
    return (
      <Container>
        <UserIsHome
          onPress={this.userIsHome}
          title="Home"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <UserIsNotHome
          onPress={this.userIsNotHome}
          title="Not Home"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #282A36;
`;

const UserIsHome = styled.Button`
  background: blue;
  width: 200px;
  height: 50px;
`;

const UserIsNotHome = styled.Button`
  background: blue;
  width: 200px;
  height: 50px;
`;
