import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

import styled from 'styled-components';

import Profile from './Profile';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userId: null,
      username: "",
      email: "",
      name: "",
      password: "",
      errorMessage: "",
    };
  }
  static navigationOptions = {
    title: "UserProfile"
  };

  _login(username, password) {
    console.log(this.props);
    fetch("http://localhost:7777/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      if (res.status == 200) {
        res.json().then(result => {
          this.setState({
            isLoggedIn: true,
            userId: result._id
          }, () => {
            this.props.updateLogin(true);
            this.props.setUserId(this.state.userId);
          })
        });

      } else {
        this.setState({ errorMessage: "Username or password invalid" });
      }
    });

  }

  _checkLogin() {
    if (!this.state.isLoggedIn) {
      return (
        <UserProfileContainer>
          <LogoWrapper>
            <Logo source={require("../images/FedEx-brand.png")} />
          </LogoWrapper>
          {this.state.errorMessage && <ErrorBox>{this.state.errorMessage}</ErrorBox>}
          <UsernameField placeholder='Username'
            placeholderTextColor='#9a9898'
            autoCapitalize="none"
            onChangeText={username => this.setState({ username })}
            value={this.state.username} />
          <PasswordField placeholder='Password'
            placeholderTextColor='#9a9898'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry />
          <ButtonContainer
            onPress={() => this._login(this.state.username, this.state.password)}>
            <LoginButton>LOGIN</LoginButton>
          </ButtonContainer>
        </UserProfileContainer>
      )
    } else {
      return (
        <UserProfileContainer>
          <Profile userId={this.state.userId} />
        </UserProfileContainer>
      )
    }
  }

  render() {
    return (
      <UserProfileContainer>
        {this._checkLogin()}
      </UserProfileContainer>
    )
  }
}

const UserProfileContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const UsernameField = styled.TextInput`
  height: 45px;
  width: 250px;
  background: #d6d5d5;
  margin-bottom: 10px;
  padding: 10px;
  color: #fff;
  margin-top: 40px;
`;

const PasswordField = styled.TextInput`
  height: 45px;
  width: 250px;
  background: #d6d5d5;
  margin-bottom: 10px;
  padding: 10px;
  color: #fff;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #4d1c8a;
  width: 250px;
  height: 50px;
  padding-vertical: 17px;
`;

const LoginButton = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 700;
`;

const LogoWrapper = styled.View`
  margin-bottom: 50;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image``;

const ErrorBox = styled.Text`
  background: rgba(255, 134, 125, 0.9);
  color: #f7f7f7;
  padding: 10px;
  font-size: 12px;
  border-radius: 1px;
`;



