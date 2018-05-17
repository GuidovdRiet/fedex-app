import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, } from 'react-native';

import styled from 'styled-components';

import AccountPage from './account'

class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            username: "",
            passoword: ""
        };
    }

    _login(username, password) {
        fetch("http://localhost:7777/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((res) => {
            return res.JSON;
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
            throw error;
        });

        console.log(username, password);
    }

    _checkLogin() {
        if (!this.state.isLoggedIn) {
            return (
                <UserProfileContainer>
                    <LogoWrapper>
                        <Logo source={require("../../images/FedEx-brand.png")} />
                    </LogoWrapper>
                    <UsernameField placeholder='Username'
                        placeholderTextColor='#9a9898'
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
                <AccountPage />
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
    backgroundColor: #d6d5d5;
    marginBottom: 10px;
    padding: 10px;
    color: #fff ;
    margin-top: 40px;
`;

const PasswordField = styled.TextInput`
    height: 45px;
    width: 250px;
    backgroundColor: #d6d5d5;
    marginBottom: 10px;
    padding: 10px;
    color: #fff ;
`;

const ButtonContainer = styled.TouchableOpacity`
    backgroundColor: #4d1c8a;
    width: 250px;
    height: 50px;
    paddingVertical: 17px;
`;

const LoginButton = styled.Text`
        color: #fff;
        textAlign: center;
        fontWeight: 700;
`;

const LogoWrapper = styled.View`
  margin-bottom: 50;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image``;


export default UserProfile;