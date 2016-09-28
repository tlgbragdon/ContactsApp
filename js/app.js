var contacts = [];

var Phone = {
		"number" : "",
		"type" : "mobile"
};

var Address = {
	"street" : "",
	"city" : "",
	"state ": ""
};


var Contact = {
	"contactId" : 0,
	"fname" : "",
	"lname": "",
	"phonelist": [],
	"addresslist": [],

	"addContact" : function (fname, lname, phoneList, addrList, id) {
		// cont = Object.create(Contact);
		this.fname = fname;
		this.lname = lname;
		for (var p=0; p<phoneList.length; p++) {
			this.phonelist.push(phoneList[p]);
		}
		for (var a=0; a<addrList.length; a++) {
			this.addresslist.push(addrList[a]);
		}
		this.contactID = id;
	}
};


var phoneCount = 1;  /* display starts with one phone */
var addressCount = 1; /* display starts with one address */

/* create additional phone and address input fields on the page*/
function addPhoneField(phoneSetID) {
	event.preventDefault();
	console.log("addPhoneNum called");
	phoneCount ++;
    $(phoneSetID).append(

		"<select name=ptype_" + phoneCount + ">" + 
	  			"<option value='mobile'>Mobile</option>" + 
	  			"<option value='work'>Work</option>" + 
			    "<option value='home'>Home</option>" + 
			    "<option value='other'>Other</option>" + 
			"</select>	: " +  
		  	"<input type='tel' name='phone_" + phoneCount + "'><br>");
};

function addAddressField(addressSetID) {
	event.preventDefault();
	addressCount++;
	// add street, city, and state fields
	var addressFields = "<hr>" +
					"Street<br>" + 
					"<input type='text' name='street_" + addressCount + "'><br>" + 
					"City<br>" + 
					"<input type='text' name='city_" + addressCount + "'><br>" +
					"State<br>" + 
					"<input type='text' name='state_" + addressCount + "'><br>";
	$(addressSetID).append(addressFields);

};

/* show "brief" view of contacts */
function showContactsBrief() {
	// display clickable names only in alphabetical order by last name
	// if there are contacts to show, remove the 'hidden' class from the header
	if (contacts.length > 0) {
		$('.contactHeader').removeClass("hidden");
	};

	// remove any existing data that is displayed
	$('ul.brieflist').empty();

	//sort array alphabetically
	contactsSorted = contacts.sort( function (a,b){
		var nameA = a.lname.toUpperCase(); // ignore upper and lowercase
  		var nameB = b.lname.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
		  return -1;
		}
		if (nameA > nameB) {
		  return 1;
		}
		// names must be equal
		return 0;
	});

	for (var i=0; i<contactsSorted.length; i++) {
		var html = "";
		html += "<li id='contact_" + contactsSorted[i].ContactId + 
		    "' onclick='showContactDetail(" + contactsSorted[i].contactId + ")'>" + 
			contactsSorted[i].fname + " " + contactsSorted[i].lname + "</li>";
		$('.brieflist').append(html);
	};
};
	
/* show "full" view of contact with the given contacts index*/
function showContactDetail(idx) {
	event.preventDefault();

	var contact = contacts[idx];	
	var html = "<h2>" + contact.fname + " " + contact.lname + "</h2>" + 
		"First name: " + contact.fname + "<br>Last name: " + contact.lname + "<br>";
	$('.contactDetail').append(html);

	var phones = "Phone Numbers: <ul class='phone-detail'>";
	for (var p=0; p< contact.phonelist.length; p++) {
		phones += "<li>" + contact.phonelist[p].type + 
		": " + contact.phonelist[p].number + "</li>";
	};
	phones += "</ul>";
	$('.contactDetail').append(phones);

	var addrs = "Addresses: <ul class='addr-detail'>";
	for (var a=0; a< contact.addresslist.length; a++) {
		addrs += "<li>" + contact.addresslist[a].street + ", " +
				 contact.addresslist[a].city + ", " +
				 contact.addresslist[a].state +" </li>";
	};
	addrs += "</ul>";
	$('.contactDetail').append(addrs);
};


$(document).ready(function(){

	$('#addContactsForm').submit( function(event){
   		event.preventDefault();
   		
		var fname = "";
   		var lname = "";
   		var addressList = [];
   		var phoneList = [];

  		if (addContactsForm.fname.value) {
   			fname = addContactsForm.fname.value;
	   	};
	   	if (addContactsForm.lname.value) {
   			lname = addContactsForm.lname.value;
	   	};

	   	for (var i=0; i<phoneCount; i++) {
	   		var numfield = "phone_" + (i+1);
	   		var typefield = "ptype_" + (i+1);
	   		var phone = Object.create(Phone);
   			phone.number = addContactsForm[numfield].value;
   			phone.type = addContactsForm[typefield].value;
   			phoneList.push(phone);
	   	};

		for (var i=0; i<addressCount; i++) {
	   		var streetfield = "street_" + (i+1);
	   		var cityfield = "city_" + (i+1);
	   		var statefield = "state_" + (i+1);
	   		var addr = Object.create(Address);
   			addr.street = addContactsForm[streetfield].value;
   			addr.city = addContactsForm[cityfield].value;
   		   	addr.state = addContactsForm[statefield].value;
			addressList.push(addr);
	   	};


   		var contact = Object.create(Contact);
   		//contact.addContact (fname, lname, phoneList, addressList);

   		contact.fname = fname;
   		contact.lname = lname;
   		contact.phonelist = phoneList;
   		contact.addresslist = addressList;
		contacts.push(contact);

  		showContactsBrief();
   		
   		
   	});
});
