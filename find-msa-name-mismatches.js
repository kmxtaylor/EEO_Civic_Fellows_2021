// find MSA name mismatches between MSA components & suppressed MSAs
import * as suppressedMsasJson from './suppressed-msas-100k.js';
import * as msaComponentsJson from './msa-components-2018.js';
import * as msaCodesAndTitles from './msa-codes-and-titles.js';

// console.log('hello world!');
// console.log(suppressedMsasJson);
// console.log(msaComponentsJson);

let mismatches = [];
let msaComponentsData = msaComponentsJson.msaComponents;
let componentsMsaNames = Object.keys(msaComponentsData);
suppressedMsasJson.suppressedMsas.forEach((obj) => {
    let msaCode = obj['CBSA code'];
    let suppressedMsaNameRaw = obj['CBSA description'];
    let suppressedMsaName =  suppressedMsaNameRaw.split(' ').slice(0, -2).join(" "); // remove 'Metro/Micro Area'

    // search through components file's msa names to try and find msa name from suppressed msas file
    let foundMsa = componentsMsaNames.find((compsMsaName) => {
        return (suppressedMsaName === compsMsaName)
    });

    if (foundMsa === undefined) {

        // go through msa components file & find msa name that matches the given cbsa code
        let componentsFileMsaName =  msaCodesAndTitles.data[msaCode][0]['CBSA Title'];

        // push to mismatches array
        mismatches.push({
            "MSA code": msaCode,
            "(Suppressed CBSA file) MSA description": suppressedMsaName,
            "(CBSA components file) MSA name": componentsFileMsaName
        });
    }
});

// document.body.innerHTML = mismatches;
console.log('mismatched msas:');
console.log(mismatches);
