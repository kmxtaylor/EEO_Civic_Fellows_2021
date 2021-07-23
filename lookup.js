/** JS for the Suppressed MSA Lookup Tool */

/** Populate MSA Lookup Dropdown */
async function populateLookupDropDown() {
    let lookupPromise = new Promise(function(res, rej) {
      let countyEquivs = $.getJSON('suppressed-msas-100k.json', function(json) {
        json.forEach( (obj) => {
          let msaCode = obj['CBSA code'];
          let msaName = obj['CBSA description'].trim();
          // console.log("trimmed: " + msaName);
          $("#msaCombo").append(
            "<option value='"+msaCode+"' class='option'>"+msaName+"</option>"
          );
        });
        $('.combobox').combobox({bsVersion:'3'});
        res("MSA Lookup Tool Drop Down Populated");
        // unsure what to return, will change later
      });
      // rej();
    });
    await lookupPromise;
  }
  
  $(document).ready(function() {
    populateLookupDropDown();
  });
  
  /** Display MSA Lookup Results */
  function displayLookupResults(components) {
    // console.log(components);

    if ($("#msaResultLine").css('display') === 'none') {
      // alert("sliding down msa results");
      $("#msaResultLine").slideDown();
    }
    $("#msaResultsList").empty();
    // $("#msaResultsList").append('<h4 style="margin-bottom: 20px;">Results:</h4>')

    if (components === undefined || components.length === 0) { // shouldn't matter w/ the dropdown, but here just in case
      $("#msaResultsList").append('<p>No results found for that match!</p>');
      //console.log(`No results found for ${}`);
      // $("#msaResultsList").append(`<p>No results found that match "${userSelection}"!</p>`);
    } else {
      // display resulting counties
      $("#msaResultsList").empty();

      /** display option 2 */
      components.forEach((comp) => {
      
        // check if comp is in list of suppressed counties
        let countyIsAvailable = true;
        $.getJSON('suppressed-counties.json', function(json) { // add error-handling when possible

        countyIsAvailable = json.every(countyObj => { return countyObj.NAME != comp; });

        }).always( function (data) { // chaining .always() maintains countyIsAvailable
          // console.log(`countyIsAvailable === ${countyIsAvailable}`);
          let compHtml;
          if (countyIsAvailable) {
            compHtml = $('<p class="singleResult">'+comp+'</p><hr>');
            $(compHtml).css({color: '#112e51'}); // navy blue
            // console.log("html: " + compHtml);
          } else {
            compHtml = $('<p class="singleResult">'+comp+' (suppressed)</p><hr>');
            $(compHtml).css({color: 'rgb(255, 112, 67)', 'font-style': 'italic'}); // orange, italic
          }
          $(compHtml).css({display: 'none'});

          $("#msaResultsList").append(compHtml);
          $(compHtml).slideDown();
          countyIsAvailable = true;
        });
      });
    }
    
  }

  async function fetchMSAComps(msaCode) {
    //process the json
    msaCode = msaCode.replace(" Metro Area", "");
    let msaPromise = new Promise(function(res, rej) {
      let countyEquivs = $.getJSON('msa-components.json', function(json) {
        // console.log(json);
        //filter to include only designated MSA 
        let componentsArr = json[msaCode] || null;
        // console.log(componentsArr);
        /** return all the county components */
        let countyEquivArr = [];
        if (componentsArr != null) {
          componentsArr.forEach((comp) => {
            let countyName = comp['County']['County Equivalent'];
            let stateName = comp['State Name'];
            countyEquivArr.push(`${countyName}, ${stateName}`);
          });
          // console.log('The components in msa #', msaCode, 'are', countyEquivArr);
        }
        else {
          alert("No matching MSAs found.");
          // unsure if this is the best way of handling this
        }
        res(countyEquivArr);
      }
                                  );
    }
                                );
    let resMSA = await msaPromise;
    displayLookupResults(resMSA);
  }
  $("#getMsaCompsBtn").click(function() {
    let msaCode = $('[name="msaCombo"]').val().trim();
    console.log("submitting: " + msaCode);
    if (msaCode != null && msaCode != '') {
      fetchMSAComps(msaCode);
    }
    else {
      alert("No option selected. Please select an option.");
    }
  }
                            );
  // onclick fetch MSA Comps