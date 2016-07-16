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
            <h3>${is.getUrl(id)}</h3>`);
    });

    $('#load-data').on('click', function(){
        is.getResponses(function(responses){
            console.log(responses);
            // $('#results').replaceWith(``);
        });
    });







})();
