var contacts = [];


var Address = {
	street: "",
	city: "",
	state: ""
};

var Phone =	{
	number:"",
	type: 'mobile'
};

var Contact = {
	fname: "",
	lname: "",
	phonelist: [],
	addresslist: [],

/*
    logThis: function () {
    	console.log(this);
    	console.log("name= " + this.fname + " " + this.lname);
    	for (var p=0; p<this.phonelist.length; p++) {
			console.log ("num-" + p + " = " + this.phonelist[p].number);
		};	
	},
*/


	addContact: function (params) {

		for (var key in params) {
			if (key.startsWith("phonelist")){
				for (i=0; i<params['phonelist'].length; i++) {
					//var pNum = '555-555-5555';
					//var p = Object.create(Phone);
					//p.number = params[key][i];
					//var plist = this['phonelist'];
					//plist.push(p);

	   				this['phonelist'].push(Object.create(Phone));
					this['phonelist'][i].number = params[key][i];
				};
			} 
			else if (key.startsWith("addresslist")){
				for (i=0; i<params['addresslist'].length; i++) {
	   				var a = this.addresslist.push(Object.create(Address));
	   				a.street = params[key][i]['street'];
					a.city = params[key][i]['city'];
					a.state = params[key][i]['state'];
				};
	   		}
	   		else
			    this[key] = params[key];
		};

		console.log (this);
	}
};



function addPhoneNum(phoneSetID) {
	event.preventDefault();
	console.log("addPhoneNum called");
    $(phoneSetID).append("<input type='tel' name='phonelist'><br>");

       
};

function addAddress(addressSetID) {
	event.preventDefault();
	console.log("addAddress called");
	// add street, city, and state fields
	var addressFields = "<hr class='address'>" +
					"Street<br>" + 
					"<input type='text' name='streetlist'><br>" + 
					"City<br>" + 
					"<input type='text' name='citylist'><br>" +
					"State<br>" + 
					"<input type='text' name='statelist'><br>";
	$(addressSetID).append(addressFields);

};

function showContactBrief(contact) {
	// display clickable names only
	
		var html = "";
		html += "<li id='contact" + i + "'>" + contact.fname + " " + contact.lname + "</li>";
		$('.brieflist').append(html);

	};
	


function showContactDetail(contact) {
	console.log("showContactDetail called");
	// display clickable names only
	
	var html = "<h2>" + contact.fname + " " + contact.lname + "</h2>" + 
		"First name: " + contact.fname + "<br>Last name: " + contact.lname + "<br>";
	$('.contactDetail').append(html);

	var phones = "Phone Numbers: <ul class='phone-detail'>";
	for (p=0; p< contact.phonelist.length; p++) {
		phones += contact.phonelist[p].type + ": " + contact.phonelist[p].number + "</br>";
	};
	phones = "</ul>";
	$('.contactDetail').append(phones);

	var addrs = "Addresses: <ul class='addr-detail'>";
	for (a=0; a< contact.addresslist.length; a++) {
		addrs += contact.addresslist[a].street + ", " +
				 contact.addresslist[a].city + ", " +
				 contact.addresslist[a].state +" </br>";
	};
	addrs = "</ul>";
	$('.contactDetail').append(addrs);
	
};


$(document).ready(function(){

	console.log ('document ready');

	$('.addContactForm').submit( function(event){
   		event.preventDefault();
   		console.log ('adding contact');

   		var contact = Object.create(Contact);

   		var inputs=$(this)[0];
   		var params ={};
   		var key="";
   		var addr = Object.create(Address);

   		params['addresslist'] = [];
   		params['phonelist'] = [];

   		for (var i=0; i<inputs.length; i++) {
   			key=inputs[i].name;
   			if (key != "") {
	   			console.log (key);
				if (key.startsWith("street") ){
	   				addr['street'] = inputs[i].value;
	   			}
	   			else if (key.startsWith("city")) {
	   				addr['city'] = inputs[i].value;
   				}
   				else if (key.startsWith("state")) {
   					addr['state'] = inputs[i].value;
   					// this completes the info for this address, add to param list 
   					params['addresslist'].push(addr);
   				}
   				else if (key.startsWith("phone")) {
   					params['phonelist'].push(inputs[i].value);
   					}
   				else
 		   			params[key] = inputs[i].value;
	   		};
   		};
   		
   		console.log (params)
   		contact.addContact (params);
   		

   		/* trying a different tactic...
   		var addr=Object.create(Address);
   		var phone=Object.create(Phone);

  		for (var i=0; i<inputs.length; i++) {
   			key=inputs[i].name;
   			if (key != "") {
	   			console.log (key);
				if (key.startsWith("street") ){
	   				addr.street = inputs[i].value;
	   			}
	   			else if (key.startsWith("city")) {
	   				addr.city = inputs[i].value;
   				}
   				else if (key.startsWith("state")) {
   					addr.state = inputs[i].value;
   					// this completes the info for this address, add to param list 
   					(contact.addresslist).push(addr);
   				}
   				else if (key.startsWith("phone")) {
   					phone.number = inputs[i].value;
   					(contact.phonelist).push(phone);
   					}
   				else
 		   			contact[key] = inputs[i].value;
	   		};
   		};
   		*/

   		//contact.logThis();
   		contacts.push(contact);
   		showContactBrief(contact);

   		showContactDetail(contact);
   		
   		console.log (contact);



   	});
});
