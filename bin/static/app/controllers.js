(function(angular) {
  var AppController = function($scope, leafletData, leafletEvents, Item, $timeout) {
    $scope.items = [];
    $scope.newData = {};

    Item.query(function(response) {
      $scope.items = response ? response : [];
    });

    $scope.markers = [];
    
    angular.extend($scope, {
      defaults:{
        tileLayer: "https://api.tiles.mapbox.com/v4/delightend.e1757707/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGVsaWdodGVuZCIsImEiOiJhZjJhNWYzYzFkODY5YWU5YzdlNzIyN2RhOTJkMzVmMCJ9._stKHDJbdgStHiO-XwFygQ",
        maxZoom: 18
      },  
      center: {
          lat: 37.87222,
          lng: -91.21528,
          zoom: 3
      },
      markers: [],
      events: {
        markers: {
          enable: leafletEvents.getAvailableMarkerEvents(),
        }
      }
    });

    $scope.init = function(){
      $scope.ageChoiceMin=0; 
      $scope.ageChoiceMax=150; 
      $scope.mapStuff($scope.ageChoiceMin, $scope.ageChoiceMax);
    };

    $scope.mapStuff = function(ageChoiceMin, ageChoiceMax){
      console.log(ageChoiceMin);
      console.log(ageChoiceMax);
      var redAgentIcon = {
        iconUrl: './img/red.png',
        shadowUrl: './img/shadow.png',
        iconSize:     [16, 18],
        shadowSize:   [16, 16],
        iconAnchor:   [1, 1],
        shadowAnchor: [-2, 2],
        popupAnchor:  [-1, -1]
      };
      var blueAgentIcon = {
        iconUrl: './img/blue.png',
        shadowUrl: './img/shadow.png',
        iconSize:     [16, 18],
        shadowSize:   [16, 16],
        iconAnchor:   [1, 1],
        shadowAnchor: [-2, 2],
        popupAnchor:  [-1, -1]
      };

      if($scope.originalData.length){
        var newMarkers = [];
        for (var i = 0; i < $scope.originalData.length; i++) {
          var lat = $scope.originalData[i].lat;
          var lon = $scope.originalData[i].lon;
          var name = $scope.originalData[i].name;
          var age = $scope.originalData[i].age;
          var gender = $scope.originalData[i].gender;
          var genderIcon = blueAgentIcon
          if (gender === 'Female'){
            genderIcon = redAgentIcon;
          }
          var popOverText = "<h3>" + name + "</h3><br><strong>Age: </strong>" + age + "<br><strong>Gender: </strong>" + gender + "<br>";
          
          if ((age > $scope.ageChoiceMin) && (age < $scope.ageChoiceMax)){
            newMarkers.push(
              {
                lat: lat,
                lng: lon,
                message: popOverText,
                icon: genderIcon
              }
            );
          }
          $scope.addItem($scope.originalData[i]);
        }
        $timeout(function () {
          $scope.markers = newMarkers;
        });
      }
    };
	
	$scope.mapSearch = function(agentName){
      console.log(agentName);
      var redAgentIcon = {
        iconUrl: './img/red.png',
        shadowUrl: './img/shadow.png',
        iconSize:     [16, 18],
        shadowSize:   [16, 16],
        iconAnchor:   [1, 1],
        shadowAnchor: [-2, 2],
        popupAnchor:  [-1, -1]
      };
      var blueAgentIcon = {
        iconUrl: './img/blue.png',
        shadowUrl: './img/shadow.png',
        iconSize:     [16, 18],
        shadowSize:   [16, 16],
        iconAnchor:   [1, 1],
        shadowAnchor: [-2, 2],
        popupAnchor:  [-1, -1]
      };

      if($scope.originalData.length){
        var newMarkers = [];
        for (var i = 0; i < $scope.originalData.length; i++) {
          var lat = $scope.originalData[i].lat;
          var lon = $scope.originalData[i].lon;
          var name = $scope.originalData[i].name;
          var age = $scope.originalData[i].age;
          var gender = $scope.originalData[i].gender;
          var genderIcon = blueAgentIcon
          if (gender === 'Female'){
            genderIcon = redAgentIcon;
          }
          var popOverText = "<h3>" + name + "</h3><br><strong>Age: </strong>" + age + "<br><strong>Gender: </strong>" + gender + "<br>";
          
          if (name.search(agentName) > -1){
            newMarkers.push(
              {
                lat: lat,
                lng: lon,
                message: popOverText,
                icon: genderIcon
              }
            );
          }
          $scope.addItem($scope.originalData[i]);
        }
        $timeout(function () {
          $scope.markers = newMarkers;
        });
      }
    };

    $scope.addItem = function(newData) {
      var descriptionObject = {
        lat: newData.lat,
        lon: newData.lon,
        name: newData.name,
        age: newData.age,
        gender: newData.gender
      };
      // console.log('original object is: ', descriptionObject);
      var description = JSON.stringify(descriptionObject);

      // console.log('the description is: ', description);

      new Item({
        description: description
      }).$save(function(item) {
        $scope.items.push(item);
      });
      $scope.newItem = "";
    };
    
    $scope.updateItem = function(item) {
      item.$update();
    };
    
    $scope.deleteItem = function(item) {
      item.$remove(function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
      });
    };
    $scope.originalData = [
    {
       "name":"Jilted Seahorse"
      ,"lat":34.014908
      ,"lon":-118.158966
      ,"age":48
      ,"gender":"Male"
    },
    {
       "name":"Freudian Slipper"
      ,"lat":30.268417
      ,"lon":-81.38858
      ,"age":35
      ,"gender":"Male"
    },
    {
       "name":"Donâ€™t Ask"
      ,"lat":40.7646
      ,"lon":-73.95539
      ,"age":13
      ,"gender":"Male"
    },
    {
       "name":"Botox Detox"
      ,"lat":34.540356
      ,"lon":-117.26834
      ,"age":41
      ,"gender":"Male"
    },
    {
       "name":"Multitudinous Orphanage"
      ,"lat":46.028446
      ,"lon":-99.37192
      ,"age":96
      ,"gender":"Female"
    },
    {
       "name":"Line Dance"
      ,"lat":40.61817
      ,"lon":-73.969604
      ,"age":48
      ,"gender":"Female"
    },
    {
       "name":"Squash and Wash"
      ,"lat":35.165604
      ,"lon":-101.92397
      ,"age":51
      ,"gender":"Female"
    },
    {
       "name":"Kookie Magnet"
      ,"lat":29.863604
      ,"lon":-95.404976
      ,"age":98
      ,"gender":"Female"
    },
    {
       "name":"Been There Done That"
      ,"lat":32.28312
      ,"lon":-90.1138
      ,"age":42
      ,"gender":"Male"
    },
    {
       "name":"Urgent Matrimony"
      ,"lat":18.474445
      ,"lon":-66.71611
      ,"age":7
      ,"gender":"Male"
    },
    {
       "name":"Above the Belt"
      ,"lat":36.346046
      ,"lon":-119.38029
      ,"age":57
      ,"gender":"Female"
    },
    {
       "name":"Smashed Arachnid"
      ,"lat":35.643463
      ,"lon":-97.42419
      ,"age":41
      ,"gender":"Male"
    },
    {
       "name":"Rue Morgue"
      ,"lat":40.567783
      ,"lon":-89.62919
      ,"age":48
      ,"gender":"Female"
    },
    {
       "name":"Jah Libation"
      ,"lat":29.467064
      ,"lon":-81.27701
      ,"age":61
      ,"gender":"Male"
    },
    {
       "name":"Turgid Buntcake"
      ,"lat":36.00548
      ,"lon":-78.92016
      ,"age":4
      ,"gender":"Male"
    },
    {
       "name":"Farmerâ€™s Daughter"
      ,"lat":42.394756
      ,"lon":-83.40284
      ,"age":1
      ,"gender":"Female"
    },
    {
       "name":"Abundant Wrath"
      ,"lat":45.52722
      ,"lon":-122.61078
      ,"age":6
      ,"gender":"Male"
    },
    {
       "name":"Sorry About That"
      ,"lat":30.387257
      ,"lon":-97.7677
      ,"age":43
      ,"gender":"Male"
    },
    {
       "name":"Lullabye Sneeze"
      ,"lat":44.973495
      ,"lon":-93.47003
      ,"age":43
      ,"gender":"Female"
    },
    {
       "name":"Puppet Tears"
      ,"lat":36.074303
      ,"lon":-115.1179
      ,"age":6
      ,"gender":"Female"
    },
    {
       "name":"Rancid Rain"
      ,"lat":35.372395
      ,"lon":-119.03318
      ,"age":58
      ,"gender":"Female"
    },
    {
       "name":"Dormant Tornado"
      ,"lat":36.93204
      ,"lon":-82.64343
      ,"age":52
      ,"gender":"Female"
    },
    {
       "name":"Appealing Curve"
      ,"lat":40.82461
      ,"lon":-74.36255
      ,"age":82
      ,"gender":"Male"
    },
    {
       "name":"Burning Sand"
      ,"lat":33.654617
      ,"lon":-112.35475
      ,"age":31
      ,"gender":"Male"
    },
    {
       "name":"Satisfied Pimp"
      ,"lat":42.620354
      ,"lon":-83.94117
      ,"age":81
      ,"gender":"Male"
    },
    {
       "name":"Floating Jetsam"
      ,"lat":35.869446
      ,"lon":-86.38925
      ,"age":43
      ,"gender":"Male"
    },
    {
       "name":"Stuffed Stocking"
      ,"lat":34.186684
      ,"lon":-118.38929
      ,"age":90
      ,"gender":"Female"
    },
    {
       "name":"This!"
      ,"lat":33.1642
      ,"lon":-117.34798
      ,"age":46
      ,"gender":"Male"
    },
    {
       "name":"Bull and Cock"
      ,"lat":45.01065
      ,"lon":-93.45098
      ,"age":16
      ,"gender":"Female"
    },
    {
       "name":"Roasted Riot"
      ,"lat":33.582096
      ,"lon":-111.89968
      ,"age":39
      ,"gender":"Female"
    },
    {
       "name":"Sisyphus Waltz"
      ,"lat":39.953876
      ,"lon":-75.28392
      ,"age":54
      ,"gender":"Female"
    },
    {
       "name":"Final Authority"
      ,"lat":41.45477
      ,"lon":-81.79174
      ,"age":62
      ,"gender":"Male"
    },
    {
       "name":"Shining Dignity"
      ,"lat":39.22341
      ,"lon":-83.61142
      ,"age":20
      ,"gender":"Female"
    },
    {
       "name":"Cattle Ploy"
      ,"lat":37.283463
      ,"lon":-79.929825
      ,"age":21
      ,"gender":"Male"
    },
    {
       "name":"Guilty Membrane"
      ,"lat":33.50511
      ,"lon":-86.810394
      ,"age":32
      ,"gender":"Female"
    },
    {
       "name":"Deploy Airbag"
      ,"lat":34.380608
      ,"lon":-118.531685
      ,"age":11
      ,"gender":"Male"
    },
    {
       "name":"Courtesy Bomb II"
      ,"lat":36.279346
      ,"lon":-115.264565
      ,"age":89
      ,"gender":"Male"
    },
    {
       "name":"Papal Visit"
      ,"lat":40.150486
      ,"lon":-105.130775
      ,"age":33
      ,"gender":"Male"
    },
    {
       "name":"Cantor Bury"
      ,"lat":29.483515
      ,"lon":-98.55661
      ,"age":74
      ,"gender":"Male"
    },
    {
       "name":"Wheezing Balloon"
      ,"lat":38.857758
      ,"lon":-77.057884
      ,"age":59
      ,"gender":"Male"
    },
    {
       "name":"Baby Nipple"
      ,"lat":43.856747
      ,"lon":-68.88647
      ,"age":30
      ,"gender":"Female"
    },
    {
       "name":"Flying Turtle"
      ,"lat":34.02022
      ,"lon":-118.27451
      ,"age":1
      ,"gender":"Female"
    },
    {
       "name":"Trouser Spum"
      ,"lat":40.095432
      ,"lon":-85.680466
      ,"age":50
      ,"gender":"Male"
    },
    {
       "name":"Cabin Boy"
      ,"lat":40.916344
      ,"lon":-74.30241
      ,"age":43
      ,"gender":"Female"
    },
    {
       "name":"Sunburned Surfer"
      ,"lat":33.75922
      ,"lon":-117.98869
      ,"age":53
      ,"gender":"Male"
    },
    {
       "name":"Smelly Rat"
      ,"lat":35.190376
      ,"lon":-80.80673
      ,"age":35
      ,"gender":"Male"
    },
    {
       "name":"Jazzy Tetanus"
      ,"lat":40.56918
      ,"lon":-74.57321
      ,"age":4
      ,"gender":"Male"
    },
    {
       "name":"Zeno Iscariot (Balkan Theater)"
      ,"lat":26.16665
      ,"lon":-80.254135
      ,"age":73
      ,"gender":"Male"
    },
    {
       "name":"Pale Suggestion"
      ,"lat":37.637535
      ,"lon":-77.56999
      ,"age":17
      ,"gender":"Female"
    },
    {
       "name":"Noble Claw Hammer"
      ,"lat":40.919186
      ,"lon":-81.092415
      ,"age":37
      ,"gender":"Female"
    },
    {
       "name":"Widget Slump"
      ,"lat":29.547806
      ,"lon":-95.2387
      ,"age":92
      ,"gender":"Female"
    },
    {
       "name":"Double Dip"
      ,"lat":39.745377
      ,"lon":-121.850914
      ,"age":8
      ,"gender":"Male"
    },
    {
       "name":"Mr. Bubble"
      ,"lat":39.040024
      ,"lon":-76.67836
      ,"age":37
      ,"gender":"Male"
    },
    {
       "name":"Groovy Landmine"
      ,"lat":34.882683
      ,"lon":-99.502525
      ,"age":72
      ,"gender":"Female"
    },
    {
       "name":"Chain Cheney"
      ,"lat":40.798786
      ,"lon":-96.624985
      ,"age":15
      ,"gender":"Female"
    },
    {
       "name":"Stinking Badgers"
      ,"lat":40.049587
      ,"lon":-74.20306
      ,"age":63
      ,"gender":"Male"
    },
    {
       "name":"Panicked Pony"
      ,"lat":32.729794
      ,"lon":-94.94876
      ,"age":30
      ,"gender":"Female"
    },
    {
       "name":"Sponge Puff"
      ,"lat":42.647625
      ,"lon":-83.1683
      ,"age":12
      ,"gender":"Female"
    },
    {
       "name":"Coastal Ivory"
      ,"lat":39.089985
      ,"lon":-108.55638
      ,"age":3
      ,"gender":"Male"
    },
    {
       "name":"Permanent Press"
      ,"lat":34.027565
      ,"lon":-118.21952
      ,"age":35
      ,"gender":"Male"
    },
    {
       "name":"Scrubbed Mission"
      ,"lat":39.670826
      ,"lon":-91.54265
      ,"age":5
      ,"gender":"Male"
    },
    {
       "name":"Flaming Bunkhouse"
      ,"lat":32.645798
      ,"lon":-97.13353
      ,"age":69
      ,"gender":"Male"
    },
    {
       "name":"Castration"
      ,"lat":28.715263
      ,"lon":-100.49748
      ,"age":14
      ,"gender":"Male"
    },
    {
       "name":"Chewing Guam"
      ,"lat":33.451347
      ,"lon":-112.02782
      ,"age":62
      ,"gender":"Female"
    },
    {
       "name":"Nordic Surfer"
      ,"lat":37.731953
      ,"lon":-122.47374
      ,"age":53
      ,"gender":"Male"
    },
    {
       "name":"Significant Other"
      ,"lat":33.84639
      ,"lon":-84.25352
      ,"age":35
      ,"gender":"Male"
    },
    {
       "name":"Mindless Vacation"
      ,"lat":40.3496
      ,"lon":-79.86385
      ,"age":57
      ,"gender":"Male"
    },
    {
       "name":"Ineffectual Congress"
      ,"lat":29.691101
      ,"lon":-95.88929
      ,"age":35
      ,"gender":"Female"
    },
    {
       "name":"Severe Distortion"
      ,"lat":39.048508
      ,"lon":-77.11978
      ,"age":23
      ,"gender":"Male"
    },
    {
       "name":"Taxi Dance"
      ,"lat":41.011765
      ,"lon":-80.39338
      ,"age":75
      ,"gender":"Female"
    },
    {
       "name":"Thin Apple"
      ,"lat":39.048313
      ,"lon":-80.492676
      ,"age":16
      ,"gender":"Female"
    },
    {
       "name":"Floss and Deliver"
      ,"lat":34.78829
      ,"lon":-92.40186
      ,"age":6
      ,"gender":"Male"
    },
    {
       "name":"Anguished Praline"
      ,"lat":38.16955
      ,"lon":-86.99497
      ,"age":55
      ,"gender":"Male"
    },
    {
       "name":"Budget Overrun"
      ,"lat":37.798763
      ,"lon":-89.02771
      ,"age":87
      ,"gender":"Male"
    },
    {
       "name":"Peeking Duck"
      ,"lat":38.974895
      ,"lon":-76.52672
      ,"age":55
      ,"gender":"Male"
    },
    {
       "name":"Repellent Shadow"
      ,"lat":36.06256
      ,"lon":-89.330086
      ,"age":15
      ,"gender":"Female"
    },
    {
       "name":"Terror Bearer"
      ,"lat":30.733883
      ,"lon":-86.56707
      ,"age":14
      ,"gender":"Male"
    },
    {
       "name":"Froggy Bottom"
      ,"lat":35.992905
      ,"lon":-83.925896
      ,"age":56
      ,"gender":"Male"
    },
    {
       "name":"Hippy Pox"
      ,"lat":61.183994
      ,"lon":-149.83446
      ,"age":14
      ,"gender":"Female"
    },
    {
       "name":"Moon Swaddle"
      ,"lat":40.700386
      ,"lon":-73.958145
      ,"age":60
      ,"gender":"Female"
    },
    {
       "name":"Just Checking"
      ,"lat":36.00921
      ,"lon":-78.935745
      ,"age":66
      ,"gender":"Male"
    },
    {
       "name":"Brazen Beef"
      ,"lat":41.376057
      ,"lon":-72.90448
      ,"age":16
      ,"gender":"Male"
    },
    {
       "name":"Southern Comfort"
      ,"lat":37.32844
      ,"lon":-79.24731
      ,"age":14
      ,"gender":"Female"
    },
    {
       "name":"Impaled Moment"
      ,"lat":30.650707
      ,"lon":-88.15381
      ,"age":50
      ,"gender":"Male"
    },
    {
       "name":"Get Cheney"
      ,"lat":40.758984
      ,"lon":-73.9744
      ,"age":45
      ,"gender":"Female"
    },
    {
       "name":"Able Parish"
      ,"lat":42.42008
      ,"lon":-82.91042
      ,"age":35
      ,"gender":"Female"
    },
    {
       "name":"Flying Mountain"
      ,"lat":38.282467
      ,"lon":-104.4709
      ,"age":83
      ,"gender":"Female"
    },
    {
       "name":"Excruciating Witness"
      ,"lat":36.386295
      ,"lon":-85.31976
      ,"age":43
      ,"gender":"Male"
    },
    {
       "name":"Icky Rouge"
      ,"lat":28.06228
      ,"lon":-82.71228
      ,"age":93
      ,"gender":"Male"
    },
    {
       "name":"Faithful Mousetrap"
      ,"lat":26.523317
      ,"lon":-80.16395
      ,"age":43
      ,"gender":"Female"
    },
    {
       "name":"You Rub My Back"
      ,"lat":43.07313
      ,"lon":-89.38211
      ,"age":68
      ,"gender":"Female"
    },
    {
       "name":"Defense Industry"
      ,"lat":35.274387
      ,"lon":-120.6461
      ,"age":44
      ,"gender":"Female"
    },
    {
       "name":"Wandering Soul"
      ,"lat":40.923717
      ,"lon":-73.897995
      ,"age":65
      ,"gender":"Male"
    },
    {
       "name":"Winter Squash"
      ,"lat":34.93431
      ,"lon":-95.75069
      ,"age":31
      ,"gender":"Male"
    },
    {
       "name":"Burning Bush"
      ,"lat":41.652218
      ,"lon":-71.456314
      ,"age":54
      ,"gender":"Male"
    },
    {
       "name":"Asbestos Flamingo"
      ,"lat":33.233654
      ,"lon":-87.569496
      ,"age":79
      ,"gender":"Male"
    },
    {
       "name":"Verbal Remnant"
      ,"lat":33.611095
      ,"lon":-81.1033
      ,"age":9
      ,"gender":"Female"
    },
    {
       "name":"Granite Drop"
      ,"lat":37.24365
      ,"lon":-96.97124
      ,"age":9
      ,"gender":"Male"
    },
    {
       "name":"Condoleeza Confetti"
      ,"lat":35.88191
      ,"lon":-106.28629
      ,"age":5
      ,"gender":"Female"
    },
    {
       "name":"Thatâ€™s Gottaâ€™ Hurt"
      ,"lat":38.630627
      ,"lon":-76.91355
      ,"age":56
      ,"gender":"Female"
    },
    {
       "name":"Shy Lion"
      ,"lat":34.428932
      ,"lon":-119.64081
      ,"age":5
      ,"gender":"Male"
    },
    {
       "name":"Demonstrate Madness"
      ,"lat":36.283264
      ,"lon":-94.15175
      ,"age":39
      ,"gender":"Male"
    },
    {
       "name":"Sweltering Grandma"
      ,"lat":45.4158
      ,"lon":-122.63914
      ,"age":90
      ,"gender":"Male"
    },
    {
       "name":"My Pirahna"
      ,"lat":41.20005
      ,"lon":-73.13154
      ,"age":89
      ,"gender":"Female"
    },
    {
       "name":"Truth Turtle"
      ,"lat":33.850616
      ,"lon":-84.37871
      ,"age":44
      ,"gender":"Female"
    },
    {
       "name":"Crystal Cathedral"
      ,"lat":32.51708
      ,"lon":-92.15345
      ,"age":58
      ,"gender":"Female"
    },
    {
       "name":"Malignant Mansion"
      ,"lat":39.52333
      ,"lon":-122.20603
      ,"age":92
      ,"gender":"Female"
    },
    {
       "name":"Roast Grief"
      ,"lat":34.54867
      ,"lon":-80.58052
      ,"age":79
      ,"gender":"Male"
    },
    {
       "name":"Universal Shame"
      ,"lat":26.611391
      ,"lon":-81.64161
      ,"age":93
      ,"gender":"Male"
    },
    {
       "name":"Azure Intentions"
      ,"lat":30.172752
      ,"lon":-95.45502
      ,"age":40
      ,"gender":"Male"
    },
    {
       "name":"Donâ€™t Go There"
      ,"lat":41.62311
      ,"lon":-83.630875
      ,"age":21
      ,"gender":"Male"
    },
    {
       "name":"Tajik Stand"
      ,"lat":35.910477
      ,"lon":-82.06242
      ,"age":71
      ,"gender":"Female"
    },
    {
       "name":"Bare Yer Asses"
      ,"lat":35.091866
      ,"lon":-80.86922
      ,"age":60
      ,"gender":"Male"
    },
    {
       "name":"Dust Biter"
      ,"lat":36.193752
      ,"lon":-83.35745
      ,"age":54
      ,"gender":"Female"
    },
    {
       "name":"Irrational Exuberance"
      ,"lat":28.01405
      ,"lon":-82.78382
      ,"age":22
      ,"gender":"Male"
    },
    {
       "name":"Collateral Damage"
      ,"lat":42.487778
      ,"lon":-76.33771
      ,"age":78
      ,"gender":"Male"
    },
    {
       "name":"Stolen Future"
      ,"lat":39.731777
      ,"lon":-94.234184
      ,"age":5
      ,"gender":"Male"
    },
    {
       "name":"Destitute Warden"
      ,"lat":33.824383
      ,"lon":-117.95892
      ,"age":68
      ,"gender":"Female"
    },
    {
       "name":"Lost Planet"
      ,"lat":43.48223
      ,"lon":-111.96982
      ,"age":48
      ,"gender":"Male"
    },
    {
       "name":"Panther Trap"
      ,"lat":61.187965
      ,"lon":-149.82855
      ,"age":20
      ,"gender":"Female"
    },
    {
       "name":"Blind Orpheus"
      ,"lat":45.041813
      ,"lon":-84.673904
      ,"age":45
      ,"gender":"Male"
    },
    {
       "name":"Permanent Ante"
      ,"lat":42.78778
      ,"lon":-82.47857
      ,"age":92
      ,"gender":"Male"
    },
    {
       "name":"Plunder There Somewhere"
      ,"lat":32.808716
      ,"lon":-96.805786
      ,"age":33
      ,"gender":"Male"
    },
    {
       "name":"Hungarian Jelly"
      ,"lat":41.548832
      ,"lon":-87.50496
      ,"age":81
      ,"gender":"Female"
    },
    {
       "name":"Fortunate Sunshine"
      ,"lat":33.878582
      ,"lon":-84.025665
      ,"age":28
      ,"gender":"Female"
    },
    {
       "name":"Discredited Poet"
      ,"lat":41.68634
      ,"lon":-69.968124
      ,"age":9
      ,"gender":"Female"
    },
    {
       "name":"Dung Beetle"
      ,"lat":44.36022
      ,"lon":-100.33681
      ,"age":96
      ,"gender":"Male"
    },
    {
       "name":"Missive Vaccination"
      ,"lat":34.16098
      ,"lon":-118.83777
      ,"age":0
      ,"gender":"Female"
    },
    {
       "name":"Noble Savage"
      ,"lat":38.631027
      ,"lon":-90.28791
      ,"age":79
      ,"gender":"Male"
    },
    {
       "name":"Unruly Neighbor"
      ,"lat":40.63275
      ,"lon":-73.96699
      ,"age":88
      ,"gender":"Male"
    },
    {
       "name":"Sweaty Nutcracker"
      ,"lat":35.39119
      ,"lon":-82.48756
      ,"age":85
      ,"gender":"Female"
    },
    {
       "name":"Heavenly Backlog"
      ,"lat":41.676296
      ,"lon":-72.94678
      ,"age":12
      ,"gender":"Male"
    },
    {
       "name":"Bong Bait"
      ,"lat":40.73454
      ,"lon":-81.51768
      ,"age":62
      ,"gender":"Female"
    },
    {
       "name":"Force-Feed"
      ,"lat":36.846313
      ,"lon":-121.40403
      ,"age":64
      ,"gender":"Male"
    },
    {
       "name":"Angry Angus"
      ,"lat":34.161247
      ,"lon":-118.44871
      ,"age":98
      ,"gender":"Male"
    },
    {
       "name":"Dial-a-Ride"
      ,"lat":31.364178
      ,"lon":-109.59741
      ,"age":0
      ,"gender":"Male"
    },
    {
       "name":"Abused Beagle"
      ,"lat":38.44166
      ,"lon":-81.98653
      ,"age":20
      ,"gender":"Female"
    },
    {
       "name":"Below the Beltway"
      ,"lat":32.38125
      ,"lon":-96.851746
      ,"age":57
      ,"gender":"Female"
    },
    {
       "name":"Inflammed Mouthpiece"
      ,"lat":39.71571
      ,"lon":-121.79533
      ,"age":59
      ,"gender":"Male"
    },
    {
       "name":"Flagrant Violation"
      ,"lat":38.54772
      ,"lon":-76.06037
      ,"age":68
      ,"gender":"Male"
    },
    {
       "name":"Condoleeza Please"
      ,"lat":34.608837
      ,"lon":-98.42745
      ,"age":69
      ,"gender":"Female"
    },
    {
       "name":"Incredulous Remorse"
      ,"lat":33.63781
      ,"lon":-96.62351
      ,"age":88
      ,"gender":"Male"
    },
    {
       "name":"Twisted Fish"
      ,"lat":40.605106
      ,"lon":-73.75204
      ,"age":98
      ,"gender":"Female"
    },
    {
       "name":"Turn Tables"
      ,"lat":34.053993
      ,"lon":-118.46339
      ,"age":66
      ,"gender":"Female"
    },
    {
       "name":"Fist Weasel"
      ,"lat":42.54462
      ,"lon":-96.407425
      ,"age":62
      ,"gender":"Female"
    },
    {
       "name":"Hairy Cooperative"
      ,"lat":32.785378
      ,"lon":-79.97911
      ,"age":14
      ,"gender":"Male"
    },
    {
       "name":"Terror Sunset"
      ,"lat":42.2503
      ,"lon":-71.79254
      ,"age":96
      ,"gender":"Female"
    },
    {
       "name":"Staff Infection"
      ,"lat":34.17224
      ,"lon":-118.53169
      ,"age":19
      ,"gender":"Female"
    },
    {
       "name":"Gotham Roadmap"
      ,"lat":33.62999
      ,"lon":-89.72013
      ,"age":1
      ,"gender":"Female"
    },
    {
       "name":"Pensive Pony"
      ,"lat":39.635548
      ,"lon":-86.13415
      ,"age":83
      ,"gender":"Male"
    }];
  };
  
  AppController.$inject = ['$scope', 'leafletData', 'leafletEvents', 'Item', '$timeout'];
  angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));