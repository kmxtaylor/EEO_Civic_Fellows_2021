// find MSA name mismatches between MSA components & suppressed MSAs
import * as suppressedMsasJson from './suppressed-msas-100k.js';
import * as msaComponentsJson from './msa-components-2018.js';

// console.log('hello world!');
// console.log(suppressedMsasJson);
// console.log(msaComponentsJson);

let mismatches = [];
let componentsMsaNames = Object.keys(msaComponentsJson.msaComponents);
suppressedMsasJson.suppressedMsas.forEach((obj) => {
    let suppressedMsaNameRaw = obj['CBSA description'];
    let suppressedMsaName =  suppressedMsaNameRaw.split(' ').slice(0, -2).join(" "); // remove 'Metro/Micro Area'
    let foundMsa = componentsMsaNames.find((compsMsaName) => {
        return (suppressedMsaName === compsMsaName)
    });

    if (foundMsa === undefined) {
        mismatches.push({
            "CBSA code": obj['CBSA code'],
            "CBSA description": suppressedMsaName
        });
    }
});

// document.body.innerHTML = mismatches;
console.log('mismatched msas:');
console.log(mismatches);
