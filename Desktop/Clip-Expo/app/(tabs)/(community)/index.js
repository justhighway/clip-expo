import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useUserLocation from "../../../hooks/useUserLocation";
import { router } from "expo-router";
import CustomButton from "../../../components/CustomButton";

export default function community() {
  const mapRef = useRef(null);
  const { userLocation, isUserLocationError } = useUserLocation();
  const [location, setLocation] = useState(userLocation || {});

  const handlePressButton = () => {
    //
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={true}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={(region) => {
          setLocation(region);
        }}
        onRegionChangeComplete={(region) => {
          setLocation(region);
        }}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.text}>위도: {location.latitude}</Text>
          <Text style={styles.text}>경도: {location.longitude}</Text>
        </View>
        <CustomButton
          label="이 위치로 주소 설정"
          variant="filled"
          size="large"
          onPress={handlePressButton}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
  },
  locationContainer: {
    flex: 0.2,
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  addressContainer: {
    justifyContent: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
