angular.module('KHO_CRM').factory('SetAlertClass', setClass);

setClass.$inject = [];

function setClass() {

	return {
		set : function(category) {
			switch (category)
			{
				case "Raport" :
					return "report";
					break;
				case "Uwaga" :
					return "warning";
					break;
				case "Opinia" :
					return "default";
					break;
				case "Sukces" :
					return "success";
					break;
				case "Zagrożenie" :
					return "zagrozenie";
					break;
				case "Niepowodzenie" :
					return "danger";
					break;
			}
		},
		setClassStatus : function(status) {
			switch (status)
			{
				case "W trakcie realizacji" :
					return "info";
					break;
				case "Zamknięto pozytywnie" :
					return "success";
					break;
				case "Zamknięto negatywnie" :
					return "danger";
					break;
			}
		}

	}
}