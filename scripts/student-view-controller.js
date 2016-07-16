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
        console.log(response);
        rs.saveResponse(response);
    });

    // Require comment field if red button is selected
    $('input[name=status]').on('click', function(event){
        if ($(event.target).filter('#red').length) {
            console.log('checked');
            $('#comment-field').prop('required', true);    
        } else {
            console.log('unchecked');
            $('#comment-field').removeAttr('required');                
        }
        console.log('huh?');
    });

    // Do something when break button is pushed
    $('#break-btn').on('click', function(){
        var breakNeeded = true;
        console.log(breakNeeded);
    });

})();