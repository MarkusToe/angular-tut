var app = angular.module("behaviorApp", []);

function SomeController($scope) {
    $scope.name = "Awesome Controller";
    $scope.loadMoreTweets = function(){
        console.log("Loading Tweets");
    };
}

app.directive("exchanger", function(){
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            title: '@expanderTitle',
            parent: '=expanderParent'
        },
        template: '<div class="exchanger">' +
            '<h2><b>@</b>: {{title}}</h2>' +
            '<p>I am a child of the <b>=</b>: {{parent}} and I am the <b>transclude</b>: <span ng-transclude></span></p>' +
            '</div>'
    };
});

app.directive("superman", function(){
    return {
        restrict: "E",
        template: "<h1>I am Superman</h1>",
        replace: true,
        link: function(scope, element, attrs){
            element.bind('click', function() {
                element.toggleClass(attrs.click);
            });
        }
    };
});

app.directive("enter", function(){
   return function(scope, element, attrs){
       element.bind('mouseenter', function() {
           scope.loadMoreTweets();
       });
   };
});