import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { authenticate, setDidTryAL } from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationTime } = transformedData;
      const expirationDate = new Date(expirationTime);
      if (expirationDate <= new Date() || !token || !userId) {
        dispatch(setDidTryAL());
        return;
      }

      const expiryTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authenticate(token, userId, expiryTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.success} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
