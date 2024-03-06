import { Polyline } from "react-native-maps";
import { useAppContext } from "../state/AppContext";

const Trails = () => {
    // const { state } = useAppContext();
    // if (state.trails.elements.length > 0) {
    //     return state.trails.elements.map((item, index) => {
    //         if (item.tags !== undefined && item.geometry !== undefined) {
    //             if (item.tags.name !== undefined) {
    //                 let coordinates = item.geometry.map(({ lat, lon }) => ({latitude: lat, longitude: lon}));
    //             return (
    //                 <Polyline
    //                     key={index} 
    //                     coordinates={coordinates}
    //                     strokeWidth={6}
    //                     strokeColor='#000'
    //                 />
    //             )
    //             }
    //         }
    //     });
    // } else return;
};

export default Trails;
