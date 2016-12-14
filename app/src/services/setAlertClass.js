angular.module('KHO_CRM').factory('SetAlertClass', setClass);

setClass.$inject = [];

function setClass() {

	return {
		set : function(category) {
			switch (category)
			{
				case "Raport" :
					return "alert-report";
					break;
				case "Uwaga" :
					return "alert-warning";
					break;
				case "Opinia" :
					return "alert-default";
					break;
				case "Sukces" :
					return "alert-success";
					break;
				case "Zagrożenie" :
					return "alert-zagrozenie";
					break;
				case "Niepowodzenie" :
					return "alert-danger";
					break;
			}
		},
		setClassStatus : function(status) {
			switch (status)
			{
				case "W trakcie realizacji" :
					return "label-info";
					break;
				case "Zamknięto pozytywnie" :
					return "label-success";
					break;
				case "Zamknięto negatywnie" :
					return "label-danger";
					break;
			}
		}

	}
}