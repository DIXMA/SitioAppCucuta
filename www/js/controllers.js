angular.module('starter.controllers', [])

        .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

            // With the new view caching in Ionic, Controllers are only called
            // when they are recreated or on app start, instead of every page change.
            // To listen for when this page is active (for example, to refresh data),
            // listen for the $ionicView.enter event:
            //$scope.$on('$ionicView.enter', function(e) {
            //});

            // Form data for the login modal
            $scope.loginData = {
                username: "",
                password: ""
            };

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                alert("Login");
            };
        })

        .controller('PlaylistsCtrl', function ($scope, $http) {
            //alert('CONTROLLER INICIO');
            $http({
                url: 'http://sitiowebcucuta.com/serviceweb/public/getCategories',
                method: "GET",
            }).
                    success(function (data) {
                        //alert(data);
                        var c = Object.keys(data).length;
                        //alert("catn - " + c);
                        if (c > 0) {
                            $scope.playlists = data;
                        } else {
                            $scope.playlists = "x";
                        }
                    }).
                    error(function (data) {
                        alert("Error al cargar los datos. Por favor verifique su conexión a internet.");
                    });
        })

        .controller('PlaylistCtrl', function ($scope, $stateParams, $http, $state) {
            $scope.verInformacion = function (id, nombre, mime, imagen) {
                alert("Clic");
                $state.go('informacion', {"establecimientoId": id, "nombre": nombre, "mime": mime, "imagen": imagen});
            };

            //alert($stateParams.playlistId);
            $http({
                url: 'http://sitiowebcucuta.com/serviceweb/public/establecimientos/' + $stateParams.playlistId,
                method: "GET",
            }).
                    success(function (data) {
                        //alert(data);
                        var c = Object.keys(data).length;
                        //alert("catn - " + c);
                        if (c > 0) {
                            $scope.establecimientos = data;
                        } else {
                            $scope.establecimientos = "x";
                        }
                    }).
                    error(function (data) {
                        alert("Error al cargar los datos. Por favor verifique su conexión a internet.");
                    });

        })

        .controller('BrowseCtrl', function ($scope, $stateParams, $http, $state) {
            $scope.estado = 0;
            //alert($stateParams.playlistId);
            $scope.data = {
                busqueda: ""
            };
            $scope.buscar = function () {
                if ($scope.data.busqueda === "") {
                    alert("Debe digitar una palabra para realizar la búsqueda.");
                } else {
                    $scope.estado = 1;
                    $http({
                        url: 'http://sitiowebcucuta.com/serviceweb/public/buscar/' + $scope.data.busqueda,
                        method: "GET",
                    }).
                            success(function (data) {
                                //alert(data);
                                $scope.estado = 2;
                                var c = Object.keys(data).length;
                                //alert("catn - " + c);
                                if (c > 0) {
                                    $scope.resultado = data;
                                } else {
                                    $scope.resultado = "x";
                                }
                            }).
                            error(function (data) {
                                alert("Error al cargar los datos. Por favor verifique su conexión a internet.");
                            });
                }

            }


        })

        .controller('correoCtrl', function ($scope, $stateParams, $http) {

        })

        .controller('infoCtrl', function ($scope, $stateParams, $http) {

            $scope.data = {
                nombre: "",
                mime: "",
                image: "",
                restaurante: "",
                subtitle: "",
                descripcion: ""
            };

            $http({
                url: 'http://sitiowebcucuta.com/serviceweb/public/informacion/' + $stateParams.id,
                method: "GET",
            }).
                    success(function (data) {
                        //alert(data);
                        var e = Object.keys(data.est).length;
                        var c = Object.keys(data.data).length;
                        var d = Object.keys(data.menu).length;
                        if (e > 0) {
                            $scope.est = data.est;
                            $scope.data = {
                                nombre: data.est.name,
                                mime: data.est.mime,
                                image: data.est.image,
                                restaurante: data.est.restaurante,
                                subtitle: data.est.subtitle,
                                descripcion: data.est.description
                            };
                        } else {
                            $scope.est = "x";
                        }
                        if (c > 0) {
                            $scope.data_est = data.data;
                        } else {
                            $scope.data_est = "x";
                        }
                        if (d > 0) {
                            $scope.menu_est = data.menu;
                        } else {
                            $scope.menu_est = "x";
                        }

                    }).
                    error(function (data) {
                        alert("Error al cargar los datos. Por favor verifique su conexión a internet.");
                    });

        });
