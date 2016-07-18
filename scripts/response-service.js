function ResponseService() {

  // Initialize Firebase

    var firebase = new FirebaseFactory();

    var db = firebase.db;
    var topicId = location.search.slice(location.search.indexOf('=')+1);
    var baseUrl = '/topics-list/' + topicId + '/responses/';
    var responseListRef = db.ref(baseUrl);
    var responseList;

    this.saveResponse = function(response) {
        db.ref(baseUrl + response.studentName).set(response);
    }

    this.getTopic = function(cb){
        db.ref('/topics-list/' + topicId).on('value', function(snapshot){
            if (snapshot.val() == undefined) {
                cb(undefined);
            } else {
                cb(snapshot.val().topic);
            }
        });
    }

    this.getResponses = function(callback) {
        responseListRef.on('value', function(snapshot){
            callback(snapshot.val());
        });
    }

}