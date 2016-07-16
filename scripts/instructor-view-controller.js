(function(){

    var is = new InstructorService();



    $('#prompt-form').on('submit', function(event){
        event.preventDefault();
        var form = this;
        var topic = this.topic.value;
        var id = is.saveTopic(topic);
        console.log(id);
        $('#topic-url').replaceWith(
            `<h2>Send this URL to the students!</h2>
            <h3>${is.getStudentUrl(id)}</h3>
            <h2>Go to this URL to see the responses:</h2>
            <h3>${is.getInstructorUrl(id)}</h3>`);
    });

    $('#load-data').on('click', function(){
        is.getResponses(function(responses){
            console.log(responses);
            $('#response-list').empty();
            for (var name in responses) {
                var response = responses[name];
                console.log(response.studentName);
                console.log(response.status);
                $('#response-list').append(`
                    <li class="list-group-item green col-md-offset-2 col-md-4">
                        <div class="glyphicon glyphicon-thumbs-up"></div>
                     ${response.studentName}: ${response.status}</li>
                `);
            }
        });
    });







})();
