function InstructorService() {

    var firebase = new FirebaseFactory();

    var db = firebase.db;
    var currentKey;
    var baseUrl;

    function makeUrl(currentKey) {
        baseUrl = '/topics-list/' + currentKey + '/responses/';
    };

    var responseListRef = db.ref(baseUrl);

    this.getStudentUrl = function(id) {
        return '127.0.0.1:8080?id=' + id; 
    };

    this.getInstructorUrl = function(id) {
        return '127.0.0.1:8080/instructor.html?id=' + id; 
    };
    
    this.saveTopic = function(topic) {
        var topicRef = db.ref('/topics-list/').push();
       var x = {
           topic: topic
       }
       x.id = topicRef.key
       topicRef.set(x);
       currentKey = x.id;
       makeUrl(currentKey);
       return x.id;
    };

    function responseList(baseUrl) {
        return db.ref(baseUrl);
    }

    this.getResponses = function(id, callback) {
        makeUrl(id);
        responseList(baseUrl).on('value', function(snapshot){
            callback(snapshot.val());
        });
    };

    this.getAllTopics = function(callback){
        db.ref('/topics-list/').on('value', function(snapshot){
            callback(snapshot.val());            
        });
    }

}









// function getData(url, callWhenDone) {
//   var inputs = [];
//   $.getJSON(url, function (data) {
//     $.each(data, function (i, val) {
//       var userData = JSON.stringify(data[i].val)
//       inputs.push(userData)
//     })
//   callwhendone(inputs)
//   })
// }

// function saveData(url, callwhendone) {
//   getData(url, function(inputs) {
//   for (prop in inputs) {
//     if (prop[inputs]) {

//     }
//   }

//   });

// }




// function average(values) {
//   for (var i; i < values.length; i++) {
//     var sumValues = 0
//     var valueAtI = values[i]
//     sumValues = sumValues + values[i]
   
//   }
// }

// function count(values) {
//   for (var i; i < values.length; i++) {
//     if (values[i] == 1) {
//       var valof1 = value[i]
//       var numberof1 = values[i] + values[i]
//       return numberof1
//     }
//     if (values[i] == 2) {
//       var valof2 = (values[i] - 1)
//       var numberof2 = valof2 + valof2
//       return numberof2

//     }
//   } if (values[i] == 3) {
//     var valof3 = (values[i] - 2)
//     var numberof3 = valof3 + valof3
//     return numberof3 
//   }

// }
// function percentOf(){
//   patternArray = [];

//   var total = values.length;
//   var percentOf1 = total / numberof1
//   var percentOf2 = total / numberof2
//   var percentOf3 = total / numberof3
//   patternArray.push(percentOf1)
//   patternArray.push(percentOf2)
//   patternArray.push(percentOf3)
//   return patternArray
// } 


// $("#percent").append(`${patternArray[3]}`)



