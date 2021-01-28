import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const image = require('../assets/BackgroundImage.png');

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
    };
  }

  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Chat App</Text>
          {/* Another View Container for user to input name and select color*/}
          <View style={styles.startContainer}>
            <TextInput
              style={styles.nameInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name} placeholder='Your name'
            />
            <Text style={styles.choosingColorText}>Choose a background color:</Text>
            {/* Another View Container to choose background colors*/}
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[styles.color, { backgroundColor: '#090C08' }]}
                onPress={() => {
                  this.setState({ color: '#090C08' });
                }}
              />
              <TouchableOpacity
                style={[styles.color, { backgroundColor: '#474056' }]}
                onPress={() => {
                  this.setState({ color: '#474056' });
                }}
              />
              <TouchableOpacity
                style={[styles.color, { backgroundColor: '#8A95A5' }]}
                onPress={() => {
                  this.setState({ color: '#8A95A5' });
                }}
              />
              <TouchableOpacity
                style={[styles.color, { backgroundColor: '#B9C6AE' }]}
                onPress={() => {
                  this.setState({ color: '#B9C6AE' });
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}>
              < Text style={styles.buttonText}>Let's Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1
  },
  startContainer: {
    flex: 1,
    width: '88%',
    height: '44%',
    backgroundColor: '#fff',
    marginBottom: 40,
    alignSelf: 'center',
    alignItems: 'center'
  },
  color: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    margin: 10,
    marginTop: 5
  },
  nameInput: {
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '300',
    width: '88%',
    height: '20%',
    marginBottom: 10,
    marginTop: 15,
    borderColor: '#757083',
    borderWidth: 1.5,
    borderRadius: 2,
    opacity: 50,
    textAlign: 'center',
  },
  choosingColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
    alignSelf: 'center',
    marginTop: '20%',
  },
  button: {
    backgroundColor: '#757083',
    width: '88%',
    height: '20%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff'
  }
});