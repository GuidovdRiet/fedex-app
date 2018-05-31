import React, { Component } from 'react';
import { NavigationActions } from "react-navigation";
import { Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";

import styled from 'styled-components';

export default class Profile extends Component {
    static navigationOptions = {
        title: "Profile"
    };

    constructor(props) {
        super(props);
        console.log(props.userId);
        this.state = {
            userId: props.userId,
            name: '',
            email: '',
            phone: ''
        }
    }
    componentDidMount() {

        fetch("http://localhost:7777/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: this.state.userId
            })
        }).then(res => {
            res.json().then(result => {
                this.setState({
                    name: result.name,
                    email: result.email,
                    phone: result.phone
                });
            });
        });
    }

    render() {
        return (
            <AccountScreenContainer>
                <ConsumerData>
                    <ProfileImageWrapper>
                        <ProfileImage source={{ uri: 'https://www.bighandi.com/img/profile-demo.png' }} />
                    </ProfileImageWrapper>
                    <ConsumerInfo>{this.state.name}</ConsumerInfo>
                    <ConsumerInfo>{this.state.email}</ConsumerInfo>
                    <ConsumerInfo>{this.state.phone}</ConsumerInfo>
                </ConsumerData>
            </AccountScreenContainer>
        )
    }
}

const AccountScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ConsumerData = styled.View`
  margin-bottom: 50;
  justify-content: center;
  align-items: center;
`;

const ProfileImageWrapper = styled.View`
    padding-bottom:20px;
`;

const ProfileImage = styled.Image`
    width:175px;
    height:175px;
`;
const ConsumerInfo = styled.Text`
    fontSize:20px;
    padding-bottom:10px;
`;