import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components';

// TODO: run BG task die luistert voor socket
// TODO: Fix notifications (ook permissions van user etc)
// TODO: On socket event > verstuur notification
// TODO: Pas nadat dit gebeurd is mag je je informatie updaten
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

    userIsNotHome() {
        console.log('Not Home');
    }

    render() {
        return (
            <Container>
                <UserIsHomeContainer onPress={this.userIsHome}>
                    <UserIsHomeButton>Home</UserIsHomeButton>
                </UserIsHomeContainer>
                <UserIsNotHomeContainer onPress={this.userIsNotHome}>
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
