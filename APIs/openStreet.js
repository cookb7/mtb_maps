import axios from "axios";


export const search = async (dispatch, south, west, north, east) => {
  console.log('search');
  const xmlRequest = `
  <osm-script output="json" output-config="">
    <union into="_">
      <query into="_" type="relation">
        <has-kv k="route" modv="" v="bicycle"/>
        <bbox-query s="${south}" w="${west}" n="${north}" e="${east}"/>
      </query>
      <query into="_" type="way">
        <has-kv k="highway" modv="" v="cycleway"/>
        <bbox-query s="${south}" w="${west}" n="${north}" e="${east}"/>
      </query>
      <query into="_" type="way">
        <has-kv k="highway" modv="" v="path"/>
        <has-kv k="bicycle" modv="" v="yes"/>
        <bbox-query s="${south}" w="${west}" n="${north}" e="${east}"/>
      </query>
      <query into="_" type="way">
        <has-kv k="highway" modv="" v="track"/>
        <has-kv k="bicycle" modv="" v="yes"/>
        <bbox-query s="${south}" w="${west}" n="${north}" e="${east}"/>
      </query>
      <query into="_" type="way">
        <has-kv k="highway" modv="" v="footway"/>
        <has-kv k="bicycle" modv="" v="yes"/>
        <bbox-query s="${south}" w="${west}" n="${north}" e="${east}"/>
    </query>
    </union>
    <print e="" from="_" geometry="full" ids="yes" limit="" mode="body" n="" order="id" s="" w=""/>
    <recurse from="_" into="_" type="down"/>
    <print e="" from="_" geometry="full" ids="yes" limit="" mode="body" n="" order="id" s="" w=""/>
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
    return trails.elements.map((item) => {
      if (item.tags !== undefined && item.geometry !== undefined) {
        if (item.tags.name !== undefined) {
        }
      } else return;
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
};
