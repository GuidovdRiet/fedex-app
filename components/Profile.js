import React, { Component } from 'react';
import { NavigationActions } from "react-navigation";
import { Text, TextInput, TouchableOpacity, Image } from 'react-native';
import PropTypes from "prop-types";

import PackageImage from '../images/icon/package.png'

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
                <PackagesWrapper>
                    <PackageIcon source={PackageImage} />
                    <PackageInfo>
                        <PackageSender>Bol.com</PackageSender>
                        <PackageNumber>0924834</PackageNumber>
                    </PackageInfo>
                    <ShowPackage>></ShowPackage>
                </PackagesWrapper>
                <PackagesWrapper>
                    <PackageIcon source={PackageImage} />
                    <PackageInfo>
                        <PackageSender>Bol.com</PackageSender>
                        <PackageNumber>0924834</PackageNumber>
                    </PackageInfo>
                    <ShowPackage>></ShowPackage>
                </PackagesWrapper> <PackagesWrapper>
                    <PackageIcon source={PackageImage} />
                    <PackageInfo>
                        <PackageSender>Bol.com</PackageSender>
                        <PackageNumber>0924834</PackageNumber>
                    </PackageInfo>
                    <ShowPackage>></ShowPackage>
                </PackagesWrapper>
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
margin-top:50;
  margin-bottom: 40;
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
    
    color:#555555;
`;

const PackagesWrapper = styled.View`
    padding-top:10px;
    padding-bottom:10px
    padding-left:30px;
    justify-content: flex-start;
    align-items: flex-start	;
    flex-direction:row;
    width:100%;
    border-style: solid;
    border-color: #555555;
    border-top-width: 1;
`;

const PackageInfo = styled.View`

`;

const PackageIcon = styled.Image`
    width:40px;
    height:40px;
`;

const PackageNumber = styled.Text`
    padding-left:25px;
    color:#555555;
`;

const PackageSender = styled.Text`
    font-size:22px;
    padding-left:20px;
    color:#555555;
`;

const ShowPackage = styled.Text`
    font-size:30px;
    padding-right:30px
    margin-left: auto;
    color:#555555;
`;