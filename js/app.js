var Address = {
	street: "",
	city: "",
	state: ""
};

var Phone =	{
	number:"",
	type:'home'
};

var Contact = {
	fname: "",
	lname: "",
	phonelist: [],
	addresslist: [],

	addContact: function (params) {
		this.fname = params['fname'];
		this.lname = params['lname'];
		for (var i=0; i<params['phones'].length; i++) {
			var p = Object.create(Phone);
			p.number = params['phones'][i]['phone'];
			p.type = params['phones'][i]['type'];
			this.phonelist.push(p);
		};
		for (var i=0; i<params['addresses'].length; i++) {
			var a = Object.create(Address);
			a.street = params['addresses'][i]['street'];
			a.city = params['addresses'][i]['city'];
			a.state = params['addresses'][i]['state'];
			this.addresslist.push(a);
		}
	}
};


function addPhoneNum(phoneSetID) {
	event.preventDefault();
	console.log("addPhoneNum called");
    $(phoneSetID).append("<input type='tel' name='phonelist[]'><br>");
       
};

function addAddress(addressSetID) {
	event.preventDefault();
	console.log("addAddress called");
	// add street, city, and state fields
	var addressFields = "<hr class='address'>" +
					"Street<br>" + 
					"<input type='text' name='streetlist[]'><br>" + 
					"City<br>" + 
					"<input type='text' name='citylist[]'><br>" +
					"State<br>" + 
					"<input type='text' name='statelist[]'><br>";
	$(addressSetID).append(addressFields);


};


$(document).ready(function(){

	console.log ('document ready');
	var contacts = [];


	$('.addContactForm').submit( function(event){
   		event.preventDefault();
   		console.log ('submit event detected');

   		var contact = Object.create(Contact);

   		var inputs=$(this)[0];
   		var params ={};
   		var key="";
   		for (i=0; i<inputs.length; i++) {
   			key=inputs[i].name;
   			params[key] = inputs[i].value;
   		};

   		contact.addContact (params);
  		
   		contacts.push(contact);

   		console.log (contact);

   		//contacts.forEach (function(contact){
   		//	console.log (contact.lname);
   		//});

   	});
});
