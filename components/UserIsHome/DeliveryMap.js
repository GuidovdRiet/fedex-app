import React, { Component } from "react";
import { Dimensions, StyleSheet, Image } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyD_8EG1LJWQ8RmBpcZUb_2gF3fdyR7C9U8";

class DeliveryMap extends Component {
  static navigationOptions = {
    title: "Delivery"
  };

  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 51.9174254,
          longitude: 4.4826467
        },
        {
          latitude: 51.937666,
          longitude: 4.47869, 
        }
      ]
    };

    this.mapView = null;
  }

  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate]
    });
  };

  render() {
    return (
      <MapContainer>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          style={StyleSheet.absoluteFill}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={
                this.state.coordinates.length > 2
                  ? this.state.coordinates.slice(1, -1)
                  : null
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="#F3792F"
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${
                    params.destination
                  }"`
                );
              }}
              onReady={result => {
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20
                  }
                });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <MapInfoContainer>
          <DelivererAvatar
            source={require("../../images/deliverermap-avatar.png")}
          />
          <MapInfoTextContainer>
            <MapInfo>Delivery time: 12:34</MapInfo>
            <DelivererName>Michael Frattaroli</DelivererName>
          </MapInfoTextContainer>
        </MapInfoContainer>
      </MapContainer>
    );
  }
}

export default DeliveryMap;

const MapContainer = styled.View`
  flex: 1;
  background: red;
`;

const MapInfoContainer = styled.View`
  background: rgba(77, 34, 136, 0.85);
  height: 55;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MapInfoTextContainer = styled.View``;

const DelivererName = styled.Text`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
`;

const DelivererAvatar = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 13px;
`;

const MapInfo = styled.Text`
  color: white;
  font-size: 18px;
`;
