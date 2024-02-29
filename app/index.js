import { TouchableOpacity, Text, View } from "react-native";
import { useAppContext } from "../state/AppContext";
import { search } from "../APIs/openStreet";
import { useEffect } from "react";


export default function Page() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    search(dispatch);
  }, []);

  return (
 
      <View clssName="items-center justify-center">
        
      </View>

  );
};
