$(document).ready(function(){
    /*
    var map = L.map('map').setView([51.505, -0.09], 13);

   var osm =  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    osm.addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    */
    //CREATE IF STATEMENT TO FIRST CHECK IF A MAP IS PRESENT OR NOT
    //if ()





    let map = L.map('map',{
        layers: MQ.mapLayer(),
        center: [-25.47766385997004, 30.966750583112805],
        zoom: 12
    });

    L.control.layers({
        'StreetView': MQ.mapLayer(),
        'Satellite': MQ.satelliteLayer(),
    }).addTo(map);




    function runDirections(start_destination,end_destination){
        var routes = MQ.routing.directions();
        var routeTime = MQ.routing.directions();
        var origin = start_destination;
        var final_destination = end_destination;
        var service = new google.maps.DistanceMatrixService();
        routes.route({
            locations: [
                start_destination,
                end_destination
            ],



        });

        //Calculate Distance Google Maps

        service.getDistanceMatrix({
          origins: [origin],
          destinations: [final_destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, callback);


        //Custom Route
        //Make sure to clear the route before running the function below.
        customRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var customIcon;
                var marker;
                customIcon = L.icon({
                    iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=mcenter.png',
                    iconSize: [20,29],
                    iconAnchor: [10,29],
                    popupAnchor: [0,-29]
                });
                marker = L.marker(location.latLng,{icon: customIcon}).addTo(map);
                return marker;
            },
            createEndMarker : (location) => {
                var customIcon;
                var marker;
                customIcon = L.icon({
                    iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=mcenter.png',
                    iconSize: [20,29],
                    iconAnchor: [10,29],
                    popupAnchor: [0,-29]
                });
                marker = L.marker(location.latLng,{icon: customIcon}).addTo(map);
                return marker;
            }
        });

        map.addLayer(new customRouteLayer({
            directions: routes,
            fitBounds: true
        }));
    }

    var current_addr = '';
    //Routing Form

    $('#auto_locate').click(function(){

        //visibility_off
        //$('#start').css({"visibility":"hidden"});
        document.getElementById('start').disabled = true;
        $('#start').css({"visibility":"hidden"});
        //Bring the span into view

      const successCallback = (position) =>{
        console.log(position);
        current_latitude = position.coords.latitude;
        current_longitude = position.coords.longitude;
        console.log('Latitude',position.coords.latitude)
        console.log('Longitude',position.coords.longitude)


        const latlng = {
          lat: parseFloat(current_latitude),
          lng: parseFloat(current_longitude)
        }
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location:latlng })
        .then((response) =>{
          //console.log(response.results[0].formatted_address);
          current_addr = response.results[0].formatted_address;
          //$('#start').text(current_addr);

          $('#auto_addr').text(current_addr);
          console.log('My Address is start d2024:', current_addr);
          console.log('Hello 2024:', current_addr);
        })

      };
      const errorCallback = (error) =>{
        console.log(error);
      };

      const options = {
        enableHighAccuracy: true,
      }
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);




    });


    $('#manual_locate').click(function(){
          //Switch to disabled true
          document.getElementById('start').disabled = false;
          $('#start').css({"visibility":"visible"});
          //Clear auto locate text
          $('#auto_addr').empty();


    });


    //This fucntion needs to activate when the form is sent

    function getTravelReport(){

        var destination_start = document.getElementById('start').value;
        var destination_end = document.getElementById('end_destination').value;
        var trip_cost = $('#travel_cost').text();
        console.log(destination_end);
        console.log(trip_cost,destination_start,destination_end, 'The Cost of the Trip is...');

    }
     var end_trip_btn = document.getElementById("end_trip");
     end_trip_btn.addEventListener("click", getTravelReport);





    function findRoute(event, start_d){
        event.preventDefault();
        //map.remove();
        console.log('Form Submitted');


        //get input destination
        var taxi_rate = $('#taxi_rate').text();
        //console.log('Another Rate', taxi_rate);


        //console.log('Input Addr', start_d);
        // First Check if start destination input field has any text

          //Get Current location from auto locate function

        if (document.getElementById('start').disabled === true){
          console.log('True');
          var start_destination = $('#auto_addr').text();
          console.log('Input Addr', start_destination);
          end_destination = document.getElementById('end_destination').value;
          runDirections(start_destination,end_destination);

          $.ajax({
            type: "GET",
            url: "/data/",
            data: {
            "start_destination": $("#start_d").val(),
            },
            success: function(response){
                //console.log('Success!!!!', response);
            },
            dataType: "json",
            contentType : "application/json"
            });

          document.getElementById("form").reset();

        }
        else if(document.getElementById('start').disabled === false){
          console.log('false', 'hahah');
          console.log($("#travel_cost").text());
          start_destination = document.getElementById('start').value;
          end_destination = document.getElementById('end_destination').value;
          console.log('start_destination',start_destination);
          runDirections(start_destination,end_destination);

          //Query Selector Form

           $.ajax({
                type: "GET",
                url: "/data/",
                data: {
                "start_destination": $("#start").val(),
                "end_destination": $("#end_destination").val(),
                "travel_cost": $("#travel_cost").text(),
                },
                success: function(response){
                    //console.log('Success!!!!2024', response);
                    //console.log('Travel Cost 2024', travel_cost)
                },
                dataType: "json",
                contentType : "application/json"
                });


          document.getElementById("form").reset();
        }


        // From this function send the data to the server ajax
       /*
        if ($('#start').attr('disabled','disabled')){
          console.log('disabled');
          console.log('Auto Location Active');
          var start_destination = $('#auto_addr').text();
          //console.log('Input Addr', start_destination);
          end_destination = document.getElementById('end_destination').value;
          //console.log('start_destination',start_destination);
          runDirections(start_destination,end_destination);
          $('#start').removeAttr('disabled');
          document.getElementById("form").reset();
        }
        if(!($('#start').attr('disabled','disabled'))){
          console.log('enabled');
          start_destination = document.getElementById('start').value;
          end_destination = document.getElementById('end_destination').value;
          console.log('start_destination',start_destination);
          runDirections(start_destination,end_destination);
          document.getElementById("form").reset();

        }*/
        //var current_addr = $('#auto_addr').text();
        //console.log('Input Addr33', current_addr);
        /*
        start_destination = document.getElementById('start').value;
        end_destination = document.getElementById('end_destination').value;
        console.log('start_destination',start_destination);
        runDirections(start_destination,end_destination);
        document.getElementById("form").reset();
        */
        //If start destination field is empty, check if auto locate was applied

        /*
        if($('#auto_addr').length > 0) {
          console.log('Auto Location Begins');
          var current_addr = $('#auto_addr').text();
          console.log('Input Addr33', current_addr);
          var start_destination = $('#auto_addr').text();
          console.log('Input Addr', start_destination);
          end_destination = document.getElementById('end_destination').value;
          console.log('start_destination',start_destination);
          runDirections(start_destination,end_destination);
          document.getElementById("form").reset();
        }*/



    }
    //Distance Response

    function callback(response, status){
      if(status != google.maps.DistanceMatrixStatus.OK){
        console.log(status);
      }
      else{
        var origin = response.originAddresses[0];
        //console.log('Origin', origin);
        var destination = response.destinationAddresses[0];
        var distance = response.rows[0].elements[0].distance;
        var duration = response.rows[0].elements[0].duration;
        //console.log('destination', destination);
        //console.log('distance', distance);
        //console.log('duration', duration);
        var distance_km = distance.value / 1000;
        var duration_text = duration.text;

        $('#time').text(duration_text);
        var taxi_rate = $('#taxi_rate').text();

        var taxi_rate_int = parseInt(taxi_rate);
        var travel_cost = (distance_km * taxi_rate_int);
        //console.log(travel_cost, distance_km, origin, destination);

        $('#travel_cost').text(travel_cost.toFixed(2));
        //console.log('taxi_rate', taxi_rate);

        //console.log('distance_km', distance_km);
      }


    }
    const routing_btn = document.getElementById('form');

    routing_btn.addEventListener('submit',findRoute);






    /*
    function googleMapsDistance(event){
      event.preventDefault();
      start_destination = document.getElementById('start_destination').value;
      end_destination = document.getElementById('end_destination').value;

      console.log('Origin', start_destination);
      console.log('Destination', end_destination);
    }*/


    /*
    $('#auto_locate').click(function(){

        //visibility_off
        $('#start').css({"visibility":"hidden"});

        //Bring the span into view

      const successCallback = (position) =>{
        console.log(position);
        current_latitude = position.coords.latitude;
        current_longitude = position.coords.longitude;
        console.log('Latitude',position.coords.latitude)
        console.log('Longitude',position.coords.longitude)


        const latlng = {
          lat: parseFloat(current_latitude),
          lng: parseFloat(current_longitude)
        }
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location:latlng })
        .then((response) =>{
          //console.log(response.results[0].formatted_address);
          var current_addr = response.results[0].formatted_address;
          //$('#start').text(current_addr);

          start_d = $('#auto_addr').text(current_addr);
          console.log('My Address is start d:', start_d[0].innerHTML);
        })

      };
      const errorCallback = (error) =>{
        console.log(error);
      };

      const options = {
        enableHighAccuracy: true,
      }
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);




    });*/
    //Get Current Location

});
