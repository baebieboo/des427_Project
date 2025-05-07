import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

type Photo = {
  id: number;
  user_id: number;
  image_url: string;
  uploaded_at: string;
};

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const userId = 1; // แทนค่าด้วย id ที่ login
        const response = await axios.get<Photo[]>(`http://localhost:3000/photos/${userId}`);
        setPhotos(response.data);
      } catch (error: any) {
        console.error('Error fetching photos:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const renderItem = ({ item }: { item: Photo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.caption}>Uploaded: {new Date(item.uploaded_at).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Uploads</Text>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  loading: { color: '#aaa', fontSize: 16, textAlign: 'center' },
  card: { backgroundColor: '#111', borderRadius: 10, marginBottom: 20, padding: 10 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  caption: { color: '#aaa', marginTop: 8, fontSize: 14 },
});