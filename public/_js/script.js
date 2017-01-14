(function(){

function Validator(form) {
	this.form = form;
    this.fields = this.form.querySelectorAll("[required]");
    this.errors = [];
    this.errorsList = this.form.querySelector(".alert ol");
	
	if(!this.fields.length) return;

	this.form.onsubmit = function(e) {
	    e.preventDefault();

	    var formValid = this.validate();

	    if(formValid) {
	        this.form.submit();
	    } else {
	        return false;
	    }

	}.bind(this);

	this.fun = function(){

		alert("fds");

	};

}

Validator.prototype.validate = function() {
	alert("aa");
	for(var i = 0; i < this.fields.length; i++){
		alert("fds");
	}
};

	var validator1 = new Validator(document.getElementById("form"));
	validator1.fun();


})();