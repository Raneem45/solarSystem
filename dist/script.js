$(window).load(function(){
  
  var planet = document.getElementById("planet");
  var speed = document.getElementById("speed");
  var diameter = document.getElementById("diameter");
  var moons = document.getElementById("moons");
  var gravity = document.getElementById("gravity");
  var definition = document.getElementById("definition");
  var planetsdata;

  fetch('api.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(planetsData){
    planetsdata = planetsData[0];
    console.log(planetsdata)
  })
  .catch(function(error) {
    console.log('Error fetching bird data:', error);
  });


  var body = $("body"),
      universe = $("#universe"),
      solarsys = $("#solar-system");

  var init = function() {
    body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
      $(this).removeClass('hide-UI').addClass("set-speed");
      $(this).dequeue();
    });
  };

  var setView = function(view) { universe.removeClass().addClass(view); };

  $("#toggle-data").click(function(e) {
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function(e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  $("#data a").click(function(e) {
    var ref = $(this).attr("class");
    solarsys.removeClass().addClass(ref);
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
    
    let currPlanet = $(this).context.classList[0];
    planet.innerHTML = planetsdata[currPlanet].name;
    speed.innerHTML = planetsdata[currPlanet].speed;
    diameter.innerHTML = planetsdata[currPlanet].diameter;
    moons.innerHTML = planetsdata[currPlanet].moons;
    gravity.innerHTML = planetsdata[currPlanet].gravity;
    definition.innerHTML = planetsdata[currPlanet].definition;
    e.preventDefault();
  });

  $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
  $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
  $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
  $(".set-size").click(function() { setView("scale-s set-size"); });
  $(".set-distance").click(function() { setView("scale-d set-distance"); });

  init();

});