import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { AppProvider } from "../state/AppContext";


const Layout = () => {
  const navigation = useNavigation();
  const hideTabBarTabs = [];

  return (
    <AppProvider>
        <Tabs
            screenOptions={({ route }) => ({
                headerShadowVisible: false,
                tabBarStyle: {
                display: hideTabBarTabs.includes(route.name) ? "none" : "flex",
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    href: null,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    href: {
                        pathname: "home",
                    },
                    headerShown: false,
                    title: "Home",
                    tabBarLabel: "Home",
                    tabBarIcon: () => (
                        <Entypo name="home" />
                ),
                }}
            />
        </Tabs>
    </AppProvider>
  )
};

export default Layout;