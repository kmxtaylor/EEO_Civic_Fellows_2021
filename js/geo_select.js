/**
 * Configure geography and table selection on index.php page
 * Katie Taylor and Peggy Gill
 * 8/5/2021
 */

/** Accordion JS */
const acc = document.getElementsByClassName("accordionHeader");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
	this.classList.toggle("openPanel");
	let accordionContent = this.nextElementSibling;
	// console.log("accordionContent: ", accordionContent);
	if (accordionContent.style.display === "block") {
	  accordionContent.style.display = "none";
	  this.firstElementChild.classList.remove("o-angle-down-1");
	  this.firstElementChild.classList.add("o-angle-up-1");
	}
	else {
	  accordionContent.style.display = "block";
	  this.firstElementChild.classList.remove("o-angle-up-1");
	  this.firstElementChild.classList.add("o-angle-down-1");
	}
  }
						 );
}

// Accordion JS: close all & open all buttons
let closeAcc = document.getElementById("closeAccordions");
closeAcc.addEventListener("click", function() {
  const accContent = document.getElementsByClassName("accordionContent");
  for (var i = 0; i < accContent.length; i++) {
	accContent[i].style.display = "none";
	// console.log("hiding ", accContent[i]);
  }
}
						 );
let openAcc = document.getElementById("openAccordions");
openAcc.addEventListener("click", function() {
  const accContent = document.getElementsByClassName("accordionContent");
  for (var i = 0; i < accContent.length; i++) {
	accContent[i].style.display = "block";
	// console.log("showing ", accContent[i]);
  }
}
						);

