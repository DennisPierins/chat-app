import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

// Importing and establishing a connection to Firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: ''
      },
    };

    // Connecting to the database
    const firebaseConfig = {
      apiKey: "AIzaSyD2s7WA7f0rHgYbnWn-KP3V31lqs2E6YYU",
      authDomain: "chat-app-fbed5.firebaseapp.com",
      projectId: "chat-app-fbed5",
      storageBucket: "chat-app-fbed5.appspot.com",
      messagingSenderId: "866020060194",
      appId: "1:866020060194:web:1f48a6a7ad057e0dfbee7b",
      measurementId: "G-GBRD4GXX8X"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatUser = null;

    // Reference to the messages collection
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Go through each document
    querySnapshot.forEach((doc) => {
      // Get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({
      messages,
    });
  };

  // addMessage function gets called whenever users send a message
  addMessage() {
    const message = this.state.messages[0];
    //add a new mesage to the collection
    this.referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,  //I think it will be something like this.  Remember, not something static like shoppingList
      text: message.text,
      user: message.user
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
      });
  }

  componentDidMount() {
    // firebase.auth calls the firebase auth service for the app
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      this.setState({
        user: {
          _id: user.uid,
          name: this.props.route.params.name,
          avatar: 'https://placeimg.com/140/140/any',
          createdAt: new Date()
        },
        messages: [],
      });

      // Calling onSnapshot function to receive updated data
      this.referenceChatMessages = firebase.firestore().collection('messages');
      this.unsubscribeChatUser = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    // Stop receiving updates from collection
    this.authUnsubscribe();
    // Stop listening to authentication
    this.unsubscribeChatUser();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          // Change background color of right message bubble
          right: {
            backgroundColor: '#25d366'
          },
        }}
      />
    );
  }

  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    // Username to be displayed at the top of the screen
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View >
    );
  }
}
