setTimeout(
    // this version just isn't doing anything and idk why, no output, no errors
    () => {
        let componentsPromise = $.getJSON('msa-components-2018.json');
        let suppressedMsasPromise = $.getJSON('suppressed-msas-100k.json');

        $.when(componentsPromise, suppressedMsasPromise).then(
            function(componentsJson, suppressedCounties) {
                console.log('got both jsons');
                let max = 0;
                suppressedCounties.forEach( (suppressedMSA) => {
                    let msaName =  suppressedMSA['CBSA description'].split(' ').slice(0, -2).join(" "); // remove 'Metro/Micro Area'
                    console.log(msaName);

                    if (componentsJson[msaName].length > max) {
                        max = componentsJson[msaName].length;
                        msaNameMax = msaName;
                        msaVals = componentsJson[msaName];
                        console.log(msaNameMax, ": ", max);
                    }
                    break;
                });
                let msaCounties = [];
                msaVals.forEach((comp) => {
                    msaCounties.push(comp['County']['County Equivalent']);
                });
                console.log(`The max number of counties in a single msa is ${max} counties in ${msaNameMax}: ${msaCounties}`);

            }
        );
    },
2000);