import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Colors from "../../constants/Colors";
import { login, signUp } from "../../store/actions/auth";
import AppText from "../../components/AppText";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // form state management
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [formDispatch]
  );

  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const signupHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        signUp(formState.inputValues.email, formState.inputValues.password)
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={["#fff", "#e5ffe5"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.formContainer}>
        <ScrollView>
          <View style={styles.formToggler}>
            <TouchableNativeFeedback
              onPress={() => {
                setIsSignUp(false);
                setError(null);
              }}
            >
              <View style={[styles.tabs, !isSignUp && styles.active]}>
                <AppText style={!isSignUp && styles.activeText}>Login</AppText>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => {
                setIsSignUp(true);
                setError(null);
              }}
            >
              <View style={[styles.tabs, isSignUp && styles.active]}>
                <AppText style={isSignUp && styles.activeText}>Sign Up</AppText>
              </View>
            </TouchableNativeFeedback>
          </View>
          <AppInput
            id="email"
            title="Email"
            errorText="Please enter valid email"
            onInputChange={inputChangeHandler}
            keyboardType="email-address"
            initialValue=""
            initiallyValid={true}
            required
            email
          />
          <AppInput
            id="password"
            title="Password"
            secureTextEntry={true}
            errorText="Please enter valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
            initiallyValid={true}
            required
            minLength={5}
          />
          <View style={styles.buttonContainer}>
            {isSignUp ? (
              <AppButton
                onPress={signupHandler}
                buttonStyle={{
                  ...styles.buttonStyle,
                  backgroundColor: Colors.primary,
                  borderWidth: 1,
                  borderColor: Colors.success,
                }}
                textStyle={{
                  ...styles.textStyle,
                  color: Colors.success,
                }}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.success} />
                ) : (
                  "Sign Up"
                )}
              </AppButton>
            ) : (
              <AppButton
                onPress={loginHandler}
                buttonStyle={styles.buttonStyle}
                textStyle={styles.textStyle}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                  "Login"
                )}
              </AppButton>
            )}
          </View>
          {error && (
            <View style={styles.errorStyles}>
              <AppText style={styles.errorText}> {error}</AppText>
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export const authScreenOptions = {
  headerTitle: "ShopT",
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    height: 130,
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonStyle: {
    height: 50,
  },
  textStyle: {},
  formToggler: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  tabs: {
    marginLeft: 20,
    padding: 10,
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.success,
  },
  activeText: {
    color: Colors.success,
  },
  errorStyles: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.errorMessages,
    padding: 5,
    borderRadius: 3,
    backgroundColor: "#ffe5e5",
  },
  errorText: {
    color: Colors.errorMessages,
  },
});

export default AuthScreen;
