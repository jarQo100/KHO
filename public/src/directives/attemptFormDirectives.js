angular.module('KHO_CRM').directive('attemptForm', function() {
  return {
    templateUrl: 'pages/attemptFormCreateAndUpdate.html'
  };
});

angular.module('KHO_CRM').directive('appDatetime', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                onSelect: function (date) {
                    var ar=date.split("/");
                    date=new Date(ar[2]+"-"+ar[1]+"-"+ar[0]);
                    ngModelCtrl.$setViewValue(date.getTime());
                    scope.$apply();
                }
            });
            ngModelCtrl.$formatters.unshift(function(v) {
            return $filter('date')(v,'dd/MM/yyyy');
            });

        }
    };
});

