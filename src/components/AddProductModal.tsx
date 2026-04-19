import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../theme/colors';
import { X } from 'lucide-react-native';

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (product: { name: string; category: string; quantity: number }) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    if (!name || !category || !quantity) return;
    
    onAdd({
      name,
      category,
      quantity: parseInt(quantity, 10),
    });
    
    setName('');
    setCategory('');
    setQuantity('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Novo Produto</Text>
            <TouchableOpacity onPress={onClose}>
              <X color={Colors.textSecondary} size={24} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.form}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Parafuso"
              value={name}
              onChangeText={setName}
            />
            
            <Text style={styles.label}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Ferragens"
              value={category}
              onChangeText={setCategory}
            />
            
            <Text style={styles.label}>Quantidade Inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            
            <TouchableOpacity 
              style={[styles.addButton, !name && styles.buttonDisabled]} 
              onPress={handleAdd}
              disabled={!name}
            >
              <Text style={styles.addButtonText}>Adicionar ao Estoque</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: -8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
