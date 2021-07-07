let userSelection = '10380';

let countyEquivs = $.getJSON('msa-components-2018.json', function(json) {
    console.log(json);
    let componentsArr = json.userSelection;
    let msaName = componentsArr[0]['CBSA Title'];
    let countyEquivArr;
    componentsArr.forEach((comp) => {
        countyEquivArr.append(comp['County']['County Equivalent']);
    });
    console.log('The components in', msaName, 'are', countyEquivArr);
    return countyEquivArr;
});