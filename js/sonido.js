$(document).on("ready", function(){
    //Fuciones 

  function segundosMinutos(duracion){//00:00
    var segundos = duracion,
        minutos = Math.floor(segundos / 60), //1
        seg = Math.round(segundos % 60); //

        if (minutos < 10) {
          minutos = "0" + minutos;
        }

        if (seg < 10) {
          seg = "0" + seg;
        }

        if (seg == 60) {
          minutos = parseInt(minutos) + 1;
          minutos = "0" + minutos;
          seg = "00";
        }

        duracionTotal = minutos + ":" + seg;
        return duracionTotal;
  }



  function moveSliderX(e){
 var pos = $("#Reproductor  .rep-body .reproductor .reproduction").offset(),
 posX = e.pageX - pos.left;
   

 if (posX >= 0 && posX <= $("#Reproductor  .rep-body .reproductor .reproduction").outerWidth()) {
      //Calcular el tiempo del video
       		var duracion = $("audio").get(0).duration;
            var barraActual = posX;
            var longitudBarra = parseInt($("#Reproductor  .rep-body .reproductor .reproduction").css("width").split("px")[0]);
            var currentTime = (barraActual * duracion) / longitudBarra;

            $("audio").get(0).currentTime = currentTime;
    }

    $("#Reproductor  .rep-body .reproductor .reproduction .reproducted").css("width", posX + "px");
    $("#Reproductor  .rep-body .reproductor .reproduction .circle").css("left", posX + "px");



  }



function song(action){
	if (action == "play") {
		if($("audio").get(0).readyState == 4 ){

			$("audio").get(0).play();
		}
	

	} else if (action == "pause"){
	
		$("audio").get(0).pause();
	}

          
  }



  function changeTime(duracion, actual, width){

  	var width = (actual * width) /duracion ; 

  $("#Reproductor .rep-body .reproductor .reproduction .reproducted").css("width", width + "px");
  $("#Reproductor .rep-body .reproductor .reproduction .circle").css("left", width + "px");

         $("#Reproductor  .buttons-time .time .played").text(segundosMinutos(actual));
  }



  function changeSong(object){

  	var name = $(object).attr("data-name"),
        extension = $(object).attr("data-type"),
        id = $(object).attr("data-id");
  
    url = "canciones/" + name + "." + extension;
    


    $("audio").attr("src", url);
    $("audio").attr("data-name", name);

    $(".play").children(".status").remove();
    $(".song.play").removeClass("play active");
    $(object).addClass("play active");

      $(object).append("<i class='icon-play status' style='color:red;'></i");
      $(object).append("<i style='color: red' class='fa fa-circle-o-notch fa-spin fa-1x fa-fw status'></i>");

    $("audio").get(0).play();



  }


  function prexNextSong(type){

  	var repActual = $(".song.play"), song;


  	if(type == "prev"){
  		song = repActual.prev();
  	}else{

  		song = repActual.next();
  	}

  	if ($(song).attr("class")){
  		changeSong(song);
  	}
  }
    //->fuciones  


    //Eventos

    //Eventos de audio

    //Eventos de play
    $("audio").on("play", function() {
        $("#Reproductor .buttons .icon-play").hide();
        $("#Reproductor .buttons .icon-pause").show();
       	
    });




    //Pause

    $("audio").on("pause", function() {
        $("#Reproductor .buttons .icon-play").show();
        $("#Reproductor .buttons .icon-pause").hide();
            
    });



    //Eventos de loadeddata
    $("audio").on("loadeddata", function() {




        $("#Reproductor  .buttons .icon-play").show();
        $("#Reproductor  .buttons .icon-pause").hide();
         $("#Reproductor  .buttons-time .time .duration").text(segundosMinutos($("audio").get(0).duration));
         //evento para que se vuelva a poner en cero al terminar
        $("#Reproductor .rep-body .reproductor .reproduction .reproducted").css("width", "0");
 	    $("#Reproductor .rep-body .reproductor .reproduction .circle").css("left", "0");
    });

    $("audio").on("timeupdate", function() {
        $("#Reproductor .buttons .icon-play").hide();
        $("#Reproductor .buttons .icon-pause").show();

        var duracion = $("audio").get(0).duration,
        actual = $("audio").get(0).currentTime,
        width = $("#Reproductor .rep-body .reproductor .reproduction").width();
        changeTime(duracion, actual, width);
    });


    $("audio").on("ended", function() {
       prexNextSong("next")
    });



    //->eventos audio

    //Eventos DOM

  $("#Reproductor .rep-body .reproductor").on("mousedown", function(e){
    e.preventDefault();
    moveSliderX(e);
    $("html").on("mousemove", function(e){
      moveSliderX(e);
    }).on("mouseup", function(){
      $(this).off("mousemove");
    });
  });


	$(".icon-play").on("click",function(){
	song("play");
	changeTime();
	});

	$(".icon-pause").on("click",function(){
	song("pause");
	});
	 
	
	$(".icon-to-start-alt").on("click",function(){
		prexNextSong("prev")
		});
		 
	$(".icon-to-end-alt").on("click",function(){
		prexNextSong("next")
		});
		 


	$(".song").on("click",function(){
	changeSong(this);
	});
	 


	    
    //Eventos DOM FINAL

});