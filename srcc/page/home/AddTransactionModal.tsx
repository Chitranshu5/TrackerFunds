import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Realm from "realm";
import { getRealm } from "../../bd/realm";
import { Transaction } from "../../../ApiData";

interface User {
  _id: string; // string for React state
  name: string;
  email?: string;
  phone?: string;
}

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void;
  users: User[];
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  onClose,
  onAddTransaction,
  users,
}) => {
  const [newTransaction, setNewTransaction] = useState({
    userId: "" as string,
    type: "lend" as "lend" | "borrow" | "deposit",
    amount: "",
    description: "",
  });

  const handleAddTransaction = () => {
    if (!newTransaction.userId || !newTransaction.amount) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    console.log("💡 Attempting to add transaction:", newTransaction);

    // 🔍 Find selected user
    const selectedUser = users.find(u => u._id === newTransaction.userId);
    console.log("🔍 Selected user:", selectedUser);

    if (!selectedUser) {
      Alert.alert("Error", "User not found");
      console.warn("❌ User not found for transaction!");
      return;
    }

    try {
      const realm = getRealm();
      let createdTransaction: Transaction | null = null;

      realm.write(() => {
        // Get next numeric ID
        const lastTransaction = realm.objects<Transaction>("Transaction").sorted("id", true)[0];
        const nextId = lastTransaction ? lastTransaction.id + 1 : 1;

        // Create transaction in Realm
        const realmTransaction = realm.create<Transaction>("Transaction", {
          _id: new Realm.BSON.ObjectId(),
          id: nextId,
          userId: new Realm.BSON.ObjectId(selectedUser._id),
          userName: selectedUser.name,
          type: newTransaction.type,
          amount: parseFloat(newTransaction.amount),
          date: new Date(),
          description: newTransaction.description ?? "",
          category: null,
        });

        createdTransaction = {
          _id: realmTransaction._id,
          id: realmTransaction.id,
          userId: realmTransaction.userId,
          userName: realmTransaction.userName,
          type: realmTransaction.type,
          amount: realmTransaction.amount,
          date: realmTransaction.date,
          description: realmTransaction.description,
          category: realmTransaction.category,
        };

        console.log("✅ Transaction created in Realm:", createdTransaction);
      });

      if (createdTransaction) {
        // Convert ObjectIds to string for React state
        const transactionForState = {
          ...createdTransaction,
          _id: createdTransaction._id.toHexString(),
          userId: (createdTransaction.userId as Realm.BSON.ObjectId).toHexString(),
        };

        console.log("🌟 Updating state with new transaction:", transactionForState);
        onAddTransaction(transactionForState);

        // Reset form
        setNewTransaction({ userId: "", type: "lend", amount: "", description: "" });
        onClose();
        Alert.alert("Success", "Transaction added successfully");
      }
    } catch (err) {
      console.error("❌ Error adding transaction:", err);
      Alert.alert("Error", "Could not add transaction");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Transaction</Text>

          <Text style={styles.label}>User *</Text>
          <View style={styles.picker}>
            {users.map((user, index) => (
              <TouchableOpacity
                key={user._id || index}
                style={[
                  styles.userOption,
                  newTransaction.userId === user._id && styles.selectedOption,
                ]}
                onPress={() => setNewTransaction({ ...newTransaction, userId: user._id })}
              >
                <Text style={styles.optionText}>{user.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Type *</Text>
          <View style={styles.typeSelector}>
            {["lend", "borrow", "deposit"].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  newTransaction.type === type && styles.typeButtonActive,
                ]}
                onPress={() => setNewTransaction({ ...newTransaction, type: type as any })}
              >
                <Text style={styles.typeButtonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Amount *"
            value={newTransaction.amount}
            onChangeText={text => setNewTransaction({ ...newTransaction, amount: text })}
            keyboardType="numeric"
            placeholderTextColor="#9e9ea7"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            value={newTransaction.description}
            onChangeText={text => setNewTransaction({ ...newTransaction, description: text })}
            multiline
            placeholderTextColor="#9e9ea7"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleAddTransaction}
            >
              <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#9e9ea7",
    marginBottom: 8,
    fontSize: 14,
  },
  picker: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  userOption: {
    backgroundColor: "#2a2a2a",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: "#7c4dff",
  },
  optionText: {
    color: "#fff",
  },
  typeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    marginHorizontal: 4,
  },
  typeButtonActive: {
    backgroundColor: "#7c4dff",
  },
  typeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#2a2a2a",
  },
  confirmButton: {
    backgroundColor: "#7c4dff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddTransactionModal;
