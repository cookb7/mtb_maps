import axios from "axios";
import osmtogeojson from "osmtogeojson";
import { useAppContext } from "../state/AppContext";


export const convert = (data) => {
    const convertedData = osmtogeojson(data);
    console.log(convertedData);
};

export const search = async (dispatch) => {
    console.log('search');
    const xmlRequest = `
    <osm-script output="json" output-config="">
      <union into="_">
        <query into="_" type="relation">
          <has-kv k="route" modv="" v="bicycle"/>
          <bbox-query s="39.695" w="-105.2" n="39.7" e="-105.19"/>
        </query>
        <query into="_" type="way">
          <has-kv k="highway" modv="" v="cycleway"/>
          <bbox-query s="39.695" w="-105.2" n="39.7" e="-105.19"/>
        </query>
        <query into="_" type="way">
          <has-kv k="highway" modv="" v="path"/>
          <has-kv k="bicycle" modv="" v="yes"/>
          <bbox-query s="39.695" w="-105.2" n="39.7" e="-105.19"/>
        </query>
        <query into="_" type="way">
          <has-kv k="highway" modv="" v="track"/>
          <has-kv k="bicycle" modv="" v="yes"/>
          <bbox-query s="39.695" w="-105.2" n="39.7" e="-105.19"/>
        </query>
      </union>
      <print e="" from="_" geometry="full" ids="yes" limit="" mode="body" n="" order="id" s="" w=""/>
      <recurse from="_" into="_" type="down"/>
      <print e="" from="_" geometry="skeleton" ids="yes" limit="" mode="skeleton" n="" order="quadtile" s="" w=""/>
    </osm-script>
    `;
    
    await axios.post('https://overpass-api.de/api/interpreter', xmlRequest, {
      headers: {
        'Content-Type': 'application/xml'
      }
    })
    .then(response => {
      const trails = response.data;
      dispatch({type: "SET_TRAILS", payload: trails})
      console.log("loaded");

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};


