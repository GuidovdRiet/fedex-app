import React, { Component } from "react";

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

console.disableYellowBox = true;

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
    DeliveryMap: { screen: mapSocketClientToNavigation(DeliveryMap) },
    Home: { screen: mapSocketClientToNavigation(Main) },
    AddNote: { screen: mapSocketClientToNavigation(AddNote) },
    UserIsNotHome: { screen: mapSocketClientToNavigation(UserIsNotHome) },
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

export default () => (
    <LoginContextProvider>
        <TabNav />
    </LoginContextProvider>
);
