import { useState } from "react";
import {
  Text,
  View,
  Button,
  Switch,
  ScrollView,
  TextInput,
  Pressable,
  Image,
} from "react-native";

function HomeScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const pressMe = () => {
    alert("Button Pressed");
  };
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }
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

      {/* <TextInput
        style={{ backgroundColor: "aqua", borderWidth: 2 }}
        value={text}
        onChangeText={setText}
        keyboardType="default"
        multiline
        numberOfLines={4}
        placeholder="Enter Your Text"
      /> */}

      {/* <Pressable
        onPress={() => {
          setTimesPressed((current) => current + 1);
        }}
       
      >
        {({ pressed }) => (
          <Text >{pressed ? "Pressed!" : "Press Me"}</Text>
        )}
      </Pressable>
      <View >
        <Text testID="pressable_press_console">{textLog}</Text>
      </View> */}

      <Image
        source={{
          uri: "https://imgs.search.brave.com/ACedRZHztn-OEwyhM1B15tdkWFNDmr_vu6lbM9Pyr10/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdmUtc3VpdGUv/cGhvdG9ncmFwaHkv/cmVpbWFnaW5lLndl/YnA",
        }}
        style={{ height: 300, width: 300,resizeMode:'contain' }}
      
      />
    </ScrollView>
  );
}
export default HomeScreen;
