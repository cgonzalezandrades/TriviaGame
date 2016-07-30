
    var timer = {
        time: 0,
        start: function () {
            var timeInterval = setInterval(timer.count, 1000);
        },
        count: function () {
            $(".stopWatch").empty();
            timer.time++;
            var converter = timer.timeConverter(timer.time);

            var $timeStamp = $("<div/>")
                .addClass("col-sm-offset-1 col-sm-2 time")
                .html(converter);

            $(".stopWatch").append($timeStamp);
            if (timer.time === 5) {
                questionCount++;
                timer.time = 0;
                createQuestions(questionCount);


            }


        },

        timeConverter: function (t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            //           
            return seconds;
        }
    }


    window.onload = function () {

        console.log(Questions.quiz.length);

        var $startButton = $("<button/>")
            .addClass("start-button btn btn-default btn-lg")
            .html("Start Game");

        $("#start").append($startButton);
        $("#start").on("click", timer.start);
        $("#start").click(startTrivia);
    }

    function startTrivia() {

        $("#start").hide();
        createQuestions(questionCount);
        questionCount = 0;



        //         $(".trivia").hide();
    }

    function createQuestions(count) {

        $(".question-row").empty();
        $(".choice-row").empty();

        var $question = $("<div/>")
            .addClass(" col-sm-offset-3 col-sm-6 question")
            .html(Questions.quiz[count].question);

        $(".question-row").append($question);


        for (var i = 0; Questions.quiz[count].choices.length > i; i++) {
            var $choices = $("<div/>")
                .addClass("col-sm-offset-3 col-sm-6 choice")
                .attr('answer-id', i)
                .html(Questions.quiz[count].choices[i]);

            $(".choice-row").append($choices);

        }


        $(".choice").on("click", function click() {

            var attribute = this.getAttribute('answer-id');

            checkAnswer(questionCount, attribute);
            timer.time = 0;
            questionCount++;
            createQuestions(questionCount);

        });
    }

    function checkAnswer(count, attribute) {

        if (Questions.quiz[questionCount].answer === Questions.quiz[questionCount].choices[attribute]) {

            console.log("inside the if");
            showCorrectAnswer();


        }

    }

    function showCorrectAnswer() {
        
            $(".question-row").empty();
            $(".choice-row").empty();
            $(".stopWatch").empty();

            var $correctAnswerPicture = $("<div/>").addClass("col-sm-offset-4 col-sm-6").html("<img src='assets/images/mario.gif'>");

            var $correctAnswerComment = $("<div/>")
                .addClass("col-sm-offset-4 col-sm-6")
                .html(Questions.quiz[questionCount].comments);

            var $correctAnswerbutton = $("<div/>")
                .addClass("col-sm-offset-4 col-sm-6 click-me")
                .html("Click ME");

            $(".correctAnswer").append($correctAnswerPicture);
            $(".comments-correct-answer").append($correctAnswerComment);
            $(".comments-correct-answer").append($correctAnswerbutton);


        
    }


//<!--<img src="assets/images/mario.gif"-->
