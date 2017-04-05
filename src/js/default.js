var page = "home";
var numRecordsAll = 10865713;

$(document).ready(function() {


    if (page == "home") {
        getPhyloPics();
        getApiStatus();
        demoQuery();
    }






}); // end document ready













// ====================================================================
// ======================================== PhyloPics - Home page
// ====================================================================

function getPhyloPics() {
    var numImgs = 0;
    var max = 12;

    $.get("http://phylopic.org/api/a/image/count", function(num) {

        numImgs = num.result;

        var start = _.random(0, numImgs - max);

        $.get("http://phylopic.org/api/a/image/list/" + start + "/" + max + "?options=uid+pngFiles+svgFile", function(data) {
            var urls = [];

            data.result.forEach(function(i) {
                var url = i.pngFiles[0].url;
                urls.push(url);
                $("#phylopics").append("<div class='col-4 col-3-s col-1-l col-2-m'><div class='phylo'><img src='http://phylopic.org" + url + "' /></div></div>").hide().fadeIn();
            });

        });


    });
}

// ====================================================================
// ======================================== Get API status - Home page
// ====================================================================

function getApiStatus() {

    var status = "OK";
    $("#status_APIstatus").text(status).hide().fadeIn();

    var now = moment(new Date()).format("M/D/YYYY @ hh:MM a");
    $("#status_date").text(now).hide().fadeIn();

    // numRecordsAll = //get this value;
    var options = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };
    var numRecordsCount = new CountUp("status_numRecords", 0, numRecordsAll, 0, 1.5, options);
    numRecordsCount.start();
}

// ====================================================================
// ======================================== Demo query - Home page
// ====================================================================

function demoQuery() {

    var q_era = ["Paleozoic", "Mesozoic", "Cenozoic", "Cambrian", "Ordovician", "Silurian", "Devonian", "Carboniferous", "Permian", "Triassic", "Jurassic", "Cretaceous", "Paleogene", "Holocene"];

    var q_phyla = ["Acanthocephala", "Annelida", "Arthropoda", "Brachiopoda", "Bryozoa", "Chaetognatha", "Chordata", "Cnidaria", "Ctenophora", "Cycliophora", "Echinodermata", "Entoprocta", "Gastrotricha", "Gnathostomulida", "Hemichordata", "Kinorhyncha", "Loricifera", "Micrognathozoa", "Mollusca", "Nematoda", "Nematomorpha", "Nemertea", "Onychophora", "Orthonectida", "Phoronida", "Placozoa", "Platyhelminthes", "Porifera", "Priapulida", "Rhombozoa", "Rotifera", "Sipuncula", "Tardigrada", "Xenacoelomorpha"];

    var f_phyla = _.sample(q_phyla);
    var f_era = _.sample(q_era);

    $("#nowSearching_type").text(f_phyla);
    $("#nowSearching_era").text(f_era);

    var numRecords = _.random(1, numRecordsAll);

    var options_numrecords = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };

    var dur = 3.5;

    var numRecordsCount = new CountUp("nowSearching_count", 0, numRecords, 0, dur, options_numrecords);
    numRecordsCount.start();

    var searchType = new FlipWords("nowSearching_type", q_phyla, f_phyla, dur);
    searchType.start();

    var searchEra = new FlipWords("nowSearching_era", q_era, f_era, dur);
    searchEra.start();

    // $("#viewSampleButton").hide();
    // setTimeout(function() {
    //     $("#viewSampleButton").fadeIn();
    // }, dur * 1000);

}