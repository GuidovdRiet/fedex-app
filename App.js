import React, { Component } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { StackNavigator } from "react-navigation";
import io from "socket.io-client";

import Main from "./components/Main";
import AddNote from "./components/UserIsHome";
import UserIsNotHome from "./components/UserIsNotHome";

// const socketClient = io('http://45.77.159.108:7000');
const socketClient = io("http://localhost:7000");

const mapSocketClientToNavigation = Component => {
    return class extends Component {
        render() {
            const { navigation, ...other } = this.props;
            const {
                state: { params }
            } = navigation;
            return (
                <Component
                    {...this.props}
                    {...params}
                    socketClient={socketClient}
                />
            );
        }
    };
};

// Om aan te geven of je thuis of niet thuis bent
// Wel thuis bent -> socket uitsturen uit (true) -> naar volgende scherm
// Niet thuis bent -> socket uitsturen niet thuis (false)  -> naar volgende scherm

// TODO: Naar socket luisteren delivery:init
// TODO: Fix notifications (ook permissions van user etc)
// TODO: On socket event (delivery:init, zie index.js van back-end) > verstuur notification
// TODO: Pas nadat dit gebeurd is mag je je informatie updaten (socket emitten)

const App = StackNavigator({
    Home: { screen: mapSocketClientToNavigation(Main) },
    AddNote: { screen: mapSocketClientToNavigation(AddNote) },
    UserIsNotHome: { screen: mapSocketClientToNavigation(UserIsNotHome) }
});

export default () => <App />;
