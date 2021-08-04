
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Katie Taylor">
  <!-- <meta name="description" content=""> -->
  <!-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.css"> -->
  <!-- <link rel="icon" type="" href=""> -->
  <title>High Charts Test</title>

  <!-- <script src="https://code.highcharts.com/highcharts.js"></script> -->
  <script src="https://code.highcharts.com/maps/highmaps.js"></script>
  <script src="https://code.highcharts.com/mapdata/countries/us/us-all.js"></script>
  <script src="https://code.highcharts.com/mapdata/countries/us/us-all-all.js"></script>
  <script src="https://code.highcharts.com/mapdata/custom/world.js"></script>
  <script src="https://code.highcharts.com/maps/modules/data.js"></script>
  <script src="https://code.highcharts.com/maps/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/maps/modules/offline-exporting.js"></script>

  <link rel="stylesheet" type="text/css" href="//github.com/downloads/lafeber/world-flags-sprite/flags32.css" />

</head>
<body>

  <style>
    .container {
      width: 100%;
    }


    * {
        font-family: sans-serif;
    }
    #wrapper {
        height: 500px;
        width: 1000px;
        margin: 0 auto;
        padding: 0;
        overflow:visible;
    }
    #container {
        float: left;
        height: 500px; 
        width: 700px; 
        margin: 0;
    }
    #info {
        float: left;
        width: 270px;
        padding-left: 20px;
        margin: 100px 0 0 0;
        border-left: 1px solid silver;
    }
    #info h2 {
        display: inline;
        font-size: 13pt;
    }
    #info .f32 .flag {
        vertical-align: bottom !important;
    }

    #info h4 {
        margin: 1em 0 0 0;
    }

    @media screen and (max-width: 920px) {
        #wrapper, #container,  #info {
            float: none;
            width: 100%;
            height: auto;
            margin: 0.5em 0;
            padding: 0;
            border: none;
        }
    }
  </style>


  <h2>Chart #1: Simple bar graph from Peggy</h2>
  <div id="highChartsContainer1" class="container"></div>

  <h2>Chart #2: Simple line graph from Peggy</h2>
  <div id="highChartsContainer2" class="container"> </div>

  <h2>Chart #3: Simple bar graph w/ 2 series</h2>
  <div id="highChartsContainer3" class="container"> </div>

  <h2>Chart #4: Map with color axis & data labels</h2>
  <div id="highChartsContainer4" class="container"> </div>

  <h2>Chart #5: GeoJSON-generated map</h2>
  <div id="highChartsContainer5" class="container"> </div>

  <h2>Chart #6: Detailed map of US counties using geojson</h2>
  <div id="highChartsContainer6" class="container"> </div>

  <h2>Chart #6.5: Detailed map of US counties using geojson w/o state lines</h2>
  <div id="highChartsContainer6.5" class="container"> </div>

  <h2>Chart #7: Map displays info on-click in separate chart</h2>
  <div id="highChartsContainer7" class="container"> </div>
  <div id="info">
    <span class="f32"><span id="flag"></span></span>
    <h2></h2>
    <div class="subheader">Click countries to view history</div>
    <div id="country-chart"></div>
  </div>

  <script>
  document.addEventListener('DOMContentLoaded', function () {

    // Chart #1: Simple bar graph from Peggy
    var lang_arr = [23, 34, 34, 56]
    Highcharts.chart('highChartsContainer1', {
            chart: {
                type: 'bar',
          marginRight: 30
            },
            title: {
        text: 'Languages Spoken at Home'
      },
         legend: {
            enabled: false
        },
        
            tooltip: {
          enabled:false,
            pointFormat: '<b>{point.name} {point.y:.1f}%</b>',
          
         
        },
        
        
        credits: {
          enabled: false
        },
        
        
            xAxis: {
          tickWidth: 0,
                categories: ["Spanish","Other Indo-European languages","Asian and Pacific Islander languages","Other languages"],
        
        },
        yAxis: {
            title: {
                text: 'Percent',
        
            }
        },
        plotOptions: {
            series: {
                color: '#0095A8',
          dataLabels: {
                    enabled: true,
            format: '{y:.1f}%',
            color: '#808B96',
            crop: false,
                    overflow: 'allow'
                }
            }
        },
        
      
            series: [{
         
                data: lang_arr
            }]
        });
    
          
    // Chart #2: Simple line graph from Peggy
    Highcharts.chart('highChartsContainer2', {
    
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016'
      },
    
      subtitle: {
        text: 'Source: thesolarfoundation.com'
      },
    
      yAxis: {
        title: {
          text: 'Number of Employees'
        }
      },
    
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },
    
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
    
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },
    
      series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }],
    
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    
    });

    // Chart #3: Simple bar graph w/ 2 series
      const chart = Highcharts.chart('highChartsContainer3', {
          chart: {
              type: 'bar'
          },
          title: {
              text: 'Fruit Consumption'
          },
          xAxis: {
              categories: ['Apples', 'Bananas', 'Oranges']
          },
          yAxis: {
              title: {
                  text: 'Fruit eaten'
              }
          },
          series: [{
              name: 'Jane',
              data: [1, 0, 4]
          }, {
              name: 'John',
              data: [5, 7, 3]
          }]
      });
    });
    
    // Chart #4: Map with color axis & data labels
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json', function (data) {

      // Make codes uppercase to match the map data
      data.forEach(function (p) {
          p.code = p.code.toUpperCase();
      });

      // Instantiate the map
      Highcharts.mapChart('highChartsContainer4', {

          chart: {
              map: 'countries/us/us-all',
              borderWidth: 1
          },

          title: {
              text: 'US population density (/km²)'
          },

          exporting: {
              sourceWidth: 600,
              sourceHeight: 500
          },

          legend: {
              layout: 'horizontal',
              borderWidth: 0,
              backgroundColor: 'rgba(255,255,255,0.85)',
              floating: true,
              verticalAlign: 'top',
              y: 25
          },

          mapNavigation: {
              enabled: true
          },

          colorAxis: {
              min: 1,
              type: 'logarithmic',
              minColor: '#EEEEFF',
              maxColor: '#000022',
              stops: [
                  [0, '#EFEFFF'],
                  [0.67, '#4444FF'],
                  [1, '#000022']
              ]
          },

          series: [{
              animation: {
                  duration: 1000
              },
              data: data,
              joinBy: ['postal-code', 'code'],
              dataLabels: {
                  enabled: true,
                  color: '#FFFFFF',
                  format: '{point.code}'
              },
              name: 'Population density',
              tooltip: {
                  pointFormat: '{point.code}: {point.value}/km²'
              }
          }]
      });
    });


    // Chart #5: GeoJSON-generated map

    // Prepare random data
    var data = [
        ['DE.SH', 728],
        ['DE.BE', 710],
        ['DE.MV', 963],
        ['DE.HB', 541],
        ['DE.HH', 622],
        ['DE.RP', 866],
        ['DE.SL', 398],
        ['DE.BY', 785],
        ['DE.SN', 223],
        ['DE.ST', 605],
        ['DE.NW', 237],
        ['DE.BW', 157],
        ['DE.HE', 134],
        ['DE.NI', 136],
        ['DE.TH', 704],
        ['DE.', 361]
    ];

    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/germany.geo.json', function (geojson) {

        // Initiate the chart
        Highcharts.mapChart('highChartsContainer5', {
            chart: {
                map: geojson
            },

            title: {
                text: 'GeoJSON in Highmaps'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                tickPixelInterval: 100
            },

            series: [{
                data: data,
                keys: ['code_hasc', 'value'],
                joinBy: 'code_hasc',
                name: 'Random data',
                states: {
                    hover: {
                        color: '#a4edba'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.postal}'
                }
            }]
        });
    });


    // Chart #6: Detailed map of US counties using geojson
    Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@c116b6fa6948448/samples/data/us-counties-unemployment.json',
    // './test-data.json', // February '18 unemployment data from BLS https://www.bls.gov/lau/laucntycur14.txt
    function (data) {

        /**
         * Data parsed from http://www.bls.gov/lau/#tables
         *
         * 1. Go to http://www.bls.gov/lau/laucntycur14.txt (or similar, updated
         *    datasets)
         * 2. In the Chrome Developer tools console, run this code:
         *    copy(JSON.stringify(document.body.innerHTML.split('\n').filter(function (s) { return s.indexOf('<PUT DATE HERE IN FORMAT e.g. Feb-14>') !== -1; }).map(function (row) { row = row.split('|'); return { code: 'us-' + row[3].trim().slice(-2).toLowerCase() + '-' + row[2].trim(), name: row[3].trim(), value: parseFloat(row[8]) }; })))
         * 3. The data is now on your clipboard, paste it below
         * 4. Verify that the length of the data is reasonable, about 3300
         *    counties.
         */

        var countiesMap = Highcharts.geojson(
                Highcharts.maps['countries/us/us-all-all']
            ),
            // Extract the line paths from the GeoJSON
            lines = Highcharts.geojson(
                Highcharts.maps['countries/us/us-all-all'], 'mapline'
            ),
            // Filter out the state borders and separator lines, we want these
            // in separate series
            borderLines = lines.filter(
                l => l.properties['hc-group'] === '__border_lines__'
            ),
            separatorLines = lines.filter(
                l => l.properties['hc-group'] === '__separator_lines__'
            );

        // Add state acronym for tooltip
        countiesMap.forEach(function (mapPoint) {
            mapPoint.name = mapPoint.name + ', ' +
                mapPoint.properties['hc-key'].substr(3, 2);
        });

        document.getElementById('highChartsContainer6').innerHTML = 'Rendering map...';

        // Create the map
        setTimeout(function () { // Otherwise innerHTML doesn't update
            Highcharts.mapChart('highChartsContainer6', {
                chart: {
                    borderWidth: 1,
                    marginRight: 20 // for the legend
                },

                title: {
                    text: 'US Counties unemployment rates, Feb 2018'
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    floating: true,
                    backgroundColor: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.backgroundColor
                    ) || 'rgba(255, 255, 255, 0.85)'
                },

                mapNavigation: {
                    enabled: true
                },

                colorAxis: {
                    min: 0,
                    max: 25,
                    tickInterval: 5,
                    stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
                    labels: {
                        format: '{value}%'
                    }
                },

                plotOptions: {
                    mapline: {
                        showInLegend: false,
                        enableMouseTracking: false
                    }
                },

                series: [{
                    mapData: countiesMap,
                    data: data,
                    joinBy: ['hc-key', 'code'],
                    name: 'Unemployment rate',
                    tooltip: {
                        valueSuffix: '%'
                    },
                    borderWidth: 0.5,
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    shadow: false
                    }, {
                        type: 'mapline',
                        name: 'State borders',
                        data: borderLines,
                        color: 'white',
                        shadow: false
                    }, {
                        type: 'mapline',
                        name: 'Separator',
                        data: separatorLines,
                        color: 'gray',
                        shadow: false
                    }]
                });
            }, 0);
        }
    );


        // Chart #6.5: Detailed map of US counties using geojson w/o state lines
        Highcharts.getJSON(
    'https://cdn.jsdelivr.net/gh/highcharts/highcharts@c116b6fa6948448/samples/data/us-counties-unemployment.json',
    function (data) {

        /**
         * Data parsed from http://www.bls.gov/lau/#tables
         *
         * 1. Go to http://www.bls.gov/lau/laucntycur14.txt (or similar, updated
         *    datasets)
         * 2. In the Chrome Developer tools console, run this code:
         *    copy(JSON.stringify(document.body.innerHTML.split('\n').filter(function (s) { return s.indexOf('<PUT DATE HERE IN FORMAT e.g. Feb-14>') !== -1; }).map(function (row) { row = row.split('|'); return { code: 'us-' + row[3].trim().slice(-2).toLowerCase() + '-' + row[2].trim(), name: row[3].trim(), value: parseFloat(row[8]) }; })))
         * 3. The data is now on your clipboard, paste it below
         * 4. Verify that the length of the data is reasonable, about 3300
         *    counties.
         */

        var countiesMap = Highcharts.geojson(
                Highcharts.maps['countries/us/us-all-all']
            )
            // Extract the line paths from the GeoJSON
        //     lines = Highcharts.geojson(
        //         Highcharts.maps['countries/us/us-all-all'], 'mapline'
        //     ),
        //     // Filter out the state borders and separator lines, we want these
        //     // in separate series
        //     borderLines = lines.filter(
        //         l => l.properties['hc-group'] === '__border_lines__'
        //     ),
        //     separatorLines = lines.filter(
        //         l => l.properties['hc-group'] === '__separator_lines__'
        //     );

        // // Add state acronym for tooltip
        // countiesMap.forEach(function (mapPoint) {
        //     mapPoint.name = mapPoint.name + ', ' +
        //         mapPoint.properties['hc-key'].substr(3, 2);
        // });

        document.getElementById('highChartsContainer6.5').innerHTML = 'Rendering map...';

        // Create the map
        setTimeout(function () { // Otherwise innerHTML doesn't update
            Highcharts.mapChart('highChartsContainer6.5', {
                chart: {
                    borderWidth: 1,
                    marginRight: 20 // for the legend
                },

                title: {
                    text: 'US Counties unemployment rates, January 2018'
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    floating: true,
                    backgroundColor: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.backgroundColor
                    ) || 'rgba(255, 255, 255, 0.85)'
                },

                mapNavigation: {
                    enabled: true
                },

                colorAxis: {
                    min: 0,
                    max: 25,
                    tickInterval: 5,
                    stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
                    labels: {
                        format: '{value}%'
                    }
                },

                plotOptions: {
                    mapline: {
                        showInLegend: false,
                        enableMouseTracking: false
                    }
                },

                series: [{
                    mapData: countiesMap,
                    data: data,
                    joinBy: ['hc-key', 'code'],
                    name: 'Unemployment rate',
                    tooltip: {
                        valueSuffix: '%'
                    },
                    borderWidth: 0.5,
                    states: {
                        hover: {
                            color: '#a4edba'
                        }
                    },
                    shadow: false
                    // }, {
                    //     type: 'mapline',
                    //     name: 'State borders',
                    //     data: borderLines,
                    //     color: 'white',
                    //     shadow: false
                    // }, {
                    //     type: 'mapline',
                    //     name: 'Separator',
                    //     data: separatorLines,
                    //     color: 'gray',
                    //     shadow: false
                    }]
                });
            }, 0);
        }
    );

    
    
    // Chart #7: Map displays info on-click in separate chart
    Highcharts.ajax({
    url: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-history.csv',
    dataType: 'csv',
    success: function (csv) {

        // Parse the CSV Data
        /*Highcharts.data({
            csv: data,
            switchRowsAndColumns: true,
            parsed: function () {
                console.log(this.columns);
            }
        });*/

        // Very simple and case-specific CSV string splitting
        function CSVtoArray(text) {
            return text.replace(/^"/, '')
                .replace(/",$/, '')
                .split('","');
        }

        csv = csv.split(/\n/);

        var countries = {},
            mapChart,
            countryChart,
            numRegex = /^[0-9\.]+$/,
            lastCommaRegex = /,\s$/,
            quoteRegex = /\"/g,
            categories = CSVtoArray(csv[2]).slice(4);

        // Parse the CSV into arrays, one array each country
        csv.slice(3).forEach(function (line) {
            var row = CSVtoArray(line),
                data = row.slice(4);

            data.forEach(function (val, i) {
                val = val.replace(quoteRegex, '');
                if (numRegex.test(val)) {
                    val = parseInt(val, 10);
                } else if (!val || lastCommaRegex.test(val)) {
                    val = null;
                }
                data[i] = val;
            });

            countries[row[1]] = {
                name: row[0],
                code3: row[1],
                data: data
            };
        });

        // For each country, use the latest value for current population
        var data = [];
        for (var code3 in countries) {
            if (Object.hasOwnProperty.call(countries, code3)) {
                var value = null,
                    year,
                    itemData = countries[code3].data,
                    i = itemData.length;

                while (i--) {
                    if (typeof itemData[i] === 'number') {
                        value = itemData[i];
                        year = categories[i];
                        break;
                    }
                }
                data.push({
                    name: countries[code3].name,
                    code3: code3,
                    value: value,
                    year: year
                });
            }
        }

        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
        mapData.forEach(function (country) {
            country.id = country.properties['hc-key']; // for Chart.get()
            country.flag = country.id.replace('UK', 'GB').toLowerCase();
        });

        // Wrap point.select to get to the total selected points
        Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

            proceed.apply(this, Array.prototype.slice.call(arguments, 1));

            var points = mapChart.getSelectedPoints();
            if (points.length) {
                if (points.length === 1) {
                    document.querySelector('#info #flag')
                        .className = 'flag ' + points[0].flag;
                    document.querySelector('#info h2').innerHTML = points[0].name;
                } else {
                    document.querySelector('#info #flag')
                        .className = 'flag';
                    document.querySelector('#info h2').innerHTML = 'Comparing countries';

                }
                document.querySelector('#info .subheader')
                    .innerHTML = '<h4>Historical population</h4><small><em>Shift + Click on map to compare countries</em></small>';

                if (!countryChart) {
                    countryChart = Highcharts.chart('country-chart', {
                        chart: {
                            height: 250,
                            spacingLeft: 0
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            tickPixelInterval: 50,
                            crosshair: true
                        },
                        yAxis: {
                            title: null,
                            opposite: true
                        },
                        tooltip: {
                            split: true
                        },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 500
                                },
                                marker: {
                                    enabled: false
                                },
                                threshold: 0,
                                pointStart: parseInt(categories[0], 10)
                            }
                        }
                    });
                }

                countryChart.series.slice(0).forEach(function (s) {
                    s.remove(false);
                });
                points.forEach(function (p) {
                    countryChart.addSeries({
                        name: p.name,
                        data: countries[p.code3].data,
                        type: points.length > 1 ? 'line' : 'area'
                    }, false);
                });
                countryChart.redraw();

                } else {
                    document.querySelector('#info #flag').className = '';
                    document.querySelector('#info h2').innerHTML = '';
                    document.querySelector('#info .subheader').innerHTML = '';
                    if (countryChart) {
                        countryChart = countryChart.destroy();
                    }
                }
            });

            // Initiate the map chart
            mapChart = Highcharts.mapChart('highChartsContainer7', {

                title: {
                    text: 'Population history by country'
                },

                subtitle: {
                    text: 'Source: <a href="http://data.worldbank.org/indicator/SP.POP.TOTL/countries/1W?display=default">The World Bank</a>'
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                colorAxis: {
                    type: 'logarithmic',
                    endOnTick: false,
                    startOnTick: false,
                    min: 50000
                },

                tooltip: {
                    footerFormat: '<span style="font-size: 10px">(Click for details)</span>'
                },

                series: [{
                    data: data,
                    mapData: mapData,
                    joinBy: ['iso-a3', 'code3'],
                    name: 'Current population',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    states: {
                        select: {
                            color: '#a4edba',
                            borderColor: 'black',
                            dashStyle: 'shortdot'
                        }
                    },
                    borderWidth: 0.5
                }]
            });

            // Pre-select a country
            mapChart.get('us').select();
        }
    });


    </script>
    
</body>
</html>