function openEEOTable() {
  var hostname = window.location.origin
  var url = hostname + "/acs/www/data/eeo-data/eeo-tables-2018/tableview.php?";
  var fileType = eeo_filetype;
  if( (geo_RadioValue) === "nation") {
	url += 'geotype=nation&usVal=us' + "&filetype=" + fileType + "&geoName=United States";
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "state") {
	stVal = $("#firstLevelGeoList").val();
	url += "geotype=state&state="  + stVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "place") {
	plVal = $("#secondLevelGeoList").val();
	url += "geotype=place&place=" + plVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "county") {
	coVal = $("#secondLevelGeoList").val();
	url += "geotype=county&county=" + coVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "countyset") {
	cosetVal = $("#secondLevelGeoList").val();
	url += "geotype=countyset&countyset=" + cosetVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
  if( (geo_RadioValue) === "msa") {
	msaVal = $("[name='msaList']").val();
	url += "geotype=msa&msa=" + msaVal + "&filetype=" + fileType + "&geoName=" + geoString;
	window.open(url, "_blank");
	return;
  }
}
// openEEOTable
$("#get_EEO_data").click(function() {
  // assumes element with id='button'
  openEEOTable();
}
						);
// onclick get_EEO_data	
// var fileSubstr = eeo_filetype.substring(3,4);
//console.log(fileSubstr);
function loadStates(selobj, url, extra, geoSelection) {

    const noPlacesGroup1 = [
      "04000us30","04000us46","04000us50","04000us54","04000us56","04000us72"
    ]; // these states have no places for 1s and 3-6s
    const noPlacesGroup2 = [
      "04000us10","04000us23","04000us28","04000us30","04000us31","04000us35","04000us38","04000us46","04000us50","04000us54","04000us56","04000us72"
    ]; // these states have no places for 2s and likely 7-12s
    const wyomingCode = "04000us56"; // counties unavailable for tableset 2 (& maybe 7-12s)

  select = $(selobj).empty();
  $.getJSON(url, {}, function (data) {
    /** mismatch solution method 1: */
    data = data.sort(function alphabetizeStates(a, b) {
      a = a[1];
      b = b[1];
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log('data:');
    console.log(data);
    $.each(data, function (i, obj) {
      if (i != 0) {
        let optionVal = obj[0];
        let optionText = obj[1];
        let newOption = $('<option></option>');
        //.attr('disabled', true).addClass('eeo_red').text(`${option} (no ${geoSelection} available)`)
        if (
            (optionVal === wyomingCode && isTableSet2 && geoSelection === 'counties') || // formerly #firstLevelGeoListAlt3
            (noPlacesGroup1.includes(optionVal) && geoSelection === 'places') || // formerly #firstLevelGeoListAlt2
            (noPlacesGroup2.includes(optionVal) && isTableSet2 && geoSelection === 'places') // formerly #firstLevelGeoListAlt
        ) {
            optionText = optionText + ` (no ${geoSelection} available)`;
            $(newOption).attr('disabled', true).addClass('eeo_red');
            // console.log(`adding new DISABLED option for ${optionText} (${optionVal}):`);
        } else {
            // console.log(`adding new enabled option for ${optionText} (${optionVal})`);
        }
        $(newOption).val(optionVal).html(optionText);
        select.append(newOption);
      }
    });
    
    $('#firstLevelGeoList :nth-child(1)').before("<option selected>Select a State" + extra +"</option>");
  });
  $.fn.dropdownCh();
}
// loadStates		 
function loadPlace(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj)  {
	  if(obj[0].substring(7,9) === stValsubstr) {
		$("#secondLevelGeoList").slideDown();
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	{
	  $('#secondLevelGeoList :nth-child(1)').before("<option selected>Select a Place</option>");
	}
  }
		   );
}
// loadPlace
function loadCounty(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj) {
	  if(obj[0].substring(7,9) === stValsubstr) {
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	$('#secondLevelGeoList :nth-child(1)').before("<option selected>Select a County </option>");
  }
		   );
}
// loadCounty
function loadCountySet(selobj, url, stValsubstr) {
  select = $(selobj).empty();
  $.getJSON(url, {
  }
			, function (data) {
	$("#secondLevelGeoList").empty();
	$.each(data, function (i, obj) {
	  if(obj[0].substring(7,9) === stValsubstr) {
		select.append(
		  $('<option></option>').val(obj[0]).html(obj[1]));
	  }
	}
		  );
	$("#secondLevelGeoList").sortSelect();
	$('#secondLevelGeoList :nth-child(1)').before("<option selected>Select County Set (1R)</option>");
  }
		   );
}
// loadCountySet
async function loadMSA(msaListName, url) { // msaListName = str used to set up / select msa list (currently "msaList")
  /** Renew msaSelection contents (work around bootstrap-combobox repopulation bugs) */
  $('#msaSelection').empty();
  $('#msaSelection').append(
	`<select name="${msaListName}" id="${msaListName}" class="combobox input-large form-control form-inline" size="1"> </select>`
  );
  $(`#${msaListName}`).change(respondToFirstDD) // necessary to rebind function to new element

  /** Get suppressed MSAs (100k only for now) */
  let suppressedMsasFile = '';
  if (isTableSet2) { // edit when table sets 7+ added
    suppressedMsasFile = './geos/suppressed-msas-100k.json';
  } else {
    suppressedMsasFile = './geos/suppressed-msas-50k.json';
  }
  const suppressedMsasRaw = await $.ajax({
    url: suppressedMsasFile,
    dataType: 'json',
    error: function() { console.log(`cannot get data from ${suppressedMsasFile}`) }
  });
  
  let suppressedMsas = [];
  suppressedMsasRaw.forEach(function(msaObj, i) {
    suppressedMsas.push(['suppressed'+i, msaObj['CBSA description']]); // keyword 'suppressed' is geo selection trigger for suppression msg b/c it doesn't start w/ a num
  });

  /** Assemble list of all MSAs for this table's dropdown */
  select = $(`#${msaListName}`).empty();
  $.getJSON(url, {}, function (data) {

    // concat suppressed msas (100k) w/ available msas before alphabetizing
    data = data.concat(suppressedMsas);

    data = data.sort(function alphabetizeData(a, b) {
      a = a[1];
      b = b[1];
      if (a > b) {
        return 1;
      } else if (b > a) {
        return -1;
      } else {
        return 0;
      }
    });

    // console.log('data:');
    // console.log(data);
    $.each(data, function (i, obj) {
        let optionVal = obj[0];
        let optionText = obj[1];
        let newOption = $('<option></option>');
        $(newOption).val(optionVal).html(optionText);
        select.append(newOption);
    });
    
	$(`#${msaListName} :nth-child(1)`).before("<option value='' selected>Type/Select an MSA</option>"); // transforms into placeholder w/ no option initially selected
    // $('#msaList :nth-child(1)').before("<option selected>Select an MSA</option>");
	// if (!($('#viewMsaGeo .combobox-container').length)) { // if hasn't been converted to combobox already
		console.log('initing msa dropdown as combobox');
		$('.combobox').combobox({bsVersion:'3'}); // convert reg dropdown to combobox
	//}
  });
  $.fn.dropdownChMsa();
}
// loadMSA
$.fn.extend({
  sortSelect: function sortSelect() {
	var options = this.find("option"),
		arr = options.map(function (_, o) {
		  return {
			t: $(o).text(), v: o.value };
		}
						 ).get();
	arr.sort(function (o1, o2) {
	  // sort select
	  var t1 = o1.t.toLowerCase(),
		  t2 = o2.t.toLowerCase();
	  return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
	}
			);
	options.each(function (i, o) {
	  o.value = arr[i].v;
	  $(o).text(arr[i].t);
	}
				);
  }
}
		   );
// sortSelect
$.fn.extend({
  sortSelectI: function sortSelectI() {
	var options = this.find("option"),
		arr = options.map(function (_, o) {
		  return {
			t: $(o).text(), v: o.value };
		}
						 ).get();
	arr.sort(function (o1, o2) {
	  // sort select
	  var v1 = o1.v.toLowerCase(),
		  v2 = o2.v.toLowerCase();
	  return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
	}
			);
	options.each(function (i, o) {
	  o.value = arr[i].v;
	  $(o).text(arr[i].t);
	}
				);
  }
}
		   );
// sortSelectI
(function($) {
  $.fn.invisible = function() {
	return this.each(function() {
	  $(this).css("visibility", "hidden");
	}
					);
  };
  $.fn.visible = function() {
	return this.each(function() {
	  $(this).css("visibility", "visible");
	}
					);
  };
}
 (jQuery));
//$("#someElem").invisible();
//$("#someOther").visible();
var sumLevel = "";
var st_val = "";
var geoString = "";
var url_state = "/acs/www/data/eeo-data/eeo-tables-2018/geos/state.json";
$(document).ready(function(){
  var geoNation = "United States";
  $(".geo_selected").empty();
  $('input[type="radio"]').prop('checked', false);
  //$("[name='filegroup2018']").removeAttr("checked");
  //$("[name='geoSumLevel']".removeAttr("checked");
}
				 );
// document.ready
var eeo_filetype = "";
var eeo_filetypeL
$("input[name='filegroup2018']").change(function () { // on table selected
  eeo_filetypeL = $("input:radio[name='filegroup2018']:checked").attr('id');
  eeo_filetype = $("input:radio[name='filegroup2018']:checked").attr('value');
  if ((eeo_filetype === "all1r"))
  {
	$('#county_label').addClass('disabled');
	$('#countyset_label').removeClass('disabled');
	$('#county').attr("disabled", true);
	$('#countyset').attr("disabled", false);
  }
  if ((eeo_filetype !== "all1r"))
  {
	$('#county_label').removeClass('disabled');
	$('#countyset_label').addClass('disabled');
	$('#county').attr("disabled", false);
	$('#countyset').attr("disabled", true);
  }
  $("#viewSelectedFile").visible();
  console.log(eeo_filetype);
  $(".file_typeL").text(eeo_filetypeL).change();
  $(".geo_selected").empty();
  $("#Step2Geo").slideDown();
  $('#Step2Geo').removeClass('disabled');
}
									   );
var fileSubstr = eeo_filetype.substring(3,4);
console.log(fileSubstr);
$("#refreshTableSelect").click(function () { // on click: Change Table Selection
  $(".file_typeL").html('<span style="font-style: italic; color: grey; text-transform: lowercase;">pending new selection</span>'); // "Selected Table: pending new selection" displayed
  $("input[name='filegroup2018']").prop('checked',false);
  $('#tableSelectForm').removeClass('disabled');
  $('#Step2Geo').addClass('disabled');
  $("input[name='geoSumLevel']").prop('checked',false);
  $("#viewGeo").slideUp();
  $("#viewResults").slideUp();
  $(".geo_selected").empty();
  $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
//   $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
  $("#msaList, #firstLevelGeoList, #secondLevelGeoList").empty();
}
							  );
// Selected a summary Level Start
var geo_RadioValue = "";
// Keeping these variables globals a temporary fix for multiple functions below needing to use them
const numTableSets = 6 // could probably make this not a constant
let [
  isTableSet1,
  isTableSet2,
  isTableSet3,
  isTableSet4,
  isTableSet5,
  isTableSet6
] = Array(numTableSets).fill(false);
$("input[name='geoSumLevel']").change(function () {
	[
	  isTableSet1,
	  isTableSet2,
	  isTableSet3,
	  isTableSet4,
	  isTableSet5,
	  isTableSet6
	] = Array(numTableSets).fill(false); // reset in case table changed
  geo_RadioValue = $("input:radio[name='geoSumLevel']:checked").attr('id');
  $('#tableSelectForm').addClass('disabled');
  $('#refreshTableSelect').slideDown();
  $("#viewGeo").slideUp();
  $("#viewResults").slideUp();
  $(".geo_selected").empty();
  $("#secondLevelGeoList").empty();  //first level geo lists empty?

  $("#viewSecondLevelGeo").slideUp();
  if( (geo_RadioValue) === "nation" ) {
	$("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
	// $("#viewMsaGeo, #viewFirstLevelGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	$("#msaList, #firstLevelGeoList, #secondLevelGeoList").empty();
	var geoNation = "United States";
	$(".geo_selected").text(geoNation);
	$("#suppressionMsg").slideUp();
	$("#get_EEO_data").slideDown('slow');
	$("#viewGeo").slideDown();
	$("#viewResults").slideDown();
	console.log(geo_RadioValue);
	//console.log(geo_RadioID);
  }
  var url_state = "/acs/www/data/eeo-data/eeo-tables-2018/geos/state.json";
  if ( (geo_RadioValue) === "state" ) {
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	// $("#viewMsaGeo, #viewSecondLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	console.log("val" + geo_RadioValue);
	$(".sumLevel").text(" a State");
	loadStates('#firstLevelGeoList', url_state, "");
	$("#viewFirstLevelGeo").slideDown();
  }
  // determine which tableset eeo_filetype is part of
  // removes dedundancy & improves readability in subsequent code that relies on these booleans
  switch (eeo_filetype) {
	case 'all1w': 
	case 'all1r': 
	  isTableSet1 = true;
	  break;
	case 'all2w':
	case 'all2r':
	case 'cit2w':
	case 'cit2r':
	  isTableSet2 = true;
	  break;
	case 'all3w':
	case 'all3r':
	case 'cit3w':
	case 'cit3r':
	  isTableSet3 = true;
	  break;
	case 'all4w':
	case 'all4r':
	  isTableSet4 = true;
	  break;
	case 'all5w':
	case 'all5r':
	case 'cit5w':
	case 'cit5r':
	  isTableSet5 = true;
	  break;
	case 'all6w':
	case 'all6r':
	case 'cit6w':
	case 'cit6r':
	  isTableSet6 = true;
	  break;
  }
  // instead of isTableSet# vars for each table set, directly (not yet fully in-use):
  let tableSetNum = eeo_filetype.match(/\d+/).join(""); // get tableSetNum from table type
  console.log(`selected table set number ${tableSetNum}`); 
  let noPlacesGroup1 = [];
  let noPlacesGroup2 = [];
  let noCountiesGroup1 = [];
  let noCountiesGroup2 = [];
  if ( (geo_RadioValue) === "msa" ) {
	// $("#viewSecondLevelGeo, #viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	$("#viewFirstLevelGeo, #viewSecondLevelGeo").slideUp();
	loadMSA(
		'msaList', // msaListName, needs to be str, not id selector
		`/acs/www/data/eeo-data/eeo-tables-2018/geos/table${tableSetNum}/t${tableSetNum}_msa.json`, ""
	); // conditional condensing only applied here to avoid introducing bugs
	$("#viewMsaGeo").slideDown();
  }
  if ( (geo_RadioValue) === "place" ) {
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	$("#viewFirstLevelGeo").slideDown();
	loadStates('#firstLevelGeoListAlt2', url_state, " to begin", "places");
	// if (isTableSet1 || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6) { // no places for any tables
	//   loadStates('#firstLevelGeoListAlt2', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt2").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt3").slideUp();
	// }
	// else if (isTableSet2) { // no places for 2s
	//   loadStates('#firstLevelGeoListAlt', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	// }
  }
  if ( (geo_RadioValue) === "county" ) { // not all1r
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	$("#viewFirstLevelGeo").slideDown();
	loadStates('#firstLevelGeoList', url_state, " to begin", "counties");
	// if (eeo_filetype === "all1w" || isTableSet3 || isTableSet4 || isTableSet5 || isTableSet6) { // no counties for any tables
	//   loadStates('#firstLevelGeoList', url_state, " to begin");
	//   $("#viewFirstLevelGeo").slideDown();
	//   $("#viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
	// }
	// else if ( isTableSet2 ) { // no counties for 2s
	//   loadStates('#firstLevelGeoListAlt3', url_state, " to begin");
	//   $("#viewFirstLevelGeoAlt3").slideDown();
	//   $("#viewFirstLevelGeo, #viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2").slideUp();
	// }
  }
  if ( (geo_RadioValue) === "countyset" ) { // all1r only
	console.log("url?" + url_state);
	console.log("url?" + geo_RadioValue);
	$("#viewMsaGeo, #viewSecondLevelGeo").slideUp();
	loadStates('#firstLevelGeoList', url_state, " to begin");
	$("#viewFirstLevelGeo").slideDown();
	// $("#viewFirstLevelGeoAlt, #viewFirstLevelGeoAlt2, #viewFirstLevelGeoAlt3").slideUp();
  }
}
									 );
var stVal = "";
var stValsubstr = stVal.substring(7);
/** end selection of summary Level and showing drop down. */
function respondToFirstDD() { // gets reattached to msaList everytime it gets reset
  $(".geo_selected").empty();
  $("#secondLevelGeoList").empty();
  $("#viewResults").slideUp();
  $("#viewGeo").slideUp();
  $("#suppressionMsg").slideUp();
  $("#get_EEO_data").slideDown('slow'); // slight overlap w/ #viewGeo sliding up
  //console.log("what is stVal here" + stVal);
  //console.log("what is stVal here" + geo_RadioValue);
  //stValsubstr = stVal.substring(7);
  //console.log(stValsubstr);
  if ( (geo_RadioValue) === "place" ) {
	$(".sumLevel").text(" a Place");
	if ( isTableSet1 ){
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt2").val();
	  console.log("in places 1s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1_place.json", stVal.substring(7));
	}
	else if ( isTableSet2 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt").val();
	  console.log("in places 2s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_place.json", stVal.substring(7));
	}
	else if ( isTableSet3 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt2").val();
	  console.log("in places 3s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_place.json", stVal.substring(7));
	}
	else if ( isTableSet4 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt2").val();
	  console.log("in places 4s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_place.json", stVal.substring(7));
	}
	else if ( isTableSet5 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt2").val();
	  console.log("in places 5s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_place.json", stVal.substring(7));
	}
	else if ( isTableSet6 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt2").val();
	  console.log("in places 6s" + stVal);
	  loadPlace('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_place.json", stVal.substring(7));
	}
	$("#viewSecondLevelGeo").slideDown();
	$.fn.dropdownCh();
  }
  else if ( (geo_RadioValue) === "county" ) {
	$(".sumLevel").text(" a County");
	if (eeo_filetype === "all1w") {
	  stVal = $("#firstLevelGeoList").val();
	  console.log("in county 1s" + stVal);
	  var stValsubstr = stVal.substring(7);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1w_county.json", stValsubstr);
	}
	else if ( isTableSet2 ) {
	  stVal = $("#firstLevelGeoList").val();
	//   stVal = $("#firstLevelGeoListAlt3").val();
	  console.log("in county 2s" + stVal);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table2/t2_county.json", stVal.substring(7));
	}
	else if ( isTableSet3 ) {
	  stVal = $("#firstLevelGeoList").val();
	  console.log("in county 3s" + stVal);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table3/t3_county.json", stVal.substring(7));
	}
	else if ( isTableSet4 ) {
	  stVal = $("#firstLevelGeoList").val();
	  console.log("in county 4s" + stVal);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table4/t4_county.json", stVal.substring(7));
	}
	else if ( isTableSet5 ) {
	  stVal = $("#firstLevelGeoList").val();
	  console.log("in county 5s" + stVal);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table5/t5_county.json", stVal.substring(7));
	}
	else if ( isTableSet6 ) {
	  stVal = $("#firstLevelGeoList").val();
	  console.log("in county 6s" + stVal);
	  loadCounty('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table6/t6_county.json", stVal.substring(7));
	}
	$("#viewSecondLevelGeo").slideDown();
	$.fn.dropdownCh();
  }
  else if ( (geo_RadioValue) === "countyset" ) {
	$(".sumLevel").text(" a County Set");
	stVal = $("#firstLevelGeoList").val();
	var stValsubstr = stVal.substring(7);
	console.log("in county st" + stVal);
	console.log("in county sub" + stValsubstr);
	loadCountySet('#secondLevelGeoList', "/acs/www/data/eeo-data/eeo-tables-2018/geos/table1/t1r_countyset.json", stValsubstr);
	$("#viewSecondLevelGeo").slideDown();
	$.fn.dropdownCh();
  }
  else if ( geo_RadioValue === "msa" ) {
	 msaVal = $("[name='msaList']").val();
	// console.log('msa selected');
	if (isNaN(msaVal.charAt(0))) { // if msaVal doesn't start w/ a num (as all msa GEOIDs start w/ nums)
		console.log(`msa selected is suppressed`)
		// replace Get EEO Table button w/ msg about suppression
		$("#get_EEO_data").slideUp();
		$("#suppressionMsg").slideDown();
	}
  }
  else {
	  console.log('Error: no geo radio val selected');
  }
}
$("#firstLevelGeoList").change(respondToFirstDD);
// $("#firstLevelGeoList, #firstLevelGeoListAlt, #firstLevelGeoListAlt2, #firstLevelGeoListAlt3").change(respondToFirstDD);
// on change for file or sumlevel
var dd_str = "";

$.fn.dropdownCh = (function () {
  $("#secondLevelGeoList, #firstLevelGeoList").change(function(){
	$("#secondLevelGeoList option:selected, #firstLevelGeoList option:selected").each(function(){
	  $(".geo_selected").empty();
	  dd_str = $(this).text();
	  // console.log('geo selected: '+dd_str);
	  $(".geo_selected").text(dd_str).change();
	  $("#viewGeo").slideDown();
	  $("#viewResults").slideDown();
	  geoString = dd_str;
	})
  })
 });
 
 $.fn.dropdownChMsa = (function () { // separate from dropdownCh due to bugs
  $("#msaList").change(function(){
	  $(".geo_selected").empty();
	  dd_str = $('#msaList option:selected').text();
	  // console.log('geo selected: '+dd_str);
	  $(".geo_selected").text(dd_str).change();
	  $("#viewGeo").slideDown();
	  $("#viewResults").slideDown();
	  geoString = dd_str;
  });
 });
