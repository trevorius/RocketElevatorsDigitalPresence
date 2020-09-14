const express = require('express');
const app = express();

//middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: false})) //middleware to process request easier
app.use(express.static('../'))//allows .html to work locally 
app.use(morgan('short')) //combined or short options
app.use(cors())//enables all cors requests


// define the server PORT
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Listening on port " + port + " ...");
});

//testing endpoints
app.get("/", (req,res) => {
    console.log("Responding to root route")
    res.send('Hello from calculator app')
})



var floorsPerColumn = 20;
var type, appartements, stories, buisness, companies,basements, parking, occupants, cages, activity, columns, shafts, elevators, floors, elevatorsPerColumn, elevators;
//receives the post
app.post('/building-config', (req, res) => {
    	    //row1 variables
			 type = req.body.type;
			 appartements = parseInt(req.body.appartements);
			 buisness = parseInt(req.body.buisness);
			 companies = parseInt(req.body.companies);
			 stories = parseInt(req.body.floors);
			
			//row2 variables
			 basements = parseInt(req.body.basements);
			 parking = parseInt(req.body.parking);
			 occupants = parseInt(req.body.occupants);
			 cages = parseInt(req.body.cages);
			 activity = parseInt(req.body.activity);
			//row3 variables
			 columns = parseInt(req.body.columns);
			 shafts = parseInt(req.body.shafts);
             elevators = parseInt(req.body.elevators);
            console.log(cages);
			shafts = calcCom();
			calculator();
            console.log("testing ... shafts = " + shafts);
			//sends back
			res.status(200).send({ shafts: shafts, columns: columns, elevatorsPerColumn: elevatorsPerColumn, elevators: elevators });

    res.end();
});

function calcCom(){

return cages

};

function numberColumns(){
	columns = 1 + Math.floor(stories / floorsPerColumn);
};

var logVariables = function(){
	console.log("row1 : "+"type "+ type + ", apt " + appartements +", buisnesses "+ buisness + ', companies '+ companies + ', floors '+ floors);
	console.log( "row2 : "+" basements "+ basements + ", parking "+ parking + ", occupants " + occupants + ", cages "+ cages+ ", activity" + activity);
	console.log("row3 : "+"columns "+ columns + ", shafts/cages/elevators "+ shafts + ", temporary elevator value" + elevators);
	console.log("final form : "+ selectedLine+ ", total Material "+ totalMat + ", installation fee" + fee );
	console.log("TOTAL : " + ttl);

	};



function calculator(){
	floors = stories - basements;

	if (type === 'residential'){
		//display the appropriate fields : appartments, floors, basements
		//$('.residential').show(500);
		resCalc();

	}else if(type === "corporate"){
		//display the appropriate fields : companies, floors, basements, parking, occupants

		//$('.corporate').show(500);
		corpHybCalc();
		
	}else if (type === "commercial"){
		//$('.commercial').show(500);
		//$('#columns-div').hide();
		comCalc();

	}else if(type === "hybrid"){
		//$('.hybrid').show(500);
		corpHybCalc();
	}else {
		return;
	}



};




//calculator for a residential building
function resCalc(){
	//parseVar();
	
	//calculate average doors per floor (appartements/floors) 
	var avgDoors = Math.ceil(appartements / floors);
	//calculate number of columns ( 1 + (floors/floorsPerColumn))
	numberColumns();
	//calculate number of shafts 1 for 6 appartments *columns
	shafts = Math.ceil(avgDoors / 6 ) * columns;
	
	//logVariables();
};

//calculator for corporate and hybrid buildings
var corpHybCalc = function(){
	//$("#elevators-per-column-div").remove();
	//$("#elevators-tmp-div").remove();
	//parseVar();
	
	//calculate total number of occupants ((floors+basements)*occupants)
	var totalOccupants = occupants * (floors+basements);
	//number of elevators (totalOccupants/1000)
	elevators = Math.ceil(totalOccupants / 1000); 
	
	//number of columns ((floors+basements)/FloorsPerColumn)
		 numberColumns();
	//number of elevators per column ([elevators|shafts]/columns)
	elevatorsPerColumn = Math.ceil(elevators / columns);
	
	/*
	//create a display field to show elevatorsPerColumn and number of elevators(temporary value)
	$('<div class="col-md-4 hidden" id="elevators-per-column-div" class="hidden">')
		.appendTo('#row3')
		.html(	'<label for="elevators-per-column" >number of elevators per column</label><input readonly id="elevators-per-column" type="number" value="" class="form-control">');
	$('#elevators-per-column').val(elevatorsPerColumn);

	$('<div class="col-md-4 hidden" id="elevators-tmp-div" class="hidden unwanted">')
		.appendTo('#row3')
		.html(	'<label for="elevators-tmp" >number of elevators</label><input readonly id="elevators-tmp" type="number" value="" class="form-control">');
	$('#elevators-tmp').val(elevators);
	*/

	//calculate total number of elevators (elevatorsPerColumn*columns)
	shafts = elevatorsPerColumn * columns;
	
	//change text of shaft label to display totalElevators
	//$("#shafts-label").text('total number of elevators');
	//logVariables();

};

//commercial calculator function
var comCalc = function(){
	//parseVar();
	//display number of cages in shaft field and keep column field hidden
	shafts = cages ;
	
	
	//$('#columns-div').hide();
	
	
	//logVariables();

};
