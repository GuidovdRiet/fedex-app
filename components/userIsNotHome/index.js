import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import styled from "styled-components";

export default class UserIsNotHome extends Component {
    static navigationOptions = {
        title: "Pick a delivery date"
    };

    constructor() {
        super();
        this.state = {
            deliveryDate: {},
            deliveryDateSet: false
        };
    }

    confirmDate(date) {
        console.log(date);
    }

    render() {
        const today = new Date();
        return (
            <UserIsNotHomeContainer>
                <CalendarWrapper>
                    <Calendar
                        minDate={today}
                        onDayPress={day => {
                            this.setState({
                                deliveryDate: day,
                                deliveryDateSet: true
                            });
                            console.log(this.state.deliveryDate);
                        }}
                        markedDates={{
                            [this.state.deliveryDate.dateString]: {
                                selected: true,
                                marked: true,
                                selectedColor: "#F8662E"
                            }
                        }}
                    />
                </CalendarWrapper>
                {this.state.deliveryDateSet && (
                    <ConfirmDateWrapper>
                        <ConfirmDateIcon
                            source={require("../../images/icon/calendar.png")}
                        />
                        <ConfirmDateText>
                            Your package will be devilered{" "}
                            {moment(this.state.deliveryDate.dateString).format(
                                "MMM Do YYYY"
                            )}
                        </ConfirmDateText>
                        <ConfirmDateContainer
                            onPress={() =>
                                this.confirmDate(this.state.deliveryDate)
                            }
                            underlayColor="#7FC285"
                        >
                            <ConfirmDateButton>Confirm</ConfirmDateButton>
                        </ConfirmDateContainer>
                    </ConfirmDateWrapper>
                )}
            </UserIsNotHomeContainer>
        );
    }
}

const UserIsNotHomeContainer = styled.View`
    flex: 1;
`;

const ConfirmDateIcon = styled.Image`
    width: 35;
    height: 35;
    margin-bottom: 15;
`;

const ConfirmDateText = styled.Text`
    color: #292d3e;
    margin-bottom: 15;
    font-size: 15;
`;

const CalendarWrapper = styled.View`
    justify-content: center;
    flex: 1;
`;

const ConfirmDateWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ConfirmDateContainer = styled.TouchableHighlight`
    background-color: #4d1c8a;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 80px;
`;

const ConfirmDateButton = styled.Text`
    color: #fff;
    font-size: 18;
`;
