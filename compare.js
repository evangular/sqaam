#!/usr/bin/node


//bring variables from mongodb: cost, length, width
//map-reduce to extract keys=values
//define function area as sum of length * width to get metres squared
//area(var length * var width), //eg 20 * 5 output 100
//console.log ("%\tmetres squared", area); //100 metres squared
//define function ppm as cost / area
//ppm(cost / area); //eg 200 / 100 = ppm
//console.log ("price per metre: %", ppm)

var MongoClient=require('mongodb').MongoClient,
	assert=require('assert');

// Connection URL 
var url='mongodb://localhost:27017/esme';
MongoClient.connect(url,function(err, db) {
    assert.equal(null,err);
    var orders=db.collection('order');
	orders.find({
			'attributes.width':{$exists: true},
			'attributes.length':{$exists: true},
			'cost':{$exists: true}
		}).toArray(function(err2,results){
		assert.equal(null,err2);
		console.log("found the following records");
		console.dir(results);
		for(var i=0; i<results.length; i++){
			
			results[i].sqm=(results[i].attributes.length*results[i].attributes.width)/(1000*1000);
			results[i].ppsqm=results[i].cost/results[i].sqm;

			console.log('r',results[i]._id,results[i].cost,results[i].attributes.length,results[i].attributes.width,results[i].sqm+'sqm',results[i].ppsqm+'GBP');
			orders.save(results[i]);
		}

	});
});

// var freeDom = compare(function)
// results.compare.freeDom
