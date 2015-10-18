'use strict';

angular.module('frontApp')
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
      gdp: '95%',
      jobGrowth: '5%',
      unemployment: '10%'
    };

    $scope.updateGraphResults = function(data) {
      console.log($scope.priceSlider);
      $scope.currentGraphSelection = data;
      var id = data.id;
      var stub = $scope.fullGraphResults;
      stub.forEach(function(state) {
        if (id === state.states) {
          $scope.graphResults = {
            state: id,
            gdp: state.GDP[year],
            jobGrowthRate: function() {
              if (state.JobGrowthRate === null) {
                return 'Data Unavailable';
              } else {
                return state.JobGrowthRate[year];
              }
            },
            unemployment: state.UnEmployRate[year]
          };
          $scope.$apply($scope.graphResults);
        }
      });
    };


  });
