import React, { Component } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Text } from "react-native";

class AddNote extends Component {
  static navigationOptions = {
    title: "Note"
  };

  constructor(props) {
    super(props);

    this.state = {
      text: null
    };
  }

  sendNote(note) {
    const { navigate } = this.props.navigation;
    navigate("DeliveryMap", { name: "DeliveryMap" });
  }

  skipNote() {
    const { navigate } = this.props.navigation;
    navigate("DeliveryMap", { name: "DeliveryMap" });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <AddNoteContainer>
          <AddNoteTopContentContainer>
            <AddNoteTopIcon source={require("../../images/notepad.png")} />
            <AddNoteTopText>
              Any specialties? Please add a note..
            </AddNoteTopText>
          </AddNoteTopContentContainer>

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
              onPress={() => {
                this.skipNote();
              }}
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

const AddNoteTopContentContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 30;
  margin-bottom: 30;
`;

const AddNoteTopText = styled.Text``;

const AddNoteTopIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`;

const AddNoteInput = styled.TextInput`
  background: #fff;
  flex: 1;
  width: 300px;
  margin-bottom: 60;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const SendNoteContainer = styled.TouchableHighlight`
  background-color: #f66739;
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
  background-color: #cecece;
  margin-left: 10px;
`;

const SkipNoteButton = styled(SendNoteButton)``;
