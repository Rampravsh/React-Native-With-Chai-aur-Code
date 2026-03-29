import { useState } from "react";
import {
  Text,
  View,
  Button,
  Switch,
  ScrollView,
  TextInput,
} from "react-native";

function HomeScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const pressMe = () => {
    alert("Button Pressed");
  };
  return (
    <ScrollView>
      {/* {
        [...Array(30)].map((_,i)=>(
          <Text key={i} style={{fontSize:24}}>
            Hello From Home Screen {i+1}
          </Text>
        ))
      } */}

      {/* <Text style={{ fontSize: 20, fontWeight: 'bold',marginBottom:20 }}>Home Screen</Text> */}

      {/* <Button title='Click me' onPress={pressMe} /> */}

      {/* <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}

      <TextInput
        style={{ backgroundColor: "aqua", height: 100, borderWidth: 2 }}
        value={text}
        onChangeText={setText}
        keyboardType="phone-pad"
      />
    </ScrollView>
  );
}
export default HomeScreen;
