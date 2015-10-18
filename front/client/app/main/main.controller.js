'use strict';

angular.module('frontApp').directive('dcirc', function () {
  return {
    link: function (scope, element, attr) {
      console.log("  look im the value" + attr.val);

      scope.lab = attr.lab;
      element.css({
        position: 'relative'

      });

      /*

       Blue: 3661B0, Teal: 00ADA6, Orange: E86116, Red: B42020, Yellow: E2CF00


       */

      var chash = {"gdp": "#3661B0", "gro": "#E2CF00", "une": "#00ADA6","vc": "#00ADA6", "vcd": "#E2CF00", "score": "#B42020", "firm": "#3661B0" };

      var config1 = liquidFillGaugeDefaultSettings();
      config1.circleColor = chash[attr.lab];
      config1.textColor = "#000000";
      config1.waveTextColor = "#FFAAAA";
      config1.waveColor = chash[attr.lab];
      config1.circleThickness = 0.2;
      config1.textVertPosition = 0.2;
      config1.waveAnimateTime = 1000;
      config1.waveAnimate = true;
      config1.waveHeight = .3;
      config1.waveCount = 2;

//parseInt(attr.val.replace("%","") )
      var gauge = loadLiquidFillGauge(attr.lab, 60, config1);
      scope.$watch(function () {
        return element.attr('val');
      }, function (newValue) {
        console.log("new value" + newValue);
        if (newValue != null) {
          gauge.update(parseInt(newValue.replace("%", "")));
        }// null ch
      });
    },
    restrict: 'E'

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

    $scope.getYear = function () {
      $scope.updateGraphResults($scope.currentGraphSelection);
    };

    $http.get('/data').success(function (data) {
      $scope.fullGraphResults = data.tasks;
    });

    $scope.mapObject = {
      responsive: true,
      scope: 'usa',
      options: {
        width: 1110
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
      data: {}
    };

    $scope.graphResults = {
      state: 'MD',
      gdp: 0,
      jobGrowth: 0,
      unemployment: 0,
      vcdeals: 0,
      vcd: 0,
      Score: 0,
      Firm: 0
    };

    $scope.updateGraphResults = function (data) {
      console.log($scope.priceSlider);
      $scope.currentGraphSelection = data;
      var id = data.id;
      var stub = $scope.fullGraphResults;
      stub.forEach(function (state) {
        console.log(state);
        if (id === state.states) {
          $scope.graphResults = {
            state: id,
            gdp: state.GDP[year],
            jobGrowthRate: state.JobGrowthRate[year],
            unemployment: state.UnEmployRate[year],
            vcdeals: state.VCDeals[year].Amount,
            vcd: state.VCDeals[year].Deals,
            Score: state.Score,
            Firm: state.Firm[year]
          };
          $scope.$apply($scope.graphResults);
        }
      });
    };


  });
