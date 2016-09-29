/* an array of Contact objects */
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

/* a single contact object */
var Contact = {
	"contactId" : 0,
	"fname" : "",
	"lname": "",
	"phonelist": [],
	"addresslist": [],

	// this doesn't work - the lists are not added properly
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
		this.contactId = id;
	}
};


var phoneCount = 1;  /* display starts with one phone */
var addressCount = 1; /* display starts with one address */

/* create additional phone and address input fields on the page*/
function addPhoneField(event) {
	event.preventDefault();
	event.stopPropagation();

	phoneCount ++;
    $('#phonelist').append(
		"<div id='phone_" + phoneCount + "'>" +
			"<select name=ptype_" + phoneCount + ">" + 
	  			"<option value='mobile'>Mobile</option>" + 
	  			"<option value='work'>Work</option>" + 
			    "<option value='home'>Home</option>" + 
			    "<option value='other'>Other</option>" + 
			"</select> " +  
		  	"<input type='tel' name='phone_" + phoneCount + "'><br> </div>");
};

function addAddressField(event) {
	event.preventDefault();
	event.stopPropagation();

	addressCount++;
	// add street, city, and state fields
	var addressFields = "<div id='address_" + addressCount + "'> <hr>" +
					"Street<br>" + 
					"<input type='text' name='street_" + addressCount + "' size='40'><br>" + 
					"City<br>" + 
					"<input type='text' name='city_" + addressCount + "' size='40'><br>" +
					"State<br>" + 
					"<input type='text' name='state_" + addressCount + "' size='40'><br></div>";
	$('#addressSet').append(addressFields);

};

function resetContactFields() {

	// leave the first phone field and delete any others
	for (var i=1; i<phoneCount; i++) {
   		var phoneId = "#phone_" + (i+1);
   		$(phoneId).remove();
  	};

	// leave the first set of address fields and delete any others
	for (var i=1; i<addressCount; i++) {
   		var address = "#address_" + (i+1);
   		$(address).remove(); 
   	};

   	// reset the remaining form fields
   document.getElementById("addContactsForm").reset();
};

/* show "brief" view of contacts */
/* this will display contact names only in alphabetical order by last name */

function showContactsBrief() {
	// if there are contacts to show, remove the 'hidden' class from the header
	if (contacts.length > 0) {
		$('.contactHeader').removeClass("hidden");
	};

	// remove any existing data that is displayed
	$('ul.brieflist').empty();

	//sort array alphabetically (sorts the array in place)
	//soting the whole array each time an item is added would 
	// not be efficient for large arrays, but will suffice for here
	contacts.sort( function (a,b){
		var nameA = a.lname.toUpperCase(); // ignore case for sort purposes
  		var nameB = b.lname.toUpperCase(); 
		if (nameA < nameB) {
		  return -1;
		}
		if (nameA > nameB) {
		  return 1;
		}
		// names must be equal
		return 0;
	});

	// display each contact name which is click-able
	for (var i=0; i<contacts.length; i++) {
		var html = "";
		html += "<li id='contact_" + i+ 
		    "' onclick='showContactDetail(" + i + ")'>" + 
			contacts[i].fname + " " + contacts[i].lname + "</li>";
		$('.brieflist').append(html);
	};
};
	
/* show "full" view of a contact at the given contacts index*/
function showContactDetail(idx) {

	// remove any existing content
	$('.contactDetail').empty();

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

	if (contact.addresslist.length > 0) {
		var addrs = "Addresses: <ul class='addr-detail'>";
		for (var a=0; a<contact.addresslist.length; a++) {
			addrs += "<li>";
			if (contact.addresslist[a].street) {
				addrs += contact.addresslist[a].street + ", ";
			};
			if (contact.addresslist[a].city) {
				addrs += contact.addresslist[a].city + ", ";
			};
			if (contact.addresslist[a].state) {
				addrs += contact.addresslist[a].state;
			};
			addrs += " </li>";
		};
		addrs += "</ul>";
		$('.contactDetail').append(addrs);
	}
};

function addContact (event) {
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
	contact.contactId = contacts.length;  //this will be the index we are about to push onto the array
	contacts.push(contact);

  	showContactsBrief();

  	resetContactFields();

};

$(document).ready(function(){

	/* listen for events */
	$('button#addPhone').click(addPhoneField);
	$('button#addAddress').click(addAddressField);

	$('#addContactsForm').submit(addContact);

   		
});
