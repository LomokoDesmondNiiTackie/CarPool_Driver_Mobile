import { Tabs } from "expo-router";
import { House, MapPinned } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
  
  return (
    < >
      <StatusBar style="dark" />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#ff5a5f",
            tabBarInactiveTintColor: "#999",
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 15,
              fontWeight: "600",
              marginBottom: 2,

            },
            tabBarStyle: {
              bottom: 15,
              left: 0,
              alignSelf: "center",
              width: "50%",
              elevation: 8,
              borderRadius: 24,
              backgroundColor: "#111111",
              height: 68,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopWidth: 0,
            },
          }}
        >

          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
            }}
          />
          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              headerShown: false,
              tabBarIcon: ({ color, size }) => <MapPinned color={color} size={size} />,
            }}
          />
          
        </Tabs>
    </>

  );
}
