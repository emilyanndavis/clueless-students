function ResponseService() {

  // Initialize Firebase

    var firebase = new FirebaseFactory();

    var db = firebase.db;
    
    var baseUrl = '/topics-list/' + location.search.slice(location.search.indexOf('=')+1) + '/responses/';
    var responseListRef = db.ref(baseUrl);
    var responseList;

    this.saveResponse = function(response) {
        db.ref(baseUrl + response.studentName).set(response);
    }

    this.getResponses = function(callback) {
        responseListRef.on('value', function(snapshot){
            callback(snapshot.val());
        });
    }


}