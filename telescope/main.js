$(document).ready(function(){


    $('#start').show();

    $('.hover_bkgr_fricc').click(function(){

        $('.hover_bkgr_fricc').hide();

    });
    $('.popupCloseButton').click(function(){

        $('.hover_bkgr_fricc').hide();

    });


    var counter=0;
    var native_width = 0;
    var native_height = 0;
    var win = false;
    var dog1 = {x: 330, y: 330, checked: false}, dog2 = {x: 750, y: 450, checked: false}, dog3 = {x: 167, y: 900, checked: false}, dog4 = {x: 720, y: 880, checked: false}, dog5 = {x: 410, y: 1300, checked: false};
    function count() {
        ++counter;
        $(".counter").text(counter);
        $(".counter").fadeToggle(500);
        $(".counter").fadeToggle(500);
    }
    //$(".large").css("background","url('" + $(".small").attr("src") + "') no-repeat");
    $(".large").css("background","url('universe4k.jpg') no-repeat");

    //Now the mousemove function
    $(".magnify").mousemove(function(e){
        //When the user hovers on the image, the script will first calculate
        //the native dimensions if they don't exist. Only after the native dimensions
        //are available, the script will show the zoomed version.
        if(!native_width && !native_height)
        {
            //This will create a new image object with the same image as that in .small
            //We cannot directly get the dimensions from .small because of the
            //width specified to 200px in the html. To get the actual dimensions we have
            //created this image object.
            var image_object = new Image();
            image_object.src = $(".small").attr("src");
            //image_object.src = $(".small").attr("src");
            //This code is wrapped in the .load function which is important.
            //width and height of the object would return 0 if accessed before
            //the image gets loaded.
            native_width = image_object.width * 1;
            native_height = image_object.height  * 1;

        }
        else
        {
            //x/y coordinates of the mouse
            //This is the position of .magnify with respect to the document.
            var magnify_offset = $(this).offset();
            var range = 120;
            //We will deduct the positions of .magnify from the mouse positions with
            //respect to the document to get the mouse positions with respect to the
            //container(.magnify)
            var mx = e.pageX - magnify_offset.left ;
            var my = e.pageY - magnify_offset.top ;
            if((dog1.x+range>e.pageX && e.pageX>dog1.x-range) && (dog1.y+range>e.pageY && e.pageY>dog1.y-range) && dog1.checked == false){

                console.log("Hit!");
                dog1.checked = true;
                console.log(dog1.checked);
               count();
            }
            if((dog2.x+range>e.pageX && e.pageX>dog2.x-range) && (dog2.y+range>e.pageY && e.pageY>dog2.y-range) && dog2.checked == false){

                console.log("Hit! 2");
                dog2.checked = true;
                console.log(dog2.checked);
                count();
            }
            if((dog3.x+range>e.pageX && e.pageX>dog3.x-range) && (dog3.y+range>e.pageY && e.pageY>dog3.y-range) && dog3.checked == false){

                console.log("Hit 3!");
                dog3.checked = true;
                console.log(dog3.checked);
                count();
            }
            if((dog4.x+range>e.pageX && e.pageX>dog4.x-range) && (dog4.y+range>e.pageY && e.pageY>dog4.y-range) && dog4.checked == false){

                console.log("Hit 4!");
                dog4.checked = true;
                console.log(dog4.checked);
                count();
            }
            if((dog5.x+range>e.pageX && e.pageX>dog5.x-range) && (dog5.y+range>e.pageY && e.pageY>dog5.y-range) && dog5.checked == false){

                console.log("Hit 5!");
                dog5.checked = true;
                console.log(dog5.checked);
                count();
            }

            if(dog1.checked == true && dog2.checked == true && dog3.checked == true && dog4.checked == true && dog5.checked == true && win==false){
                win = true;
                console.log("win!");
                $(".small").attr('src', 'universe4k.jpg');
                //$(".message").text('Молодец!');
                //$('#win').show();
                $('#win').show();

                $('.popupCloseButton1').click(function(){

                    $('.hover_bkgr_fricc1').hide();

                });
            }
            console.log(e.pageX,  e.pageY);


            //Finally the code to fade out the glass if the mouse is outside the container
            if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
            {
                $(".large").fadeIn(100);
            }
            else
            {
                $(".large").fadeOut(100);
            }
            if($(".large").is(":visible"))
            {
                //The background position of .large will be changed according to the position
                //of the mouse over the .small image. So we will get the ratio of the pixel
                //under the mouse pointer with respect to the image and use that to position the
                //large image inside the magnifying glass
                var rx = Math.round(mx/$(".small").width()*native_width - $(".large").width()/2)*-1;
                var ry = Math.round(my/$(".small").height()*native_height - $(".large").height()/2)*-1;
                var bgp = rx + "px " + ry + "px";

                //Time to move the magnifying glass with the mouse
                var px = mx - $(".large").width()/2;
                var py = my - $(".large").height()/2;
                //Now the glass moves with the mouse
                //The logic is to deduct half of the glass's width and height from the
                //mouse coordinates to place it with its center at the mouse coordinates

                //If you hover on the image now, you should see the magnifying glass in action
                $(".large").css({left: px, top: py, backgroundPosition: bgp});
            }
        }
    })
})

$(window).load(function () {


});

