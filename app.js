﻿var SmaRRt = angular.module("SmaRRt", ["ngRoute", "ngAnimate"]);


SmaRRt.run(function ($rootScope, RequestsService) {


    RequestsService.setFactoryRequests(G_ROOM_REQUESTS);
    RequestsService.setFactorySuppliers(G_SUPPLIERS);


    //G_ME = loadUser();
    G_ME = "Ja";
    //G_SPI_LIST = loadSPI();
    G_SPI_LIST = ["SPI_20190725.xlsx"];
    RequestsService.setFactoryUser(G_ME);
    RequestsService.setFactorySpi(G_SPI_LIST);


    setTimeout(function () {
        document.getElementsByTagName("html")[0].style.visibility = "visible";
        $("#loader1").hide();
    }, 1000);


});




SmaRRt.controller("HeaderCtrl", function ($scope, RequestsService) {


    $scope.appTitle = "FMA WORKBENCH";

    $scope.hello = "Witaj ";
    $scope.usr;


    $scope.$watch(
        function () {
            return RequestsService.getFactoryUser();
        },
        function (value) {

            $scope.usr = value;
            $scope.hello += $scope.usr.nm + "!";

            //console.log("set user ", $scope.usr);
        }
    );
});
