import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import moment from "moment";

class Popup extends Component {
  constructor() {
    super();
    state = {
      time: null
    };
  }

  componentWillMount() {
    this.setState({ time: Date.now() });
  }

  render() {
    return (
      <PopUpContainer>
        <PopUpIcon source={require("../../images/icon/checked.png")} />
        <PopUpMessage>
          Your package has been delivered, have a nice day!
        </PopUpMessage>
        <PopUpArrivelTime>
          {moment(this.state.time).calendar()}
        </PopUpArrivelTime>
      </PopUpContainer>
    );
  }
}

export default Popup;

const PopUpContainer = styled.View`
  background: rgba(255, 255, 255, 0.9);
  padding: 0 20px;
  height: 400px;
  width: 320px;
  justify-content: center;
  align-items: center;
`;

const PopUpIcon = styled.Image`
  width: 45px;
  height: 45px;
  margin-bottom: 15px;
`;

const PopUpMessage = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const PopUpArrivelTime = styled.Text`
  margin-top: 8;
`;
