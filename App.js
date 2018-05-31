import React, { Component } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import io from "socket.io-client";

import Main from "./components/Main";
import AddNote from "./components/UserIsHome";
import UserIsNotHome from "./components/UserIsNotHome";
import Account from "./components/Account";
import DeliveryMap from "./components/UserIsHome/DeliveryMap";

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

const StackNav = StackNavigator({
    Home: { screen: mapSocketClientToNavigation(Main) },
    AddNote: { screen: mapSocketClientToNavigation(AddNote) },
    UserIsNotHome: { screen: mapSocketClientToNavigation(UserIsNotHome) },
    DeliveryMap: { screen: mapSocketClientToNavigation(DeliveryMap) }
});

const TabNav = TabNavigator(
    {
        Delivery: {
            screen: StackNav,
            navigationOptions: {
                tabBarIcon: (
                    <Icon
                        name="package-down"
                        type="material-community"
                        color="#fff"
                    />
                ),
                tabBarLabel: "Delivery"
            }
        },
        Account: {
            screen: mapSocketClientToNavigation(Account),
            navigationOptions: {
                tabBarIcon: (
                    <Icon
                        name="account"
                        type="material-community"
                        color="#fff"
                    />
                ),
                tabBarLabel: "Account"
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                backgroundColor: "#4D1C8A"
            }
        },
        order: ["Delivery", "Account"],
        animationEnabled: true
    }
);

export default () => <TabNav />;
