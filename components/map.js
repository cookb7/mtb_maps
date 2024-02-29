import MapView, {Marker, PROVIDER_GOOGLE, Geojson, Polyline} from 'react-native-maps';
import {View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { search } from '../APIs/openStreet';
import { useAppContext } from '../state/AppContext';

const Map = () => {
    const { state } = useAppContext();

    const coordinates = state.trails.elements[1].geometry.map(({ lat, lon }) => ({latitude: lat, longitude: lon}));
    
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
            >
            <Polyline
                coordinates={coordinates}
                strokeWidth={6}
                strokeColor='#000'
            />
            </MapView>
        </View>
    );
};

export default Map;