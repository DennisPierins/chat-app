import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    this.setState({
      messages: [
        {
          _id: 2,
          text: "Stop talking to yourself, Dennis",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: `${this.props.route.params.name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#25d366'
          },
        }}
      />
    );
  }

  render() {
    let color = this.props.route.params.color;
    return (
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View >
    );
  }
}









// import React from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { GiftedChat } from 'react-native-gifted-chat'

// export default class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ''
//     };
//   }

//   alertMyText(input = []) {
//     Alert.alert(input.text);
//   }

//   render() {
//     let name = this.props.route.params.name;
//     let color = this.props.route.params.color

//     this.props.navigation.setOptions({ title: name });

//     return (
//       <View style={{ flex: 1, justifyContent: 'center', backgroundColor: color }}>
//         <View>
//           <TextInput
//             style={{ height: 40, borderColor: 'black', borderWidth: 1, width: '88%', alignSelf: 'center', color: 'white', borderWidth: 1.5, borderRadius: 2, borderColor: 'white' }}
//             onChangeText={(text) => this.setState({ text })}
//             value={this.state.text}
//             placeholder='Start Typing Here' placeholderTextColor='gray'
//           />
//           <Text style={{ marginLeft: '6%', paddingTop: 30, paddingBottom: 40, color: 'white' }}>You wrote: {this.state.text}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.sendButton}
//           onPress={() => {
//             this.alertMyText({ text: this.state.text });
//           }}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View >
//     )
//   }
// }

// const styles = StyleSheet.create({
//   sendButton: {
//     width: '88%',
//     height: '30%',
//     marginTop: 5,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginBottom: '5%',
//     alignItems: 'center',
//     borderColor: 'white',
//     borderWidth: 1.5,
//     borderRadius: 2,
//     opacity: 50
//   },
//   sendButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#ffffff'
//   }
// });