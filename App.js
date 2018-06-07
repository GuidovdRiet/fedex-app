import React, { Component } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import { TabNavigator, StackNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import io from "socket.io-client";

import Main from "./components/Main";
import AddNote from "./components/UserIsHome";
import UserIsNotHome from "./components/UserIsNotHome";
import Login from "./components/Login";
import Profile from "./components/Profile";
import DeliveryMap from "./components/UserIsHome/DeliveryMap";
const LoginContext = React.createContext("Login");

class LoginContextProvider extends Component {
    //TODO: hier consumer id plaatsen
    state = {
        isLoggedIn: false,
        userId: null
    };

    updateLogin = isLoggedIn => {
        this.setState({ isLoggedIn: isLoggedIn });
    };

    setUserId = userId => {
        this.setState({ userId: userId });
    };

    render() {
        return (
            <LoginContext.Provider
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    updateLogin: this.updateLogin,
                    userId: this.state.userId,
                    setUserId: this.setUserId
                }}
            >
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}

// const socketClient = io('http://45.77.159.108:7000');
const socketClient = io("http://localhost:7000");

const mapSocketClientToNavigation = Component => {
    // TODO: state lives here?
    return class extends Component {
        render() {
            const { Profile, navigation, ...other } = this.props;
            const {
                state: { params }
            } = navigation;
            return (
                <LoginContext.Consumer>
                    {value => (
                        <Component
                            {...this.props}
                            {...params}
                            updateLogin={value.updateLogin}
                            isLoggedIn={value.isLoggedIn}
                            setUserId={value.setUserId}
                            userId={value.userId}
                            socketClient={socketClient}
                        />
                    )}
                </LoginContext.Consumer>
            );
        }
    };
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

const DeliveryStackNavigator = StackNavigator({
    Home: { screen: mapSocketClientToNavigation(Main) },
    AddNote: { screen: mapSocketClientToNavigation(AddNote) },
    UserIsNotHome: { screen: mapSocketClientToNavigation(UserIsNotHome) },
    DeliveryMap: { screen: mapSocketClientToNavigation(DeliveryMap) }
});

const LoginStackNavigator = StackNavigator({
    Login: { screen: mapSocketClientToNavigation(Login) },
    Profile: { screen: mapSocketClientToNavigation(Profile) }
});

const TabNav = TabNavigator(
    {
        Delivery: {
            screen: DeliveryStackNavigator,
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
            screen: LoginStackNavigator,
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

// TODO: 2 dingen aan elk child mee kunnen geven:
// - 1 een navigator instance
// - 2 state of je ingelogd bent of niet
export default () => (
    <LoginContextProvider>
        <TabNav />
    </LoginContextProvider>
);

// const afterAuthRoutes = {
//   Home: {
//     screen: HomeScreenStack
//   },
//   History: {
//     screen: AfterAuthScreens.HistoryScreen
//   },
//   ...
// }

// const TabConfig = {
//   initialRouteName: 'Home',
//   ...
// }

// const afterAuth = TabNavigator(afterAuthRoutes, TabConfig)

// const beforeAuthRoutes = {
//   Login: {
//     screen: AuthScreens.LoginScreen,
//     path: 'auth/login'
//   },
//   Signup: {
//     screen: AuthScreens.SignUpScreen,
//     path: 'auth/signup'
//   },
//   ...
// }

// const authConfig = {
//   initialRouteName: 'Login',
//   ...
// }

// const beforeAuth = StackNavigator(beforeAuthRoutes, authConfig)

// const AppNav = StackNavigator({
//   authStack: { screen: beforeAuth },
//   mainStack: { screen: afterAuth }
// }, {
//     // Default config for all screens
//     headerMode: 'none',
//     title: 'Main',
//     initialRouteName: 'authStack'
//   })

// And now to login the user, I just call navigate("mainStack") to logout the user, navigate("authStack"), ofc by logout and login I mean changing the screens, I am not talking about the entire process.
