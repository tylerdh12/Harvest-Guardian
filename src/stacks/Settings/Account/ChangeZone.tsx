import { Picker } from '@react-native-community/picker';
import axios from "axios";
import React, { useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';
import Loader from '../../../components/LoadingScreens/Loader';
import { Button, ErrorText, Text, View } from "../../../components/Styles";
import { AuthContext } from '../../../providers/AuthProvider';

interface ChangeZoneProps {

}

export const ChangeZone: React.FC<ChangeZoneProps> = ({}) => {
    const {
    logout,
    userData,
    authBasic,
    setUserData,
    setErrorMessage,
  } = useContext<any>(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [zone, changeZone] = useState(userData.zone);
      const [error, setError] = useState("");

      async function submitZoneChange() {
    setIsLoading(true);
    try {
      await AsyncStorage.getItem("rawLogin").then((response: string | null) =>
        !response
          ? console.log("No password stored")
          : response.length > 0
          ? AsyncStorage.getItem("authBasic").then((authBasic) => {
              axios({
                method: "patch",
                url: `https://harvestguardian-rest-api.herokuapp.com/v1/user/${userData._id}`,
                headers: {
                  Authorization: authBasic,
                },
                data: {
                  first_name: userData.first_name,
                  last_name: userData.last_name,
                  email: userData.email,
                  password: response,
                  zip_code: userData.zip_code,
                  account_type: userData.account_type,
                  zone: zone,
                  active: true,
                },
              })
                .then((res) => {
                  if (res.status === 401) {
                    console.log("Response 401");
                    console.log(res);
                  } else if (res.status === 500) {
                    console.log("Response Error 500");
                    console.log(res);
                  } else {
                    console.log(`Zone has been changed to: ${zone}`);
                  }
                })
                .then(() => setIsLoading(false));
            })
          : console.log("No response found")
      );
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

        return (
            isLoading ? (
            <View style={{ padding: 25 }}>
              <Text style={{ marginBottom: 5, textAlign: "center" }}>
                Changing Growing Zone
              </Text>
              <Text style={{ marginBottom: 25, textAlign: "center" }}>
                Please Wait...
              </Text>
              <Loader />
            </View>
          ) : (
          <>
            <View style={{ width: "70%", alignItems: "center", height: 250 }}>
                <Picker
                  itemStyle={{ color: "white" }}
                  selectedValue={zone}
                  style={{ height: 30, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    changeZone(itemValue)
                  }
                >
                  <Picker.Item label="1a" value="1a" />
                  <Picker.Item label="1b" value="1b" />
                  <Picker.Item label="2a" value="2a" />
                  <Picker.Item label="2b" value="2b" />
                  <Picker.Item label="3a" value="3a" />
                  <Picker.Item label="3b" value="3b" />
                  <Picker.Item label="4a" value="4a" />
                  <Picker.Item label="4b" value="4b" />
                  <Picker.Item label="5a" value="5a" />
                  <Picker.Item label="5b" value="5b" />
                  <Picker.Item label="6a" value="6a" />
                  <Picker.Item label="6b" value="6b" />
                  <Picker.Item label="7a" value="7a" />
                  <Picker.Item label="7b" value="7b" />
                  <Picker.Item label="8a" value="8a" />
                  <Picker.Item label="8b" value="8b" />
                  <Picker.Item label="9a" value="9a" />
                  <Picker.Item label="9b" value="9b" />
                  <Picker.Item label="10a" value="10a" />
                  <Picker.Item label="10b" value="10b" />
                  <Picker.Item label="11a" value="11a" />
                  <Picker.Item label="11b" value="11b" />
                  <Picker.Item label="12a" value="12a" />
                  <Picker.Item label="12b" value="12b" />
                  <Picker.Item label="13a" value="13a" />
                  <Picker.Item label="13b" value="13b" />
                </Picker>
              </View>
              {error !== "" ? <ErrorText>{error}</ErrorText> : null}
              <Button
                title="Change Zone"
                onPress={submitZoneChange}
                color="green"
                accessibilityLabel="Submit change zone"
              />
            </>
        ))
}