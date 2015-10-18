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

    $scope.awesomeThings = [];
    $scope.graphResults = {};

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
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
        "AZ": {
          "fillKey": "MEDIUM"
        },
        "CO": {
          "fillKey": "HIGH"
        },
        "DE": {
          "fillKey": "LOW"
        },
        "GA": {
          "fillKey": "MEDIUM"
        }
      }};

    $scope.graphResults = {
      state: 'MD',
      gdp: '95%',
      jobGrowth: '5%',
      unemployment: '10%'
    };

    $scope.updateGraphResults = function(data) {
      var id = data.id;
      var year = yearStruct[2010];
      var stub = [{'GDP': [427052.0, 407160.0, 390643.0, 372444.0, 362521.0, 350996.0, 353744.0, 343482.0, 315723.0, 296731.0, 271676.0], 'states': 'TX', 'UnEmployRate': [5.3, 5.3, 5.3, 5.4, 5.5, 5.9, 6.3, 6.3, 6.3, 6.3, 6.3]}]
      stub.forEach(function(state) {
        if (id === state.states) {
          $scope.graphResults = {
            state: id,
            gdp: state.GDP[year],
            jobGrowth: 'ADD ME',
            unemployment: state.UnEmployRate[year]
          };
          $scope.$apply($scope.graphResults);
        }
      });
    };

  });
