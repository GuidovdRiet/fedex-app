import React, { Component } from "react";
import { Text } from "react-native-elements";
import { View, StyleSheet, Dimensions } from "react-native";
import styled from "styled-components";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");
// const SCREEN_WIDTH = width;

const BottomContainer = styled.View``;

class DeliveryMap extends Component {
    static navigationOptions = {
        title: "DeliveryMap"
    };

    //TODO:
    // state = {
    //   deliveryPosition: {
    //     lat:
    //     lon:
    //   }
    // }

    componentDidMount() {
        if (this.props.socketClient)
            this.props.socketClient.on("delivery:location-update", payload => {
                //TODO: receive geolocation
                // this.setState({})
            });
    }

    //TODO: Render text met: bezorger komt eraan
    // pas weghalen en geolocation tonen als deliveryPos lat/lon bekend zijn
    render() {
        return (
            <View width={500}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
                <BottomContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: width,
        height: 500
    }
});

export default DeliveryMap;
