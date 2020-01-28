$(document).ready(function()
{
    //variable declaration
    var windowHeight=$(window).height();
    var windowWidth=$(window).width();
    var sections=$("div[class*='slide']");  //Div objects that will be animated
    var counter=0;
    var top; //top of window screen
    var bottomScreen; //bottom of the window screen
    var slideBottomPositions=[]; //Bottom sections/positions are the position of the div's bottom relative to the document position
    var slideTopPositions=[]; //Top sections/positions are the position of the div's top relative to the document position
    var slideDirection=[];//Has slideRight or slideDown, slideRight=true, slideDown=false
    var AIposition;
    var AIspeech=['Hello.',' I am an AI drawn by LematWorks but programmed by Ginu to run his website.',"When I direct you to his website, click me to view the navigation.",'I will now direct you to his website.'];
    var speechCounter=1;
    var timer;
    var beginningHeight=100;
    var AI_PicHeight=$('#AI-pic').outerHeight();//top position is 0
    var scaler=1;//Used to scale the AI picture
    var contentEnabled=false;//If the content-wrapper is displayed


    top=$(window).scrollTop();
    bottomScreen=top+windowHeight*0.9;



    //Menu Navigation closing
    $('.close').click(function(){
        $('#myModal').fadeOut();
        $('#AI-pic').fadeIn();
    });
    //Enable Menu if they click on the AI after the website is displaed
    $('#AI-pic').click(function(){
        if (contentEnabled==true)
        {
            $('#myModal').fadeIn();
            $('#AI-pic').fadeOut();
        }
    });
    //If the menu is currently visible to the user, allow them to exit it by clicking anywhere on the document besides the menu
    $(window).click(function(){
        $('#myModal').click(function(){
        $('#myModal').fadeOut();
        $('#AI-pic').fadeIn();
        });
    });


    //DISA website needs to be same height as DISA team photo
    $('#DISA-website').css('height',$('#DISA-team-photo').height());

    //If the user resizes the window
    $(window).resize(function()
    {
        //Change the dimensions
        windowWidth=$(window).width();
        windowHeight=$(window).height();
        bottomScreen=top+windowHeight*0.9;

        //Make the AI be in the center and the speech directly below it
        AIposition=(windowWidth/2)-($('#AI-pic').width()/2)+'px';
        AI_PicHeight=$('#AI-pic').outerHeight();
        //$('#AI-speech').css('top',AI_PicHeight+0.1*windowHeight+"px"); ------------!!!!!!!!!!MIGHT NEED TO PUT BACK
        $('#AI-pic').css('left',AIposition);
        //If the website content has been shown
        if (contentEnabled==true)
        {
            //Rescale according to windowWidth
            if (windowWidth<=768)
            {
                $('#beginning').css('transform','scaleY(0.2)');
                $('#AI-pic').css('transform','scaleX(0.2)');
                $('#beginning').css('height','200');
            }
            else
            {
                 $('#beginning').css('transform','scaleY(0.1)');
                 $('#AI-pic').css('transform','scaleX(0.1)');
                 $('#beginning').css('height','400');
            }

        }
        //Get the DOM object's positions that will be used to animate
        for (counter=0; counter<sections.length;counter++)
        {
            slideBottomPositions[counter]=$(sections[counter]).position().top;//Top position of the div
            slideBottomPositions[counter]+=$(sections[counter]).outerHeight();//Top position of the div plus its height will give its bottom position
            if (windowWidth<=768)
            {
                slideBottomPositions[counter]+=40;
            }
            else
            {
                slideBottomPositions[counter]+=40;
            }
            
            slideTopPositions[counter]=$(sections[counter]).position().top;//Top position of the div
            //Check to see which animation the div has, if it has slideRight make it true, if it has slideDown make it false
            if ($(sections[counter]).hasClass('slideRight'))
            {
                slideDirection[counter]=true;
            }
            else
            {
                slideDirection[counter]=false;
            }
        }
        //Animate the corresponding DOM divs incase the user resizes
        for (counter=0; counter<sections.length;counter++)    
        {
            //Animate based on the window being past the top position of the div
            if ($(sections[counter]).hasClass('top'))
            {
                if (bottomScreen>=slideTopPositions[counter])
                {
                    $(sections[counter]).removeClass('slideRight');
                    $(sections[counter]).removeClass('slideDown');
                }
            }
            //Animate based on the window being past the bottom position of the div
            else
            {
                if (bottomScreen>=slideBottomPositions[counter])
                {
                    $(sections[counter]).removeClass('slideRight');
                    $(sections[counter]).removeClass('slideDown');
                }
            }
        }

        //DISA website needs to be same height as DISA team photo
        $('#DISA-website').css('height',$('#DISA-team-photo').height());

    });


    /*---------NO RESIZING OF THE BROWSER WINDOW and PAGE LOADS----------*/


    //Get the top and bottom positions of each div relative to the document that will be animated
    for (counter=0; counter<sections.length;counter++)
    {
        slideBottomPositions[counter]=$(sections[counter]).position().top;//Top position of the div
        slideBottomPositions[counter]+=$(sections[counter]).outerHeight();//Top position of the div plus its height will give its bottom position
        slideBottomPositions[counter]+=40;
        slideTopPositions[counter]=$(sections[counter]).position().top;//Top position of the div

        //Check to see which animation the div has, if it has slideRight make it true, if it has slideDown make it false
        if ($(sections[counter]).hasClass('slideRight'))
        {
            slideDirection[counter]=true;
        }
        else
        {
            slideDirection[counter]=false;
        }
    }

    //Animate the divs that will appear once the website is shown IF THE USER DECIDES NOT TO SKIP THE INTRODUCTION
    setTimeout(function()
    {
        for (counter=0; counter<sections.length;counter++)    
        {
        //Animate based on the window being past the top position of the div
        if ($(sections[counter]).hasClass('top'))
        {
            if (bottomScreen>=slideTopPositions[counter])
            {
                $(sections[counter]).removeClass('slideRight');
                $(sections[counter]).removeClass('slideDown');
            }
        }
        //Animate based on the window being past the bottom position of the div
        else
        {
            if (bottomScreen>=slideBottomPositions[counter])
            {
                $(sections[counter]).removeClass('slideRight');
                $(sections[counter]).removeClass('slideDown');
            }
        }
    }

    },13000);
    

    //Once the INTRO part of the website is shown, animate the corresponding AI picture and it's speech
    AIposition=(windowWidth/2)-($('#AI-pic').width()/2)+'px';
    $('#AI-pic').css('left',AIposition);
    $('#AI-pic').fadeIn(1000);
    $('#AI-speech').fadeIn(1500);
    //$('#AI-speech').css('top',AI_PicHeight+0.1*windowHeight+"px"); ---MIGHT NEED TO PUT BACK

    //IF THE USER DECIDES NOT TO SKIP THE INTRODUCTION
    timer = setInterval(outputAISpeech,3000);
    function outputAISpeech()
    {
        //Change the text that the AI is outputting
        $('#AI-speech').text(AIspeech[speechCounter]+" ("+(speechCounter+1)+"/4)");
        speechCounter++;
        if (speechCounter==4)
        {
            clearInterval(timer);
            setTimeout(function()
            {
                //RESIZE THE AI Depending on the window dimensions
                $('#AI-speech').text("You will now be entering his website");
                if (windowWidth<=768)
                {
                    $('#beginning').css('transform','scaleY(0.2)');
                    $('#AI-pic').css('transform','scaleX(0.2)');
                    $('#beginning').css('height','200');

                }
                else
                {
                     $('#beginning').css('transform','scaleY(0.1)');
                     $('#AI-pic').css('transform','scaleX(0.1)');
                    $('#beginning').css('height','400');

                }
                contentEnabled=true;
                $('#content-wrapper').css('height','auto');
                $('#content-wrapper').css('overflow-y','none');
                $('#beginning').css('transform-origin','0 0');
                $('#skip-intro').css('display','none');
                $('#AI-speech').css('display','none');
            },3000);
            
        }
    }





    $('#skip-intro').click(function()//If the user skips the introduction
    {
        //Disable the timer and show the website
        clearInterval(timer);
        $('#AI-speech').text(AIspeech[speechCounter]);
         if (windowWidth<=768)
        {
            $('#beginning').css('transform','scaleY(0.2)');
            $('#AI-pic').css('transform','scaleX(0.2)');
            $('#beginning').css('height','200');
        }
        else
        {
             $('#beginning').css('transform','scaleY(0.1)');
             $('#AI-pic').css('transform','scaleX(0.1)');
             $('#beginning').css('height','400');
        }
        contentEnabled=true;
        

        $('#content-wrapper').css('height','auto');
        $('#content-wrapper').css('overflow-y','none');
        $('#beginning').css('transform-origin','0 0');
        $('#skip-intro').css('display','none');
        $('#AI-speech').css('display','none');
        //Animate any divs that appear when the website is shown
        setTimeout(function()
        {
            for (counter=0; counter<sections.length;counter++)    
            {
            //Animate based on the window being past the top position of the div
                if ($(sections[counter]).hasClass('top'))
                {
                    if (bottomScreen>=slideTopPositions[counter])
                    {
                        $(sections[counter]).removeClass('slideRight');
                        $(sections[counter]).removeClass('slideDown');
                    }
                }
                //Animate based on the window being past the bottom position of the div
                else
                {
                    if (bottomScreen>=slideBottomPositions[counter])
                    {
                        $(sections[counter]).removeClass('slideRight');
                        $(sections[counter]).removeClass('slideDown');
                    }
                }
            }

        },300);
    });











    /*---------WEBSITE HAS BEEN ENABLED---------------*/

    //If the user scrolls
    $(window).scroll(function() 
    {
        top=$(window).scrollTop();
        bottomScreen=top+windowHeight*0.9;
        

        for (counter=0; counter<sections.length;counter++)    
        {
            //Animate based on the window being past the top position of the div
            if ($(sections[counter]).hasClass('top'))
            {
                if (bottomScreen>=slideTopPositions[counter])
                {
                    $(sections[counter]).removeClass('slideRight');
                    $(sections[counter]).removeClass('slideDown');
                }
            }
            //Animate based on the window being past the bottom position of the div
            else
            {
                if (bottomScreen>=slideBottomPositions[counter])
                {
                    $(sections[counter]).removeClass('slideRight');
                    $(sections[counter]).removeClass('slideDown');
                }
            }
            /*REMOVE THESE TWO IF STATEMENTS IF YOU DO NOT WANT THE DIVS TO DISAPPEAR AND REAPPEAR AFTER IT IS NO LONGER VISIBLE ON THE WINDOW*/
            /*
            if (bottomScreen<slideTopPositions[counter])
            {
                if (slideDirection[counter]==true)
                {
                    $(sections[counter]).addClass('slideRight');
                }
                else
                {
                    $(sections[counter]).addClass('slideDown');
   
                }
            } 
            else if (top>slideBottomPositions[counter])
            {
                if (slideDirection[counter]==true)
                {
                    $(sections[counter]).addClass('slideRight');
                }
                else{
                    $(sections[counter]).addClass('slideDown');
   
                }
            }
            */
            
        }
    });
    //When using the menu, subtract 100px from where the <a> tag takes you to accomodate for the AI-black row
    window.addEventListener("hashchange", function ()
    {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    });

    //FORM SUBMISSION
    $('#submit-button').click('submit',function(e){
         e.preventDefault();    // This prevents form from being sumbitted
         //Get the values of the form inputs
         var name=$('#nameInput').val();
         var email=$('#emailInput').val();
         var company=$('#companyInput').val();
         var comments=$('#commentsInput').val();
         var submit=$('#submit-button').val();
         var dataString='name='+ name + '&email=' + email + '&company=' + company + '&comments='+comments+'&message-submit='+submit;

         //SEND form data to the PHP file to process
         $.ajax({
                type: "POST",
                url: "/practice/php/form.php",
                data: dataString,
                success: function (serverResponse) 
                {
                    //GET the PHP file response
                    var response=serverResponse;
                    var inputCheck=true;
                    //If there are any errors in the input file, the PHP file will echo it back

                    //Search for any error messages
                    if (response.search('Enter your name')!=-1)
                    {
                        $('#nameErr').text('*Enter your name');
                        inputCheck=false;
                    }
                    else if (response.search('Letters only')!=-1)
                    {
                        $('#nameErr').text('*Letters only');
                        inputCheck=false;
                    }
                    else
                    {
                        $('#nameErr').text('');
                    }
                    if (response.search('Not a valid email')!=-1)
                    {
                        $('#emailErr').text('*Not a valid email');
                        inputCheck=false;
                    }
                    else
                    {
                        $('#emailErr').text('');
                    }
                    if (response.search('Cannot be empty')!=-1)
                    {
                        $('#commentsErr').text('*Cannot be empty');
                        inputCheck=false;
                    }
                    else
                    {
                        $('#commentsErr').text('');
                    }
                    //If all the inputs are correct and filled in then display it has been sent and empty the fields
                    if (inputCheck==true)
                    {
                        $('#submitted').text('Your message has been sent!');
                        setTimeout(function(){
                            $('#submitted').text("");
                        },4000);
                        $('#nameInput').val("");
                        $('#companyInput').val("");
                        $('#commentsInput').val("");
                        $('#emailInput').val("");
                        document.getElementById("characters_remaining").innerHTML=1000;
                    }
                }
            }); // AJAX Get Jquery statment

    });
});
//Form character count for comments
function character_count()
{
    var displayCount=document.getElementById("characters_remaining");
    var characterCount=document.getElementById("commentsInput").value;
    var charactersLeft=1000-characterCount.length;
    displayCount.innerHTML=charactersLeft;
}