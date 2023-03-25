const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

var UTR_URL = "https://app.universaltennis.com";
var PLAYER_URL_PATH = "/api/v2/search/players";

var args = process.argv.slice(2);

if (args.length ==0 ){
  console.log("Usage: node index [CSV FILE]");
  console.log("Missing csv file path.");
  process.exit(1);
}

var path = args[0];

console.log("Reading " + path);

async function processCSV(file) {
  const results = [];
  fs.createReadStream(file)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    //console.log(results);
    var utrResults = [];
    var singlesTotal = 0;
    var doublesTotal = 0;
    console.log("Searching UTR players...");

    for (const info of results) {
      // ...use `element`...
      var player = info["PLAYER"];
      var splitString = player.split("�");
      if(splitString.length < 2){
        continue;
      }

      var name = splitString.join(' ');
      
      var url = UTR_URL + PLAYER_URL_PATH + "?query="+ encodeURIComponent(name) + "&results=1";
      var data = {};
      try {
        const response = await fetch(url);
        data = await response.json();
        var playerResult = {}

        var playerSource = data.hits[0].source
        if(playerSource.singlesUtr == 0){
          continue;
        }

        //console.log("Response: ", playerSource);
        playerResult["Name"] = playerSource.displayName;
        playerResult["Singles UTR"] = playerSource.singlesUtr;
        playerResult["3 Month Rating"] = playerSource.threeMonthRating;
        playerResult["Nationality"] = playerSource.nationality;
        playerResult["Doubles UTR"] = playerSource.doublesUtr;

        utrResults.push(playerResult);
        singlesTotal += playerSource.singlesUtr;
        doublesTotal += playerSource.doublesUtr;

      }catch(e){
        console.error(`Error geting UTR info for player ${name}`);
        console.error("UTR url: ", url);
      }
    }

    try{
      if (utrResults.length > 0){
        var headers = Object.keys(utrResults[0]);
        if (headers.length > 0) {
          console.log("\n\n")
          console.log(headers.join());
          for (const player of utrResults) {
            //console.log(player);
            var i = 0;
            var output = "";
            for (const key of headers){
              output += player[key];
              i++;
              if (i != headers.length){
                output += ",";
              }
            }
            console.log(output);
          }

          console.log("\n\n");
          console.log("Avg Singles UTR: ", singlesTotal / utrResults.length);
          console.log("Avg Doubles UTR: ", doublesTotal / utrResults.length);
        }else{
          console.error("Sorry no header data found.");
        }
      }else{
        console.error("Sorry no utr data found.");
      }
    }catch(e){
      console.error(e);
    }

  });
}

processCSV(path);