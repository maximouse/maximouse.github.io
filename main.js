
const step = 28.2;
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

function currentStage(stage) {
    switch (stage){
        case 0:
            drawArrow(0, a);
            showInput(values[stage], 0, a);
            checkAnswer(values[stage], a);
            break;
        case 1:
            drawArrow(a, c);
            showInput(values[stage], a, c);
            checkAnswer(values[stage], b);
            break;
        case 2:
            changeQuestionToInput("c");
            checkAnswer(values[stage], c);
            break;
        case 3:
            win();
            break;
    }
}

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


/// Labels and inputs
function showInput(name, a, b) {
    var height = generateBezier(a, b);
    console.log(height[3]);
    var val = (b+a)/2;
    $("#main-container").append('<input type="text" name='+name+' maxlength="1">');
    $("input[name$="+name+"]").css({
        bottom: 190 - height[3] +'px',
        left: (step)*val + 10 +'px'
    }).focus();

}

function changeQuestionToInput(id) {
    $(".example>#c").remove();
    $(".example").append('<input type="text" id=c name=c maxlength="2">');
    $("#c").css({
        display: "inline-block",
        height: "50px",
        width: "50px",
        fontSize: "40px",
        position: "inherit"
    }).focus();
}

function changeImputToLabel(name, val) {
    var input = $('input[name$='+name+']');
    var position = input.position();
    input.remove();

    var $span = $('<span />', {
        id: name,
        class: "label",
        text: val
        }).css({
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

///Generate and refresh example
function generateExample() {
    a = getRandomInteger(6, 9);
    c = getRandomInteger(11, 14);
    b = c - a;
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
    var $input = $(":input[name$="+input_name+"]");
    $input.keydown(function() {
        if($(this).attr('maxlength') == $(this).val().length) {
            $(this).val('');
        }
    });

    $input.keyup(function() {
        var value = $(this).val();
        if(value != val){
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
    });
}

///SVG drawing
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
        .attr('d', "M" + a*step + ",160 C"+args[0]+","+args[1]+","+args[2]+","+args[3]+"," + b*step +" ,160")
        .attr('stroke', "#f00")
        .attr('fill', 'transparent')
        .attr('stroke-width', "2")
        .attr('marker-end', 'url(#arrow)')
        .appendTo($svg);
}

function generateBezier(a, b) {
    var result = [];
    result[0] = (a + (b-a)/3)*step;
    result[1] = 300/(b-a);
    result[2] = (b - (b-a)/3)*step;
    result[3] = 300/(b-a);
    console.log(result[3]);
    return result;
}
///Other stuff
function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}