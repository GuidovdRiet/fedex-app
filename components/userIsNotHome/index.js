import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

class userIsNotHome extends Component {
  constructor() {
    super();
    this.state = {
      deliveryDate: {}
    };
  }

  render() {
    const date = new Date();
    const yesterday = date.setDate(date.getDate() - 1);

    return (
      <Calendar
        minDate={yesterday}
        onDayPress={day => {
          this.setState({ deliveryDate: day });
          console.log(this.state.deliveryDate);
        }}
        markedDates={{
          [this.state.deliveryDate.dateString]: { selected: true, marked: true, selectedColor: "blue" }
        }}
      />
    );
  }
}

export default userIsNotHome;
