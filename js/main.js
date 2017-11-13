/* ------------------------------------------------------------------------------
	Helpers
-------------------------------------------------------------------------------*/

function normalize(s) {
  return s.toLowerCase().replace(/\s/g, '-');
}

function addAlpha(hex, alpha, value) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    var c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x'+c.join('');
    c = [(c>>16)&255, (c>>8)&255, c&255];
    if (value < 1)
      c = [Math.trunc(c[0]*value), Math.trunc(c[1]*value), Math.trunc(c[2]*value)]
    return 'rgba('+c.join(',')+','+alpha+')';
  }
  throw new Error('Bad Hex');
}

function addKeys(items) {
  k = ""
  for (i of items) {
    i.ref = normalize(i.title);
    i.key = i.title;
    if (i.text != undefined) i.key += " " + i.text;
    if (i.items != undefined) i.key += addKeys(i.items);
    k += " " + i.key;
  }
  return k;
}

/* ------------------------------------------------------------------------------
	Controllers
-------------------------------------------------------------------------------*/

function pageSet($scope, pagetitle, color, nphoto, links, contents) {
  var lowtitle = normalize(pagetitle);
  links.unshift({ link: lowtitle, title: pagetitle })
  $scope.background = {'background-color': color};
  $scope.bgalpha = {
    'background-color': color,
    'box-shadow': '0px 3px 13px 2px '+addAlpha(color,0.2,0.4),
    'margin-bottom': '30px'
  };
  $scope.title = pagetitle;
  $scope.theme = lowtitle;
  $scope.pages = links;
  $scope.nphoto = nphoto;
  $scope.contents = contents;
  $scope.affix = function() {
    $('#scroller').affix({
      offset: {
        top: 899, //$('#scroller').offset().top
        bottom: 90 // footer height
      }
    });
  };
  addKeys($scope.contents);
}

/* ------------------------------------------------------------------------------
	Router
-------------------------------------------------------------------------------*/

var app = angular.module("homeApp", ['ngRoute', 'duScroll']).value('duScrollOffset', 60);
app.config(function($routeProvider) {
  $routeProvider
   .when("/home", {
     templateUrl : "pages/home.html"
    })
   .when("/research", {
     templateUrl : "pages/main.html",
     controller : "researchCtrl"
    })
   .when("/research/:page", {
     templateUrl : "pages/main.html",
     controller : "researchCtrl"
    })
   .when("/music", {
     templateUrl : "pages/main.html",
     controller : "musicCtrl"
    })
   .when("/music/:page", {
     templateUrl : "pages/main.html",
     controller : "musicCtrl"
    })
   .when("/games", {
     templateUrl : "pages/main.html",
     controller : "gamesCtrl"
    })
   .when("/games/:page", {
     templateUrl : "pages/main.html",
     controller : "gamesCtrl"
    })
   .when("/society", {
     templateUrl : "pages/main.html",
     controller : "societyCtrl"
    })
   .when("/society/:page", {
     templateUrl : "pages/main.html",
     controller : "societyCtrl"
    })
   .otherwise({
     redirectTo: "/home"
    })
});
