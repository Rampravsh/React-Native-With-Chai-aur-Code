import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

export const ChatInterface = ({ messages, onSend, isThinking, onOpenCalculator }) => {
  const flatListRef = useRef(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    // Threshold defined to accurately detect when the user scrolls away from absolute bottom
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    setShowScrollBottom(distanceFromBottom > 50);
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble text={item.text} isAI={item.isAI} />}
        contentContainerStyle={styles.listContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={
          isThinking ? (
            <View style={styles.thinkingContainer}>
               <ActivityIndicator color="#0ff" size="small" />
               <Text style={styles.thinkingText}>AI is calculating...</Text>
            </View>
          ) : null
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {showScrollBottom && (
        <TouchableOpacity style={styles.scrollBtn} onPress={scrollToBottom} activeOpacity={0.7}>
           <Ionicons name="chevron-down" size={26} color="#0ff" />
        </TouchableOpacity>
      )}
      <ChatInput onSend={onSend} onOpenCalculator={onOpenCalculator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContent: {
    padding: 25,
    paddingBottom: 40,
  },
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderBottomLeftRadius: 6,
  },
  thinkingText: {
    color: '#0ff',
    marginLeft: 10,
    fontSize: 14,
    fontStyle: 'italic',
  },
  scrollBtn: {
    position: 'absolute',
    bottom: 95, 
    right: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.5)',
    zIndex: 100,
    elevation: 5,
  },
  scrollIcon: {
    fontSize: 20,
  }
});
