/**
 * Created by MAXIMUS on 18.10.2017.
 */
const step = 28.5;
var a, b, c, prev_a, stage;
var values = ["a", "b", "c"];
window.onload = function () {
    start();
}

function start() {
    $('svg').empty();
    stage = 0;
    generateExample();
    currentStage(stage)

}

function currentStage(stage) { //case
    switch (stage){
        case 0:
            drawArrow(0, a);
            showInput(values[stage], a/2);
            checkAnswer(values[stage], a);
            break;
        case 1:
            drawArrow(a, c);
            showInput(values[stage], c-b/2);
            checkAnswer(values[stage], b);
            break;
        case 2:

            changeQuestionToInput("c");
            checkAnswer(values[stage], c);
            break;
        case 3:
            win();
    }
}
/*
function currentStage(stage) { //case
    if (stage == 0){
        drawArrow(0, a);
        showInput(values[stage], a/2);
        checkAnswer(values[stage],values[stage], a);
    } else if (stage == 1){
        drawArrow(a, c);
        showInput(values[stage], c-b/2);
        checkAnswer(values[stage], values[stage], b);
    } else if (stage == 2){
        win();
    }
}
*/
function win() {
    var $btn = $('<button/>', {
        type: 'button',
        text: 'Заново!',
        id: 'win-button',
        }).click(function(){
            removeLabels();
            start();
            $(this).remove();});
    $btn.appendTo($('#main-container'));
}

function changeQuestionToInput(id) {
    $("#c").remove();
    $(".example").append('<input type="text" id=c name=c>');
    $("#c").css({
        display: "inline-block",
        height: "50px",
        position: "inherit"
    }).focus();
}

function changeImputToLabel(name, val) {
    var position = $('input[name$='+name+']').position();
    $('input[name$='+name+']').remove();

    var $span = $('<span />', {
        id: name,
        class: "label",
        text: val
    });
    $span.css({
        top: position.top + 5,
        left: position.left + 5});
    if(stage<2){
        $span.appendTo($('#main-container'));
    } else{
        $span.appendTo($('.example'));
    }


}
function removeLabels() {
    $('.label').each(function () {
        if($(this).attr('id') != 'c') {
            $(this).remove();
        }
    });
}
/*
function removeImputs() {
    $('input').each(function () {
        $(this).remove();
    });
}
*/
function generateExample() {
    a = getRandomInteger(6, 9);
    c = getRandomInteger(11, 14);
    b = c - a;
    console.log(a, b, c);
    $('#a').html(a);
    $('#b').html(b);
    $('#c').html("?");
}

function refreshExample(stage) {
    $('#a').html(a);
    $('#b').html(b);
    if(stage<3) {
        $('#c').html("?");
    } else {
        $('#c').html(c);
    }
}
function checkAnswer(input_name, val) {
    $(":input[name$="+input_name+"]").keydown(function() {
       // $(this).val('');
    })
    $(":input[name$="+input_name+"]").keyup(function() {
        var value = $(this).val();
        if(value != val){ // допилить
            $(":input[name$="+input_name+"]").css({color: "red"});

            if(stage<2){
                console.log(stage);
                $('#'+input_name).css({
                    background: "orange"
                });}
        } else{
            $('#'+input_name).css({
                background: 'transparent'
            });
            changeImputToLabel(values[stage], val);
            stage++;
            refreshExample(stage);
            currentStage(stage);

        }
    })
}
/*
function checkAnswer(input_name, term, val) {
    $(":input[name$="+input_name+"]").keydown(function() {
        $(this).val('');
    })
    $(":input[name$="+input_name+"]").keyup(function() {
        var value = $(this).val();
        if(value != val){ // допилить
            $(":input[name$="+input_name+"]").css({color: "red"});

                if(stage<3){
                    console.log(term);
                    $('#'+term).css({
                        background: "orange"
                    });}
        } else{
            $('#'+term).css({
                background: 'transparent'
            });
            changeImputToLabel(values[stage], val);
            stage++;
            refreshExample(stage);
            currentStage(stage);

        }
    })
}
*/
function showInput(name, val) {
    $("#main-container").append('<input type="text" name='+name+'>');
    $("input[name$="+name+"]").css({
        top: '330px',
        left: (step)*val + 10 +'px'
    }).focus();

}


function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function drawArrow(a,b) {
    var $svg = $("svg");
    $(SVG('defs'))
        .appendTo($svg);
    $(SVG('marker'))
        .attr('id', "arrow")
        .attr('markerWidth', '10')
        .attr('markerHeight', '10')
        .attr('refX', '8')
        .attr('refY', '3')
        .attr('orient', 'auto')
        .attr('markerUnits', 'strokeWidth')
        .appendTo($("defs"));
    $(SVG('path'))
        .attr('d', "M0,0 L0,6 L9,3 z")
        .attr('fill', '#f00')
        .appendTo($("marker"));
    var args = generateBezier(a, b);

    $(SVG('path'))
        //.attr('d', "M" + a + ",440 A5,5 0 0, 1 " + b +",425")
        //.attr('d', "M" + a + ",440 C100,350,200,350," + b +" ,425")
        .attr('d', "M" + a*step + ",160 C"+args[0]+","+args[1]+","+args[2]+","+args[3]+"," + b*step +" ,160")
        .attr('stroke', "#f00")
        .attr('fill', 'transparent')
        .attr('stroke-width', "2")
        .attr('marker-end', 'url(#arrow)')
        .appendTo($svg);
};
function generateBezier(a, b) {
    var result = [x1=0, y1=0, x2=0, y2=0];
    result[0] = Math.ceil((a + Math.ceil((b-a)/3))*step);
    result[1] = 80;

    result[2] = Math.ceil((b - Math.ceil((b-a)/3))*step);
    result[3] = 80;

    return result;
}
function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}