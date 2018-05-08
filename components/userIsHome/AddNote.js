import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.text,
          borderBottomColor: "#000000",
          borderBottomWidth: 1
        }}
      >
        <TextInput
          editable={true}
          maxLength={40}
          multiline={true}
          numberOfLines={10}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    );
  }
}

export default AddNote;
