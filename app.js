// Ionic Starter App

// Angular.module is a global place for creating, registering and retrieving Angular modules.
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html).
// The 2nd parameter is an array of 'requires'.
// 'starter.controllers' is found in controllers.js.

_appModule.run(function($ionicPlatform, DataManager) {
    
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs).
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider


    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    
    .state('app.CompetentieKoppelen', {
        url: "/task/:id/CompetentieKoppelen",
        views: {
            'menuContent': {
                templateUrl: "templates/CompetentieKoppelen.html",
                controller: 'CompetentieKoppelenCtrl'
            }
        }
    })

    .state('app.ZelfreflectieKoppelen', {
        url: "/task/:id/ZelfreflectieKoppelen",
        views: {
            'menuContent': {
                templateUrl: "templates/zelfreflectieKoppelen.html",
                controller: 'ZelfreflectieKoppelenCtrl'
            }
        }
    })
    
//      .state('app.login', {
//        url: "/login",
//        views: {
//            'menuContent': {
//                templateUrl: "templates/login.html",
//                controller: 'loginCtrl'
//            }
//        }
//    })
    
    .state('app.logout', {
        url: "/logout",
        views: {
            'menuContent': {
                templateUrl: "templates/logout.html",
                controller: 'logoutCtrl'
                // controller 'logoutCtrl' not made yet
            }
        }
    })

    .state('app.omschrijvingKoppelen', {
        url: "/task/:id/description",
        views: {
            'menuContent': {
                templateUrl: "templates/omschrijvingKoppelen.html",
                controller: 'omschrijvingKoppelenCtrl'
            }
        }
    })
    
    .state('app.aanbevelingen', {
        url: "/aanbevelingen",
        views: {
            'menuContent': {
                templateUrl: "templates/aanbevelingen.html",
                controller: 'aanbevelingenCtrl'
            }
        }
    })
    
     .state('app.competenties', {
        url: "/competenties",
        views: {
            'menuContent': {
                templateUrl: "templates/competenties.html",
                controller: 'competentiesCtrl'
            }
        }
    })
    
     .state('app.werkervaring', {
        url: "/werkervaring",
        views: {
            'menuContent': {
                templateUrl: "templates/werkervaring.html",
                controller: 'werkervaringCtrl'
            }
        }
    })
    
//     .state('app.changeOpdrachtNaam', {
//         url: "/changeOpdrachtNaam",
//         views: {
//             'menuContent': {
//                 templateUrl: "templates/changeOpdrachtNaam.html",
//                 controller: 'opdrachtNaamCtrl'
//             }
//         }
//     })

    .state('app.opdrachtenLijst', {
        url: "/tasks",
        views: {
            'menuContent': {
                templateUrl: "templates/tasks.html",
                controller: 'TaskController'
            }
        }
    })

    
//    .state('app.logouted', {
//        url: "/logouted",
//        views: {
//            'menuContent': {
//                templateUrl: "templates/logouted.html",
//                controller: 'LogoutedController'
//            }
//        }
//    })
    
    .state('app.welcome', {
        url: "/welcome",
        views: {
            'menuContent': {
                templateUrl: "templates/welcome.html",
//                controller: 'WelcomeController'
            }
        }
    })

    
    .state('app.opdrachtOverzicht', {
        url: "/task/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/opdrachtOverzicht.html",
                controller: 'opdrachtOverzichtCtrl'
            }
        }
    })

    .state('app.bewijsstukBevestigen', {
        url: "/bewijsstukBevestigen",
        views: {
            'menuContent': {
                templateUrl: "templates/bewijsstukBevestigen.html",
                controller: 'bewijsstukBevestigingCtrl'
            }
        }
    })

    .state('app.evaluation', {
        url: "/task/:id/evaluation",
        views: {
            'menuContent': {
                templateUrl: "templates/evaluation.html",
                controller: 'evaluationCtrl'
            }
        }
    })

    .state('app.profielOverzicht', {
        url: "/profielOverzicht",
        views: {
            'menuContent': {
                templateUrl: "templates/profielOverzicht.html",
                controller: 'profielOverzichtCtrl'
            }
        }
    })

    .state('app.bewijsstukkenPerOpdrachtLijst', {
        url: "/task/:id/images/",
        views: {
            'menuContent': {
                templateUrl: "templates/bewijsstukkenPerOpdrachtLijst.html",
                controller: 'bewijsstukkenPerOpdrachtLijstCtrl'
            }
        }
    })

        .state('app.favorieteOpdrachtenLijst', {
        url: "/favorieteOpdrachtenLijst",
        views: {
            'menuContent': {
                templateUrl: "templates/favorieteOpdrachtenLijst.html",
                controller: 'favorieteOpdrachtenLijstCtrl'
            }
        }
    });

    /*.state('app.bewijsstukken', {
        url: "/bewijsstukken",
        views: {
            'menuContent': {
                templateUrl: "templates/bewijsstukken.html",
                controller: 'bewijsstukkenCtrl'
            }
        }
    })*/

    // If none of the above states are matched, use this as the fallback.
//    $urlRouterProvider.otherwise('/app/tasks');
    $urlRouterProvider.otherwise('/app/welcome');
});
