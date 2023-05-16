import React, { useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { chatGPT } from '../api';
import { View } from 'react-native';

export const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [text, setText] = useState('');
  console.log(text);
  const onSend = async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    setIsTyping(true);
    try {
      const response = await chatGPT(newMessages[0].text);
      const assistantMessage: IMessage = {
        _id: Date.now(),
        text: response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bhuma',
        },
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, assistantMessage));
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <View style={{
      flex: 1,
      width: '100%',
      padding: 0,
      paddingBottom: 32,
      margin: 0,
    }}>
    <GiftedChat
        messages={messages}
        text={text}
        onInputTextChanged={setText}
        onSend={(messages) => onSend(messages)}
        showUserAvatar
        infiniteScroll
        alwaysShowSend
        scrollToBottom
        isTyping={isTyping}
        user={{
          _id: 1,
        }}
        isCustomViewBottom
        showAvatarForEveryMessage

    />
    </View>
  );
};
