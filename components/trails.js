import { Polyline } from "react-native-maps";
import { useAppContext } from "../state/AppContext";


const Trails = () => {
    const { state } = useAppContext();

    const setDifficulty = (item) => {
        let data = item.tags;
            let difficulty = data['mtb:scale:imba'];
        if (difficulty !== undefined){
            if (difficulty === '3'){
                return "#0000FF"
            } else return '#00ff00';
        } else return '#00ff00';
    };

    if (state.trails.elements !== undefined) {
        return state.trails.elements.map((item, index) => {
            if (item.tags !== undefined && item.geometry !== undefined) {
                if (item.tags.name !== undefined) {
                    let coordinates = item.geometry.map(({ lat, lon }) => ({latitude: lat, longitude: lon}));
                return (
                    <Polyline
                        key={index} 
                        coordinates={coordinates}
                        strokeWidth={6}
                        strokeColor={setDifficulty(item)}
                        
                    />
                )
                }
            }
        });
    } else return;
};

export default Trails;
