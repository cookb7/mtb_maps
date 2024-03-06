import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Text, TouchableOpacity } from 'react-native';
import Trails from "./trails";
import { updateMapCoords } from '../APIs/openStreet';
import { useAppContext } from '../state/AppContext';

const Map = () => {
    const { state } = useAppContext();
   
    const setMapCenter = (e) => {
        let coords = [
            e.latitude,
            e.latitudeDelta,
            e.longitude,
            e.longitudeDelta
        ];
        updateMapCoords(coords);
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
            >
            {state.trails && (
                <Trails />
            )}
            </MapView>
            <TouchableOpacity className="bg-theme_dark_blue justify-center items-center">
                <Text>Press me</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Map;