import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Alert, 
  ScrollView, 
  Share, 
  ImageBackground, 
  Image 
} from 'react-native';
const API_URL = 'http://YOUR_PC_LOCAL_IP:3000'; 

fetch(`${API_URL}/recipes`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
   
  })
  .catch(err => console.error(err));



type Item = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;  
};


const initialData: Item[] = [
  { id: '1', title: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL86-t7IGXR8gUnxRLwbgzmv-UkLxSmqRkBw&s' },
  { id: '2', title: 'Chicken Curry', description: 'Spicy and flavorful curry', imageUrl: 'https://urbanblisslife.com/wp-content/uploads/2024/04/Filipino-Chicken-Curry.jpg' },
  { id: '3', title: 'Avocado Toast', description: 'Simple and healthy breakfast', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLkpP2pBrhn0VLREE6PZh-RQplgrL0JG7rg&s' },
];

export default function Explore() {
  const [data, setData] = useState<Item[]>(initialData);
  const [filteredData, setFilteredData] = useState<Item[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>({ id: '', title: '', description: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const openAddModal = () => {
    setCurrentItem({ id: '', title: '', description: '', imageUrl: '' });
    setIsEditing(false);
    setModalVisible(true);
  };

  const openEditModal = (item: Item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setModalVisible(true);
  };

  const saveItem = () => {
    if (currentItem.title.trim() === '') {
      Alert.alert('Validation', 'Please enter a title.');
      return;
    }
    if (isEditing) {
      setData(prevData =>
        prevData.map(item =>
          item.id === currentItem.id ? { ...item, title: currentItem.title, description: currentItem.description, imageUrl: currentItem.imageUrl } : item
        )
      );
    } else {
      const newItem = {
        id: Math.random().toString(),
        title: currentItem.title,
        description: currentItem.description,
        imageUrl: currentItem.imageUrl, 
      };
      setData(prevData => [newItem, ...prevData]);
    }
    setModalVisible(false);
  };

  const deleteItem = (id: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          setData(prevData => prevData.filter(item => item.id !== id));
        },
      },
    ]);
  };

  const onPrint = async () => {
    if (filteredData.length === 0) {
      Alert.alert('Nothing to print', 'No items to print.');
      return;
    }
    let textToShare = 'Recipe Box - Export\n\n';
    filteredData.forEach(item => {
      textToShare += `Title: ${item.title}\nDescription: ${item.description}\n\n`;
    });

    try {
      await Share.share({
        message: textToShare,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share.');
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} /> {/* Displaying image */}
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <View style={styles.itemButtons}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => openEditModal(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteItem(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-lcgN3XXlxQAvtJw-DzeleKfrV1rvU9r6w&s' }} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Explore Recipes</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.addButtonText}>+ Add Recipe</Text>
        </TouchableOpacity>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No recipes found.</Text>}
        />

        {/* Add/Edit Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>{isEditing ? 'Edit Recipe' : 'Add Recipe'}</Text>
              <ScrollView keyboardShouldPersistTaps="handled">
                <TextInput
                  style={styles.modalInput}
                  placeholder="Title"
                  value={currentItem.title}
                  onChangeText={text => setCurrentItem(prev => ({ ...prev, title: text }))} 
                />
                <TextInput
                  style={[styles.modalInput, { height: 80 }]}
                  placeholder="Description"
                  multiline
                  value={currentItem.description}
                  onChangeText={text => setCurrentItem(prev => ({ ...prev, description: text }))} 
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Image URL"
                  value={currentItem.imageUrl}
                  onChangeText={text => setCurrentItem(prev => ({ ...prev, imageUrl: text }))} 
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveItem}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Print Button */}
        <TouchableOpacity style={styles.printButton} onPress={onPrint}>
          <Text style={styles.printButtonText}>Print / Share List</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: 'white',
  },
  searchInput: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    color: 'white',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemDescription: {
    color: '#555',
  },
  itemButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#777',
    marginLeft: 10,
  },
  printButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  printButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});


