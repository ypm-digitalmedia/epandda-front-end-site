function getPhyloPics(){var a=0,o=12;$.get("http://phylopic.org/api/a/image/count",function(e){a=e.result;var r=_.random(0,a-o);$.get("http://phylopic.org/api/a/image/list/"+r+"/"+o+"?options=uid+pngFiles+svgFile",function(a){var o=[];a.result.forEach(function(a){var e=a.pngFiles[0].url;o.push(e),$("#phylopics").append("<div class='col-4 col-3-s col-1-l col-2-m'><div class='phylo'><img src='http://phylopic.org"+e+"' /></div></div>").hide().fadeIn()})})})}function getApiStatus(){var a="OK";$("#status_APIstatus").text(a).hide().fadeIn();var o=moment(new Date).format("M/D/YYYY @ hh:MM a");$("#status_date").text(o).hide().fadeIn();var e={useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""},r=new CountUp("status_numRecords",0,numRecordsAll,0,1.5,e);r.start()}function demoQuery(){var a=["Paleozoic","Mesozoic","Cenozoic","Cambrian","Ordovician","Silurian","Devonian","Carboniferous","Permian","Triassic","Jurassic","Cretaceous","Paleogene","Holocene"],o=["Acanthocephala","Annelida","Arthropoda","Brachiopoda","Bryozoa","Chaetognatha","Chordata","Cnidaria","Ctenophora","Cycliophora","Echinodermata","Entoprocta","Gastrotricha","Gnathostomulida","Hemichordata","Kinorhyncha","Loricifera","Micrognathozoa","Mollusca","Nematoda","Nematomorpha","Nemertea","Onychophora","Orthonectida","Phoronida","Placozoa","Platyhelminthes","Porifera","Priapulida","Rhombozoa","Rotifera","Sipuncula","Tardigrada","Xenacoelomorpha"],e=_.sample(o),r=_.sample(a);$("#nowSearching_type").text(e),$("#nowSearching_era").text(r);var t=_.random(1,numRecordsAll),i={useEasing:!0,useGrouping:!0,separator:",",decimal:".",prefix:"",suffix:""},n=3.5,c=new CountUp("nowSearching_count",0,t,0,n,i);c.start();var s=new FlipWords("nowSearching_type",o,e,n);s.start();var h=new FlipWords("nowSearching_era",a,r,n);h.start()}var page="home",numRecordsAll=10865713;$(document).ready(function(){"home"==page&&(getPhyloPics(),getApiStatus(),demoQuery())});