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
    //
    //$http.get('http://localhost:5000/free/api/v1.0/tasks').success(function(awesomeThings) {
    //  $scope.awesomeThings = awesomeThings;
    //  console.log(awesomeThings);
    //});

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
        //"AZ": {
        //  "fillKey": "MEDIUM"
        //},
        //"CO": {
        //  "fillKey": "HIGH"
        //},
        //"DE": {
        //  "fillKey": "LOW"
        //},
        //"GA": {
        //  "fillKey": "MEDIUM"
        //}
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
      var stub = $scope.fullGraphResults;
      stub.forEach(function(state) {
        if (id === state.states) {
          $scope.graphResults = {
            state: id,
            gdp: state.GDP[year],
            jobGrowthRate: function() {
              if (state.JobGrowthRate === null) {
                console.log(state.JobGrowthRate);
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
