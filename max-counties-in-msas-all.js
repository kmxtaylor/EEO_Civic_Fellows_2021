setTimeout(
    () => {
        $.getJSON('msa-components-2018.json', function(json) {
            let max = 0;
            let msaWithMax = null;
            for (let msa in json) {
                if (json[msa].length > max) {
                    max = json[msa].length;
                    msaName = msa;
                    msaVals = json[msa];
                    console.log(msaName, ": ", max);
                }
                // break;
            }
            let msaCounties = [];
            msaVals.forEach((comp) => {
                msaCounties.push(comp['County']['County Equivalent']);
            });
            console.log(`The max number of counties in a single msa is ${max} counties in ${msaName}: ${msaCounties}`);
        });
    },
2000);