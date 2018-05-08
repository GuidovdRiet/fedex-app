import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Add your note..."
    };
  }
  render() {
    return (
      <AddNoteContainer
        style={{
          backgroundColor: this.state.text,
          borderBottomColor: "#000000",
          borderBottomWidth: 1
        }}
      >
        <AddNoteInput
          editable={true}
          maxLength={40}
          multiline={true}
          numberOfLines={10}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />

        <SendNoteContainer>
          <SendNoteButton>Submit</SendNoteButton>
        </SendNoteContainer>
      </AddNoteContainer>
    );
  }
}

export default AddNote;

const AddNoteContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: yellow;
`;

const AddNoteInput = styled.TextInput`
  background: #fff;
  flex: 1;
  width: 300px;
  margin-top: 15;
  margin-bottom: 15;
`;

const SendNoteContainer = styled.TouchableHighlight`
  background-color: #4D1C8A;
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
  margin: 0;
  padding: 0;
  font-size: 18;
`;
