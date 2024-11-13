import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";

type MapScreenRouteProp = RouteProp<RootStackParamList, "Map">;

const MapScreen = () => {
  const route = useRoute<MapScreenRouteProp>();

  const { coordsLocation } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: coordsLocation.latitude,
          longitude: coordsLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType="standard"
        cameraZoomRange={{ minCenterCoordinateDistance: 500, maxCenterCoordinateDistance: 1500000 }}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="Post location"
          coordinate={{ latitude: coordsLocation.latitude, longitude: coordsLocation.longitude }}
          description="Photo was taken here"
          onPress={() => console.log("marker is pressed")}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
