$(document).ready(function()
{
	var windowWidth=$(window).width();
   var windowHeight=$(window).height();
   var powerButtonLeft=$('#tablet-screen').offset().left-$('#tablet').offset().left;
   var powerButtonRadius=$('#tablet').height()*0.04;
   var buttonClicked=0;

   //Dynamically setting the power button position
   powerButtonLeft=(-1*(powerButtonLeft/2))-powerButtonRadius;
 	$('#power-button').css({'width':powerButtonRadius*2,'height':powerButtonRadius*2, 'top':"45%",'left':powerButtonLeft,'visibility':'visible'});

 	//Setting half of the tablet's background color to a turquoise colour
 	tabletHeight=$('#tablet').height();
 	$('#background').css({'height':tabletHeight/2,'top':-tabletHeight*1.03});




 	//If the code has been displayed on the tablet and they run the code it should display a GIF
  var random=Math.random() * 1;
 	$('#run-button').click(function()
 	{
 		buttonClicked=1;
 		$('#gif').css({'display':'block','height':$('#tablet-screen').height(),'width':$('#tablet-screen').width()});
 		$('#screen-text').css('display','none');
 		$('#run-button').css('display','none');
    if (random>=0.5)//Cute gif
    {
      $("#gif").attr("src","img/disa/funny.jpg");
    }
    else //Scary gif
    {
      $("#gif").attr("src","img/disa/scary.gif");
    }
    setTimeout(
    function() 
    {
      $("#gif").css('display','none');
      $('#screen-text').css('display','block');
      $('#screen-text').text('Want to learn how to do that and much more?!@?#?@! Click the "WORKSHOP" button above to see what'+
      'workshops we have to offer!');
    }, 5000);
 	});

 	//If they close either workshop or event modal
 	$('.close').click(function(){
        $('#myModal').fadeOut();
        $('#myModal2').fadeOut();

    });
 	///Display corresponding modals
    $('#workshop-button').click(function()
    {
         $('#myModal').fadeIn();
    });
     $('#events-button').click(function()
     {
         $('#myModal2').fadeIn();
    
    });
     $(document).keydown(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('#myModal').fadeOut();
        $('#myModal2').fadeOut();
      }
    });
    //If the menu is currently visible to the user, allow them to exit it by clicking anywhere on the document besides the menu
    /*
    $(window).click(function(){
        $('#myModal').click(function(){
        $('#myModal').fadeOut();
        });
         $('#myModal2').click(function(){
        $('#myModal2').fadeOut();
        });
    });
    */
    //If the user resizes their window
	$(window).resize(function()
   {	
    
    	windowWidth=$(window).width();
      windowHeight=$(window).height();
      powerButtonLeft=$('#tablet-screen').offset().left-$('#tablet').offset().left;
      powerButtonRadius=$('#tablet').height()*0.04;
      powerButtonLeft=(-1*(powerButtonLeft/2))-powerButtonRadius;
      //Reposition power-button
 		$('#power-button').css({'width':powerButtonRadius*2,'height':powerButtonRadius*2, 'top':"45%",'left':powerButtonLeft,'visibility':'visible'});

 		//Gif for tablet
 		if (buttonClicked==1)
 		{
 			$('#gif').css({'display':'block','height':$('#tablet-screen').height(),'width':$('#tablet-screen').width()});
	 		$('#screen-text').css('display','none');
	 		$('#run-button').css('display','none');
 		}
 		//Reposition background colour
 		tabletHeight=$('#tablet').height();
 		$('#background').css({'height':tabletHeight/2,'top':-tabletHeight*1.03});
 	


   });
   



});
//Tablet typewriter effect effect
var counter=0;
function typeWriter()
{

	var speed=5;
 	var tabletText=("$(document).ready(function(){$('#run-button').click(function(){buttonClicked=1;"+
 		"$('#gif').css({'display':'block','height':$('#tablet-screen').height(),width:$('#tablet-screen').width()});"+
 		"$('#screen-text').css('display','none');$('#run-button').css('display','none');});});");
 	
 	if($('#screen-text').text().match("^Turn"))
 	{
 		$('#screen-text').html("");//Remove text
 		$('#power-button').attr('onclick','').unbind('click');//Disable power button
 	}

 	if (counter<tabletText.length)
 	{
 		//Spacing and indentation
 		if (counter==28|| counter==29||counter==62 || counter==63 || counter==79 || counter==112||counter==150 || counter==186 || counter==226 || counter==265 || counter ==268)
 		{
 			$('#screen-text').append('<br/>');
 			
 			if (counter==29||counter==62||counter==265)
 			{
 				$('#screen-text').append('&nbsp;&nbsp;');
 			}
 			else if (counter==63|| counter==79||counter==112||counter==150||counter==186||counter==226)
 			{
 				$('#screen-text').append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
 			}
 			
 		}
 		//Color matching to mimic Sublime
 		currentChar=tabletText.charAt(counter);
 		//Pinkish colour
 		if (currentChar=='$'||currentChar=='=')
 		{
 			 $('#screen-text').append('<span style="color:#F92672">'+currentChar+'</span>');
 		}
 		//Purple color
 		else if (currentChar=='1')
 		{
 			$('#screen-text').append('<span style="color:#AE81FF">'+currentChar+'</span>');
 		}
 		//Blueish colour
 		else if (counter>=2 && counter<10 || counter>=12 && counter<17 || counter>17 && counter<=25 || counter>45 && counter<=50 || counter>51 && counter<60 || counter>=89 && counter<92
 			||counter>140 && counter<=146 || counter>174 && counter<181 || counter>203 && counter<207 || counter>242 && counter<246)
 		{
 			$('#screen-text').append('<span style="color:#66D9EF">'+currentChar+'</span>');
 		}
 		//Whiteish colour
 		else if (currentChar=='('||currentChar==')'||currentChar=='.'||currentChar==';' ||currentChar=='{' || currentChar=='}' || currentChar==':' || currentChar==',' || counter>61 && counter<76)
 		{
 			$('#screen-text').append('<span style="color:#F8F8F2">'+currentChar+'</span>');
 		}
 		//Yellowish colour
 		else
 		{
 			$('#screen-text').append('<span style="color:#FFE792">'+currentChar+'</span>');
 		}
 		
 		counter++;
 		setTimeout(typeWriter, speed);

 	}
 	else
 	{
 		$('#run-button').css('display','block');
 	}
}

