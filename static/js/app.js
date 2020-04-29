function init() {
  // Getting the dropdown for all the names numbers 
  d3.json("samples.json").then(importedData => {
    //console log it 
    console.log (importedData);
    var MainValues = importedData.names;

    var selectData = d3.select("#selDataset");

    MainValues.forEach(value => {
      selectData
        .append("option")
        .text(value)
        .attr("value", function() {
          return value;
        });
    });
  });
}

//calling the function for the dropdown to fill with values 
init();


// Creating the Bubble Chart 
d3.json("samples.json").then(function(importedData1) {   
   

  var xbub = importedData1.samples[0].otu_ids;
  var ybub = importedData1.samples[0].sample_values;
  var bubsize = importedData1.samples[0].sample_values;
  var bubcolor = importedData1.samples[0].otu_ids;
  var bublab = importedData1.samples[0].otu_labels;
  
  var trace1 ={
    x: xbub,
    y: ybub,
    text:bublab,
    mode:'markers',
    marker:{
      color:bubcolor,
      size:bubsize,
      colorscale:"Rainbow" 
    }
  };
  var bubbletrace= [trace1];
  
  var bubblelayout = {
    xaxis:{title: "OTU ID"},
    height: 600,
     width: 1000,
  };
  
  Plotly.newPlot('bubble', bubbletrace, bubblelayout);
});

// Creatung the Bar Chart
d3.json("samples.json").then(function(importedData2) {   

  var barsamples = (importedData2.samples[0].sample_values.slice(0,10)).reverse();
  var barlabels = importedData2.samples[0].otu_labels.slice(0,10);
  var topvalues = (importedData2.samples[0].otu_ids.slice(0, 10)).reverse();
  var OTUids = topvalues.map(d => "OTU " + d);

  var trace2 ={
    x: barsamples,
    y: OTUids,
    text:barlabels,
    marker:{
      color: "blue"
    },
    type: "bar",
    orientation: "h"
  };
  var bardata= [trace2];
  
  var barlayout = {
    margin: {
        l: 80,
        r: 80,
        t: 80,
        b: 50
    }
};
  
  Plotly.newPlot('bar', bardata, barlayout);
});



// Creating the Metadata chart
function MetadataChart (show) {
      d3.json("samples.json").then((importedData3)=> {

          var metadataInfo = importedData3.metadata;
          //console.log to see if it exists and in fact does 
          console.log(metadataInfo)
  
        // filter meta data info by id
         var result = metadataInfo.filter(meta => meta.id.toString() === show)[0];
        // select demographic panel to put data
         var demographicInfo = d3.select("#sample-metadata");
          
       // empty the demographic info panel each time before getting new id info
         demographicInfo.html("");
  
       // grab the necessary demographic data data for the id and append the info to the panel
          Object.entries(result).forEach((key) => {   
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }

  // Executing the changeevent on the dropdown of ID
  function optionChanged (show) {
    MetadataChart(show);
  }

  // Creating function
function Lezie () {
  var dropdown = d3.select("#selDataset");

  d3.json("samples.json").then((data)=> {
      // Checking to see data and its there
      console.log(data)
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });
        MetadataChart(data.names[0]);
    });
}

//Calling function for the dropdown to change and update info
Lezie();