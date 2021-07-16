// find MSA name mismatches between MSA components & suppressed MSAs
import * as suppressedMsasJson from './suppressed-msas-100k.js';
import * as msaComponentsJson from './msa-components-2018.js';

// document.body.appendChild(document.createElement("div"));
// document.body.innerHTML = JSON.stringify(msaComponentsJson);

// console.log('hello world!');
console.log(suppressedMsasJson);
console.log(msaComponentsJson);

// let mismatches = {};
let mismatches = [];
let componentsMsaNames = Object.keys(msaComponentsJson.msaComponents);
suppressedMsasJson.suppressedMsas.forEach((obj) => {
    let suppressedMsaNameRaw = obj['CBSA description'];
    let suppressedMsaName =  suppressedMsaNameRaw.split(' ').slice(0, -2).join(" "); // remove 'Metro/Micro Area'
    let foundMsa = componentsMsaNames.find((compsMsaName) => {
        return (suppressedMsaName === compsMsaName)
    });

    if (foundMsa === undefined) {
        mismatches.push(suppressedMsaName);
    }
});

// document.body.innerHTML = mismatches;
console.log(mismatches)
