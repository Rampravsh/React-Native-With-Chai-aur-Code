import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

export const SettingsModal = ({ isVisible, onClose, userName, setUserName, language, setLanguage }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <BlurView intensity={50} tint="dark" style={styles.modalContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
          <Text style={styles.title}>Settings</Text>
          
          <Text style={styles.label}>Your Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="What should I call you?" 
            placeholderTextColor="#888"
            value={userName}
            onChangeText={setUserName}
            maxLength={15}
          />

          <Text style={styles.label}>AI Voice Language</Text>
          <View style={styles.btnRow}>
             <TouchableOpacity 
               style={[styles.langBtn, language === 'en-US' && styles.activeBtn]}
               onPress={() => setLanguage('en-US')}
               activeOpacity={0.8}
             >
                <Text style={styles.langTxt}>English</Text>
             </TouchableOpacity>

             <TouchableOpacity 
               style={[styles.langBtn, language === 'hi-IN' && styles.activeBtn]}
               onPress={() => setLanguage('hi-IN')}
               activeOpacity={0.8}
             >
                <Text style={styles.langTxt}>Hindi</Text>
             </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.saveTxt}>SAVE SETTINGS</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  content: { 
    backgroundColor: 'rgba(20,20,35,0.95)', 
    padding: 30, 
    borderRadius: 25, 
    width: '85%', 
    borderWidth: 1, 
    borderColor: '#0ff',
    elevation: 20,
    shadowColor: '#0ff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 15
  },
  title: { 
    fontSize: 24, 
    color: '#fff', 
    fontWeight: '900', 
    marginBottom: 25, 
    textAlign: 'center',
    letterSpacing: 2
  },
  label: { 
    fontSize: 14, 
    color: '#0ff', 
    marginBottom: 10, 
    fontWeight: '600',
    letterSpacing: 1
  },
  input: { 
    backgroundColor: '#111', 
    color: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#333', 
    fontSize: 18, 
    marginBottom: 20 
  },
  btnRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  langBtn: { 
    flex: 0.48, 
    padding: 15, 
    borderRadius: 12, 
    backgroundColor: '#222', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  activeBtn: { 
    backgroundColor: 'rgba(0, 255, 255, 0.2)', 
    borderColor: '#0ff' 
  },
  langTxt: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16
  },
  saveBtn: { 
    backgroundColor: '#0ff', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  saveTxt: { 
    color: '#000', 
    fontWeight: '900', 
    fontSize: 16,
    letterSpacing: 1
  }
});
