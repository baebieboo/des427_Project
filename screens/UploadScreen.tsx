import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function UploadScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { user } = route.params;

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) return;

    try {
      const fileInfo = await FileSystem.getInfoAsync(image);
      const formData = new FormData();

      formData.append('image', {
        uri: fileInfo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      formData.append('user_id', String(user.id));

      const response = await axios.post(
        'http://172.20.10.2:3000/upload', // ✅ แก้จาก 8889 เป็น 3000
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ Upload success:', response.data);

      Alert.alert('Uploaded successfully!');
      navigation.goBack();
    } catch (err: any) {
      console.error('❌ Upload Error:', err.message);
      Alert.alert('Upload failed', err.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Photo</Text>
      <Button title="Pick Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.preview} />}
      <Button title="Upload" onPress={uploadImage} disabled={!image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
});