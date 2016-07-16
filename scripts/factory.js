function FirebaseFactory() {

    var config = {
        apiKey: "AIzaSyA3tpyCF03krkl94xU5Ie1XPGmoa3xPuWM",
        authDomain: "clueless-fbb5e.firebaseapp.com",
        databaseURL: "https://clueless-fbb5e.firebaseio.com"
    };

    var myFirebase = firebase.initializeApp(config);

    this.db = myFirebase.database();

}