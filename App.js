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
    console.log("Home");
  }

  UserIsNotHome() {
    console.log("Not Home");
  }

  render() {
    return (
      <Container>
        <UserIsHomeContainer onPress={this.userIsHome}>
          <UserIsHomeButton>Home</UserIsHomeButton>
        </UserIsHomeContainer>
        <UserIsNotHomeContainer onPress={this.UserIsNotHome}>
          <UserIsNotHomeButton>Not Home</UserIsNotHomeButton>
        </UserIsNotHomeContainer>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #0000;
`;

const UserIsHomeContainer = styled.TouchableHighlight`
  background-color: #f7fff3;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 90%;
`;

const UserIsNotHomeContainer = styled(UserIsHomeContainer)`
  background-color: #fff0f1;
`;

const UserIsHomeButton = styled.Text``;

const UserIsNotHomeButton = styled(UserIsHomeButton)``;
