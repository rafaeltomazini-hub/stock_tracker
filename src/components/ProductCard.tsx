import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface ProductCardProps {
  name: string;
  category: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  category,
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      
      <View style={styles.controls}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={onDecrement} style={styles.button}>
            <Minus size={20} color={Colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{quantity}</Text>
          
          <TouchableOpacity onPress={onIncrement} style={styles.button}>
            <Plus size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Trash2 size={20} color={Colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginRight: 12,
  },
  quantity: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  button: {
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  deleteButton: {
    padding: 8,
  },
});
