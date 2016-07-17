(function(){

    var is = new InstructorService();

    // Create new topic and generate URL for student input
    $('#prompt-form').on('submit', function(event){
        event.preventDefault();
        var form = this;
        var topic = this.topic.value;
        var id = is.saveTopic(topic);
        $('#topic-url').replaceWith(
            `<h2>Send this URL to the students!</h2>
            <h3>${is.getStudentUrl(id)}</h3>
        `);
    });

    // Toggle display of new topic form
    $('#new-topic-btn').on('click', function(){
        $('#prompt').toggleClass('hidden');
    });

    // Toggle display of topics list
    $('#prev-topics-btn').on('click', function(){
        $('#prev-topics').toggleClass('hidden');
    });

    // Toggle display of results
    $('#results-btn').on('click', function(){
        $('#results').toggleClass('hidden');
    });    

    // Generate list of all previous topics
    is.getAllTopics(function(topics){
        $('#prev-topics').empty();
        for (var id in topics) {
            var topic = topics[id];
            $('#prev-topics').prepend(`
            <button type="button" class="list-group-item" id="${topic.id}">${topic.topic}</button>
            `);
        }
        $('#prev-topics').prepend(`<h1>Select a topic to see results</h1>`);
    });

    // Get responses for a selected topic
    $('#prev-topics').on('click', 'button', function(){
        var id = this.id;
        is.getResponses(id, drawResponses);
    });

    // Display responses for a selected topic
    function drawResponses(responses){
        var i = 0;
        $('#prompt').addClass('hidden');
        $('#prev-topics').addClass('hidden');
        $('#results').removeClass('hidden');

        is.getTopic(showTopic);

        function showTopic(topic){
            $('#results-header').empty();            
            $('#results-header').prepend(`<h1>Results for ${topic}</h1>
            <h3>Overall comprehension rate</h3>`);
        }

        $('#response-list').empty();

        if (!responses) {
            $('#box').css( "width", 100+"%");
            $('#box').css( "background", '#aaa');
            $('.inch').text('No responses yet');
            return;
        }

        $('#response-list').prepend(`<h3>Student Responses</h3>`);

        for (var name in responses) {
            var response = responses[name];
            if (response.status == 'green') {
                i += 1;
            } else if (response.status == 'yellow') {
                i += 0.5;
            } else {
                i += 0;
            }
            $('#response-list').append(`
                <li class="list-group-item col-xs-offset-1 col-xs-10 col-md-offset-0 col-md-6">
                    <p>${response.studentName}: ${response.status}</p>
                    <p>${response.comment}<p></li>
            `);
        }

        // Update overall % comprehension & thermostat display
        var totalResponses = Object.keys(responses).length;
        var avg = i/totalResponses * 100;
        $('#box').css( "width", avg.toFixed()+"%")
        if (avg>=0 && avg<=33.3){
            $('#box').css("background","red")
        };
        if (avg>33.3 && avg<=66.6){
            $('#box').css("background","yellow")
        }
        if (avg>66.6 && avg<=100){
            $('#box').css("background","green")
        }
        $('.inch').text(avg.toFixed() + '%');
    }

})();
