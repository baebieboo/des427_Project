import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type FeedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feed'>;
type FeedScreenRouteProp = RouteProp<RootStackParamList, 'Feed'>;

interface Photo {
  id: number;
  image_url: string;
  user_handle: string;
}

export default function FeedScreen() {
  const navigation = useNavigation<FeedScreenNavigationProp>();
  const route = useRoute<FeedScreenRouteProp>();
  const { user } = route.params;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        console.log('📤 Fetching feed for user:', user.id);
        const res = await fetch(`http://172.20.10.2:3000/feed/${user.id}`); // ✅ ใช้ GET
        const data = await res.json();
        console.log('✅ Feed response:', data);
        setPhotos(data.photos);
      } catch (err) {
        console.error('❌ Feed fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeed();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feed</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#a855f7" style={{ marginTop: 20 }} />
      ) : photos.length === 0 ? (
        <Text style={styles.noPhotos}>No photos from followed users yet.</Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.photoCard}>
              <Text style={styles.handle}>@{item.user_handle}</Text>
              <Image source={{ uri: item.image_url }} style={styles.image} />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Upload', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>📸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Search', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  noPhotos: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
  },
  photoCard: {
    marginBottom: 16,
  },
  handle: {
    color: '#a855f7',
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    backgroundColor: '#a855f7',
    padding: 12,
    borderRadius: 30,
  },
  iconText: {
    color: 'white',
    fontSize: 22,
  },
});