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
        `);
    });

    $('#new-topic-btn').on('click', function(){
        $('#prompt').toggleClass('hidden');
    });

    $('#prev-topics-btn').on('click', function(){
        $('#prev-topics').toggleClass('hidden');
    });

    $('#results-btn').on('click', function(){
        $('#results').toggleClass('hidden');
    });    


    is.getAllTopics(function(topics){
        $('#prev-topics').empty();
        for (var id in topics) {
            var topic = topics[id];
            $('#prev-topics').prepend(`
            <button type="button" class="list-group-item" id="${topic.id}">${topic.topic}</button>
            `);
        }
    });

    $('#prev-topics').on('click', 'button', function(){
        var id = this.id;
        is.getResponses(id, drawResponses);
    });

    function drawResponses(responses){
        var i = 0;
        $('#prompt').addClass('hidden');
        $('#prev-topics').addClass('hidden');
        $('#results').removeClass('hidden');
        console.log(responses);
        $('#response-list').empty();
        if (!responses) {
            $('#box').css( "width", 100+"%");
            $('#box').css( "background", '#aaa');
            $('.inch').text('No responses yet');
            return;
        }
        for (var name in responses) {
            var response = responses[name];
            if (response.status == 'green') {
                i += 1;
            } else if (response.status == 'yellow') {
                i += 0.5;
            } else {
                i += 0;
            }
            console.log(response.studentName);
            console.log(response.status);
            $('#response-list').append(`
                <li class="list-group-item col-md-offset-2 col-md-4">
                    <p>${response.studentName}: ${response.status}</p>
                    <p>${response.comment}<p></li>
            `);
        }
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
