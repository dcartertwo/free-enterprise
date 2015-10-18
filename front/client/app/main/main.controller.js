'use strict';

angular.module('frontApp').directive('dcirc', function() {
  return {
link:function(scope,element,attr){
console.log(  "  look im the value"+attr.val );

scope.lab = attr.lab;
element.css({
       position: 'relative',
     
      });

/*

Blue: 3661B0, Teal: 00ADA6, Orange: E86116, Red: B42020, Yellow: E2CF00


*/

var chash ={"gdp":"#00ADA6","gro":"#B42020","une":"#00ADA6"  };

var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = chash[attr.lab];
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FF77DD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 1000;
        config1.waveAnimate = true;
config1.waveHeight = .3;
    config1.waveCount = 2;

//parseInt(attr.val.replace("%","") )

 var gauge = loadLiquidFillGauge( attr.lab , 60 , config1  );


scope.$watch(function() {return element.attr('val'); }, function(newValue){

console.log("new value"+newValue);


if(newValue!=null){

gauge.update(parseInt(newValue.replace("%","") ));

}// null ch


});



},
restrict:'E'

  }
})
  .controller('MainCtrl', function ($scope, $http) {
    var yearStruct = {
      2004: 0,
      2005: 1,
      2006: 2,
      2007: 3,
      2008: 4,
      2009: 5,
      2010: 6,
      2011: 7,
      2012: 8,
      2013: 9,
      2014: 10
    };
    $scope.currentGraphSelection = {};

    $scope.priceSlider = 2004;

    var year = yearStruct[$scope.priceSlider];

    $scope.awesomeThings = [];
    $scope.graphResults = {};

    $scope.getYear = function() {
      $scope.updateGraphResults($scope.currentGraphSelection);
    };

    $http.get('/data').success(function(data) {
      $scope.fullGraphResults = data.tasks;
    });

    $scope.mapObject = {
      responsive: true,
      scope: 'usa',
      options: {
        width: 1110,
        legendHeight: 60 // optionally set the padding for the legend
      },
      geographyConfig: {
        highlighBorderColor: '#EAA9A8',
        highlighBorderWidth: 2
      },
      fills: {
        'HIGH': '#CC4731',
        'MEDIUM': '#306596',
        'LOW': '#667FAF',
        'defaultFill': '#DDDDDD'
      },
      data: {
      }};

    $scope.graphResults = {
      state: 'MD',
      gdp: '95',
      jobGrowth: '5',
      unemployment: '10'
    };

    $scope.updateGraphResults = function(data) {
      console.log($scope.priceSlider);
      $scope.currentGraphSelection = data;
      var id = data.id;
<<<<<<< HEAD
      var year = yearStruct[2010];
      var stub = [{'GDP': [42.0, 40.0, 39.0, 37.0, 36.0, 35.0, 35.0, 34.0, 31.0, 29.0, 27.0], 'states': 'TX', 'UnEmployRate': [5.3, 5.3, 5.3, 5.4, 5.5, 5.9, 6.3, 6.3, 6.3, 6.3, 6.3]}]
=======
      var stub = $scope.fullGraphResults;
>>>>>>> c220c240b6fbf17546a64d1ebbeefd78b91d0ac8
      stub.forEach(function(state) {
        if (id === state.states) {
          $scope.graphResults = {
            state: id,
            gdp: state.GDP[year],
<<<<<<< HEAD
            jobGrowth: 7,
=======
            jobGrowthRate: function() {
              if (state.JobGrowthRate === null) {
                return 'Data Unavailable';
              } else {
                return state.JobGrowthRate[year];
              }
            },
>>>>>>> c220c240b6fbf17546a64d1ebbeefd78b91d0ac8
            unemployment: state.UnEmployRate[year]
          };
          $scope.$apply($scope.graphResults);
        }
      });
    };


  });
