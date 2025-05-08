import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface Photo {
  id: number;
  image_url: string;
}

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();
  const { user } = route.params;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`http://172.20.10.2:3000/photos/${user.id}/recent`);
        const data = await res.json();
        setPhotos(data.photos);
      } catch (err) {
        console.error('❌ Failed to fetch photos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.username}>{user.handle}</Text>
      <Text style={styles.subtitle}>Your most recent photos!</Text>

      {/* Image Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#a855f7" style={{ marginTop: 20 }} />
      ) : photos.length === 0 ? (
        <Text style={styles.noPhotos}>You haven't uploaded any photos yet.</Text>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      {/* Footer Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Search', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>🔍</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Upload', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>📸</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Feed', { user })}
          style={styles.iconButton}
        >
          <Text style={styles.iconText}>📰</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(StackActions.replace('Welcome'))}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16, paddingTop: 50 },
  title: { color: '#fff', fontSize: 28, fontWeight: '300' },
  username: { color: '#a855f7', fontSize: 28, fontWeight: '700', marginBottom: 12 },
  subtitle: { color: '#fff', fontSize: 16, marginBottom: 20 },
  noPhotos: { color: '#888', textAlign: 'center', marginTop: 30 },
  image: {
    width: '48%',
    height: 150,
    margin: '1%',
    borderRadius: 10,
    backgroundColor: '#222',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 30,
  },
  iconButton: {
    backgroundColor: '#a855f7',
    padding: 12,
    borderRadius: 30,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
  },
});