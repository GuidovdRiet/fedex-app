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

const socketClient = io("http://45.63.12.46:8080");

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
        <Component {...this.props} {...params} socketClient={socketClient} />
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
          <Icon name="ios-analytics" type="ionicon" color="#fff" />
        ),
        tabBarLabel: "Delivery"
      }
    },
    Account: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarIcon: (
          <Icon name="ios-contact" type="ionicon" color="#fff" />
        ),
        tabBarLabel: "Account"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#ffffff',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: "#4D1C8A"
      }
    },
    order: ["Account", "Delivery"],
    animationEnabled: true
  }
);

export default () => (
  <LoginContextProvider>
    <TabNav />
  </LoginContextProvider>
);
