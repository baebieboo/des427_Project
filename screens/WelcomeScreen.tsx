// screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let’s Get</Text>
      <Text style={styles.subheading}>Started!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.or}>Don’t have an account?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Text style={styles.signupText}>SIGN UP NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '300',
  },
  subheading: {
    color: '#a855f7',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#a855f7',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  or: {
    color: '#fff',
    fontSize: 14,
  },
  signupText: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
});