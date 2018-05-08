import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { StyleSheet, Text, View, Button, Image } from "react-native";

// Components
import AddNote from "./userIsHome/AddNote";

class Main extends Component {
  static navigationOptions = {
    title: "Home"
  };

  _isUserHome(isHome) {
    const { navigate } = this.props.navigation;
    if (isHome) {
      this.props.socketClient.emit("package:change-home-notification", {
        atHome: true,
        deliveryId: '5ae1bc56073bf525962418a6'
      });
      navigate("AddNote", { name: "Note" });
      console.log("Home");
    } else {
      this.props.socketClient.emit("package:change-home-notification", {
        atHome: false,
        deliveryId: '5ae1bc56073bf525962418a6'
      });
      console.log("Not Home");
    }
  }

  render() {
    return (
      <Container>
        <LogoWrapper>
          <Logo source={require("../images/FedEx-brand.png")} />
        </LogoWrapper>

        <UserIsHomeContainer
          onPress={() => this._isUserHome(true)}
          underlayColor="#7CE065"
        >
          <UserIsHomeContentContainer>
            <UserIsHomeIcon source={require("../images/icon/home.png")} />
            <UserIsHomeButton>Home</UserIsHomeButton>
          </UserIsHomeContentContainer>
        </UserIsHomeContainer>

        <UserIsNotHomeContainer
          onPress={() => this._isUserHome(false)}
          underlayColor="#FF8389"
        >
          <UserIsNotHomeContentContainer>
            <UserIsHomeIcon source={require("../images/icon/not-home.png")} />
            <UserIsNotHomeButton>Not Home</UserIsNotHomeButton>
          </UserIsNotHomeContentContainer>
        </UserIsNotHomeContainer>
      </Container>
    );
  }
}

export default Main;

const Container = styled.View`
  background: #fff;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const LogoWrapper = styled.View`
  margin-bottom: 50;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image``;

const UserIsHomeContainer = styled.TouchableHighlight`
  background-color: #f7fff3;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 150px;
  width: 300px;
`;

const UserIsHomeContentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserIsNotHomeContentContainer = styled(UserIsHomeContentContainer)``;

const UserIsHomeButton = styled.Text`
  color: #818181;
  font-size: 18;
  margin-left: 15;
`;

const UserIsNotHomeButton = styled(UserIsHomeButton)``;

const UserIsHomeIcon = styled.Image`
  width: 25;
  height: 25;
`;

const UserIsNotHomeContainer = styled(UserIsHomeContainer)`
  background-color: #fff0f1;
  margin-top: 20;
`;
