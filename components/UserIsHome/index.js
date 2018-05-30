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

  skipNote() {
    console.log('Skip this step');
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
          <ButtonContainer>
            <SendNoteContainer
              onPress={() => this.sendNote(this.state.text)}
              underlayColor="#7FC285"
            >
              <SendNoteButton>Submit</SendNoteButton>
            </SendNoteContainer>
            <SkipNoteContainer
              onPress={() => this.skipNote()}
              underlayColor="#6A7097"
            >
              <SkipNoteButton>Skip</SkipNoteButton>
            </SkipNoteContainer>
          </ButtonContainer>
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
  margin-top: 60;
  margin-bottom: 60;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const SendNoteContainer = styled.TouchableHighlight`
  background-color: #F66739;
  justify-content: center;
  width: 120;
  height: 50;
  flex-direction: row;
  align-items: center;
  margin-bottom: 60;
`;

const SendNoteButton = styled.Text`
  color: #fff;
  font-size: 18;
`;

const SkipNoteContainer = styled(SendNoteContainer)`
  background-color: #CECECE;
  margin-left: 10px;
`;

const SkipNoteButton = styled(SendNoteButton)``;
