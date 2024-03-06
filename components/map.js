import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Text, TouchableOpacity } from 'react-native';
import Trails from "./trails";
import { search } from '../APIs/openStreet';
import { useAppContext } from '../state/AppContext';
import { useState, useEffect } from "react";

const Map = () => {
    const { state, dispatch } = useAppContext();
    let south = undefined, north = undefined, east = undefined, west = undefined;
    const [ trailsLoaded, setTrailsLoaded ] = useState(false);
    const [ initialRegion, setInitialRegion ] = useState({});
    const [ isInitialLoad, setIsInitialLoad ] = useState(true);

    useEffect(() => {
        if (state.trails.elements !== undefined) {
            setTrailsLoaded(true);
        }
    }, [state.trails]);
    
   
    const setMapCenter = (e) => {
        let coords = [
            e.latitude,
            e.latitudeDelta,
            e.longitude,
            e.longitudeDelta
        ];
        updateMapCoords(coords);
    };

    const updateMapCoords = (coords) => {
        // Calculate south
        south = coords[0] - coords[1];
        // Calculate north
        north = coords[0] + coords[1];
        // Calculate west
        west = coords[2] - coords[3];
        // Calculate east
        east = coords[2] + coords[3];
      };

    const updateUserLocation = (e) => {
        if (isInitialLoad) {
            setInitialRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                latitudeDelta: 0.5,
                longitude: e.nativeEvent.coordinate.longitude,
                longitudeDelta: 0.5
            });
            setIsInitialLoad(false);
        }
    };
    
    return (
        <View 
            className="w-full h-full"
        >
            <MapView
            className="absolute h-full w-full" 
            provider={PROVIDER_GOOGLE}
            showsUserLocation='true'
            followsUserLocation='true'
            showsMyLocationButton='true'
            showsCompass='true'
            onRegionChangeComplete={e => setMapCenter(e)}
            onUserLocationChange={e => updateUserLocation(e)}
            initialRegion={initialRegion}
            >
            {trailsLoaded && (
                <Trails />
            )}
            </MapView>
            <TouchableOpacity 
                className="bg-theme_dark_blue justify-center items-center"
                onPress={() => search(dispatch, south, west, north, east)}
            >
                <Text>Press me</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Map;