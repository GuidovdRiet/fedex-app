import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

class AddNote extends Component {
  static navigationOptions = {
    title: "Add note"
  };

  constructor(props) {
    super(props);
    this.state = {
      text: null
    };
  }

  sendNote(note) {
    console.log(note);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AddNoteContainer>
          <AddNoteInput
            onPress={Keyboard.dismiss}
            accessible={false}
            editable={true}
            maxLength={40}
            multiline={true}
            numberOfLines={10}
            placeholder={"Add your note.."}
            onChangeText={text => this.setState({ text })}
            onPress={console.log("test")}
            value={this.state.text}
          />

          <SendNoteContainer
            onPress={() => this.sendNote(this.state.text)}
            underlayColor="#7FC285"
          >
            <SendNoteButton>Submit</SendNoteButton>
          </SendNoteContainer>
        </AddNoteContainer>
      </TouchableWithoutFeedback>
    );
  }
}

export default AddNote;

const AddNoteContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const AddNoteInput = styled.TextInput`
  background: #fff;
  flex: 1;
  width: 300px;
  margin-top: 15;
  margin-bottom: 15;
`;

const SendNoteContainer = styled.TouchableHighlight`
  background-color: #4d1c8a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 80px;
  margin-bottom: 15;
`;

const SendNoteButton = styled.Text`
  color: #fff;
  font-size: 18;
`;
