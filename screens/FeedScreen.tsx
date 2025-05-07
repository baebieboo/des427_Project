import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

type Photo = {
  id: number;
  user_id: number;
  image_url: string;
  uploaded_at: string;
};

export default function FeedScreen() {
  const [feed, setFeed] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const userId = 1; // เปลี่ยนตาม user login จริง
        const response = await axios.get<Photo[]>(`http://localhost:3000/feed/${userId}`);
        setFeed(response.data);
      } catch (error: any) {
        console.error('Error fetching feed:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const renderItem = ({ item }: { item: Photo }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.caption}>by user {item.user_id}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feed</Text>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={feed}
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