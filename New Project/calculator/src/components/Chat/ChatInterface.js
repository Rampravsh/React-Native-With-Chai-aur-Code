import React, { useRef } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

export const ChatInterface = ({ messages, onSend, isThinking }) => {
  const flatListRef = useRef(null);

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
      />
      <ChatInput onSend={onSend} />
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
  }
});
