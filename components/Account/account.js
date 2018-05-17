import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, } from 'react-native';

import styled from 'styled-components';

class AccountPage extends Component {

    render() {
        return (
            <AccountScreenContainer>
                <Text>Welcome to your profile</Text>
            </AccountScreenContainer>
        )
    }
}

const AccountScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default AccountPage;