(function(){

    var rs = new ResponseService();

    function Response(name, status, comment) {
        this.studentName = name;
        this.status = status;
        this.comment = comment;
    }

    // Create new response object on form submission
    $('#student-form').on('submit', function(event){
        event.preventDefault();
        var form = this;
        var name = form.studentName.value;
        var status = form.status.value;
        var comment = form.comments.value;
        var response = new Response(name, status, comment);
        rs.saveResponse(response);
    });

    // Require comment field if red button is selected
    $('input[name=status]').on('click', function(event){
        if ($(event.target).filter('#red').length) {
            $('#comment-field').prop('required', true);    
        } else {
            $('#comment-field').removeAttr('required');                
        }
    });

    // Show topic
    rs.getTopic(showTopic);
    
    function showTopic(topic){
        $('#prompt').empty();
        if (topic == undefined) {
            $('#prompt').append(`<h2 class="url-error">Uh oh, it looks like you're trying to access a topic that doesn't exist. Check your URL and try again.</h2>`);
            $('form').addClass('hidden');
            return;
        } 
        $('#prompt').append(`<h2>How are you feeling about <strong>${topic}</strong>?</h2>`);
    }

    // // Do something when break button is pushed
    // $('#break-btn').on('click', function(){
    //     var breakNeeded = true;
    //     console.log(breakNeeded);
    // });

})();