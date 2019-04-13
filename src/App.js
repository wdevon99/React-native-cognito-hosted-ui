import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import SafariView from "react-native-safari-view";
import InAppBrowser from "react-native-inappbrowser-android";
import { LOGIN_URL, LOGOUT_URL } from './constants'
import { getTokenbyCode } from './AuthService'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: null
    }
  }

  componentDidMount() {
    Linking.addEventListener("url", this.eventHandler);
  }

  eventHandler = event => {
    const code = event.url.split("?code=")[1];
    if (!code) return;
    
    const validCode = code.match(/[a-z \ 0-9\-]{10,}/)[0];

    getTokenbyCode(validCode).then(res => {
      const tokens = JSON.parse(res._bodyInit);
      console.log(tokens);
      this.setState({ tokens })
    }).catch(error => {
      console.error(error);
    });

    Platform.OS === "ios" && SafariView.dismiss();
  };


  handleBrowser = url => {
    Platform.OS === "ios" ?
      SafariView.show({ url }) :
      InAppBrowser.open(url, {
        showTitle: true,
        toolbarColor: "#6200EE",
        secondaryToolbarColor: "black",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        headers: { "my-custom-header": "Neami SSO" }
      }).then(result => {
        console.log("result", JSON.stringify(result));
      });
  };

  onLogin = () => {
    this.handleBrowser(LOGIN_URL);
  }

  onLogout = () => {
    this.handleBrowser(LOGOUT_URL);
    this.setState({ tokens: null});
    Platform.OS === "ios" && SafariView.dismiss();
  }

  render() {
    const { tokens } = this.state;
    return (
      <View style={styles.container}>
        {
          !tokens ? (
            <View>
              <Text>Please Login :)</Text>
              <TouchableOpacity style={styles.btnLogin} onPress={this.onLogin}>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <View>
                <Text>Hi, you are logged in!</Text>
                <TouchableOpacity style={styles.btnLogout} onPress={this.onLogout}>
                  <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>
                <Text>Id Token: {tokens.id_token}</Text>
              </View>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#177dd1',
    padding: 10,
    margin: 10
  },
  btnLogout: {
    backgroundColor: '#ed2f2f',
    padding: 10,
    margin: 10
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  }
});
