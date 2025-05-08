import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export default function SearchScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { user } = route.params;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const BASE_URL = 'http://172.20.10.2:3000';

  const searchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/search`, {
        params: {
          query,
          currentUserId: user.id,
        },
      });
      console.log('🔍 Searching:', query);
      console.log('🧠 Result:', res.data.users);
      setResults(res.data.users);
    } catch (err) {
      console.error('❌ Search error:', err);
      Alert.alert('Search Failed', 'Something went wrong');
    }
  };

  useEffect(() => {
    if (isFocused && query.length > 0) {
      searchUsers();
    }
  }, [isFocused]);

  const toggleFollow = async (targetId: number, isFollowing: boolean) => {
    try {
      const url = `${BASE_URL}/${isFollowing ? 'unfollow' : 'follow'}`;
      const payload = {
        follower_id: user.id,
        following_id: targetId,
      };
      console.log('📤 Sending to:', url, payload);

      await axios.post(url, payload);
      searchUsers(); // refresh follow status
    } catch (err) {
      console.error('❌ Toggle follow error:', err);
      Alert.alert('Error', 'Could not toggle follow');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Users</Text>
      </View>

      <TextInput
        placeholder="Search by handle"
        placeholderTextColor="#888"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchUsers}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.handle}</Text>
            <TouchableOpacity
              style={styles.followButton}
              onPress={() => toggleFollow(item.id, item.isFollowing)}
            >
              <Text style={styles.followText}>
                {item.isFollowing ? 'Unfollow' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResult}>No users found</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
  followButton: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResult: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});