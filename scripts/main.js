(function(){

    function Response(student, status, comment) {
        this.student = student;
        this.status = status;
        this.comment = comment;
    }

    var responses = [];

    $('#student-form').on('submit', function(e){
        e.preventDefault();
        var form = this;
        var student = form.studentName.value;
        var status = form.status.value;
        var comment = form.comments.value;
        var response = new Response(student, status, comment);
        console.log(response);
        responses.push(response);
        console.log(responses);
    });



})();