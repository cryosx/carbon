Template.charts.helpers({
    carbonChart: function() {
        var records = CarbonStats.find({userID: Meteor.userId(), year: 2015}).fetch();
        var record = records[0];

        var carDistanceTraveled = parseFloat(record.transportation.carDistanceTraveled);
        var fuelEfficiency = parseFloat(record.transportation.fuelEfficiency);
        var fuelType = record.transportation.fuelType;
        var railDistanceTraveled = parseFloat(record.transportation.railDistanceTraveled);
        var busDistanceTraveled = parseFloat(record.transportation.busDistanceTraveled);
        var airDistanceTraveled = parseFloat(record.transportation.airDistanceTraveled);
        var units = record.transportation.units;

        var carCarbon;
        var busCarbon;
        var railCarbon;
        var airCarbon;

        if (units === 'miles') {
            unitConversion = 1;
        }
        else if (units === "kilometers") {
            unitConversion = 1.60934;
        }


        if (fuelType === 'diesel' && fuelEfficiency !== "" && carDistanceTraveled !== "") {
            carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 10153) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
        } else if (fuelType === 'gasoline' && fuelEfficiency !== "" && carDistanceTraveled !== "") {
            carCarbon = (((carDistanceTraveled / fuelEfficiency * 2307) + (carDistanceTraveled / fuelEfficiency * 8874) + (carDistanceTraveled * 56)) * 0.000001) * unitConversion;
        }

        if (busDistanceTraveled !== "") {
            busCarbon = (busDistanceTraveled * 300 * 1.26 * 0.000001) * unitConversion;
        }
        if (railDistanceTraveled !== "") {
            railCarbon = (railDistanceTraveled * 163 * 1.26 * 0.000001) * unitConversion;
        }
        if (airDistanceTraveled !== "") {

            airCarbon = (airDistanceTraveled * 223 * 2 * 0.000001) * unitConversion;
        }

        var electricityUsed = parseFloat(record.housing.electricityUsed);
        var fuelUsed = parseFloat(record.housing.fuelUsed);
        var gasUsed = parseFloat(record.housing.gasUsed);
        var gasUnits = record.housing.gasUnits;
        var waterUsed = parseFloat(record.housing.waterUsed);

        var gasCarbon;
        var electricityCarbon;
        var fuelCarbon;
        var waterCarbon;


        if (gasUnits === 'cubicFeet') {
            gasCarbon = gasUsed * 54.7 * 1.14 * 0.000001;
        } else if (gasUnits === 'btu') {
            gasCarbon = gasUsed * 5470 * 1.14 * 0.000001;
        } else {
            gasCarbon = gasUsed * 4317 * 1.14 * 0.000001;
        }
        if (electricityUsed !== "") {
            electricityCarbon = electricityUsed * 11789 * 1.09 * 0.000001;
        }
        if (fuelUsed !== "") {
            fuelCarbon = fuelUsed * 682 * 0.000001;
        }

        if (waterUsed !== "") {
            waterCarbon = waterUsed * 11707 * 0.000001;
        }

        var meatConsumed = parseFloat(record.food.meatConsumed);
        var poultryConsumed = parseFloat(record.food.poultryConsumed);
        var seafoodConsumed = parseFloat(record.food.seafoodConsumed);
        var dairyConsumed = parseFloat(record.food.dairyConsumed);
        var vegetablesConsumed = parseFloat(record.food.vegetablesConsumed);
        var grainsConsumed = parseFloat(record.food.grainsConsumed);
        var drinksConsumed = parseFloat(record.food.drinksConsumed);

        var meatCarbon;
        var poultryCarbon;
        var seafoodCarbon;
        var dairyCarbon;
        var vegetablesCarbon;
        var grainsCarbon
        var drinksCarbon;

        if (meatConsumed !== "") {
            meatCarbon = meatConsumed * 6.09 * 365 * 0.000001;
        }

        if (poultryConsumed !== "") {
            poultryCarbon = poultryConsumed * 4.27 * 365 * 0.000001;
        }
        if (seafoodConsumed !== "") {
            seafoodCarbon = seafoodConsumed * 5.71 * 365 * 0.000001;
        }
        if (dairyConsumed !== "") {
            dairyCarbon = dairyConsumed * 4 * 365 * 0.000001;
        }
        if (vegetablesConsumed !== "") {
            vegetablesCarbon = vegetablesConsumed * 3.35 * 365 * 0.000001;
        }
        if (grainsConsumed !== "") {
            grainsCarbon = grainsConsumed * 1.45 * 365 * 0.000001;
        }
        if (drinksConsumed !== "") {
            drinksCarbon = drinksConsumed * 2.24 * 365 * 0.000001;
        }


        var clothesSpentOn = parseFloat(record.goods.clothesSpentOn);
        var furnitureSpentOn = parseFloat(record.goods.furnitureSpentOn);
        var entertainmentSpentOn = parseFloat(record.goods.entertainmentSpentOn);
        var paperSpentOn = parseFloat(record.goods.paperSpentOn);
        var cleaningSpentOn = parseFloat(record.goods.cleaningSpentOn);
        var medicalSpentOn = parseFloat(record.goods.medicalSpentOn);
        var autoSpentOn = parseFloat(record.goods.autoSpentOn);

        var clothesCarbon;
        var furnitureCarbon;
        var entertainmentCarbon;
        var paperCarbon;
        var cleaningCarbon;
        var medicalCarbon;
        var autoCarbon;


        if (clothesSpentOn !== "") {
            clothesCarbon = clothesSpentOn * 750 * 12 * 0.000001;
        }

        if (furnitureSpentOn !== "") {
            furnitureCarbon = furnitureSpentOn * 614 * 12 * 0.000001;
        }

        if (entertainmentSpentOn !== "") {
            entertainmentCarbon = entertainmentSpentOn * 1279 * 12 * 0.000001;
        }

        if (paperSpentOn !== "") {
            paperCarbon = paperSpentOn * 2100 * 12 * 0.000001;
        }

        if (cleaningSpentOn !== "") {
            cleaningCarbon = cleaningSpentOn * 954 * 12 * 0.000001;
        }
        if (medicalSpentOn !== "") {
            medicalCarbon = medicalSpentOn * 696 * 12 * 0.000001;
        }
        if (autoSpentOn !== "") {
            autoCarbon = autoSpentOn * 558 * 12 * 0.000001;
        }

        var healthSpentOn = parseFloat(record.services.healthSpentOn);
        var communicationsSpentOn = parseFloat(record.services.communicationsSpentOn);
        var vehiclesSpentOn = parseFloat(record.services.vehiclesSpentOn);
        var maintenanceSpentOn = parseFloat(record.services.maintenanceSpentOn);

        var healthCarbon;
        var communicationsCarbon;
        var vehiclesCarbon;
        var maintenanceCarbon;

        if (healthSpentOn !== "") {
            healthCarbon = healthSpentOn * 1151 * 12 * 0.000001;
            console.log(healthCarbon);
        }

        if (communicationsSpentOn !== "") {
            communicationsCarbon = communicationsSpentOn * 291 * 12 * 0.000001;
        }

        if (vehiclesSpentOn !== "") {
            vehiclesCarbon = vehiclesSpentOn * 433 * 12 * 0.000001;
        }
        if (maintenanceSpentOn !== "") {
            maintenanceCarbon = maintenanceSpentOn * 134 * 12 * 0.000001;
        }

        return {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Your C02 Emissions'
            },
            yAxis: {
                title: {
                    text: 'Tons of CO' + '2'.sub()
                },
            },
            xAxis: {
                type: 'category'
            },

            legend: {
                enabled: true
            },

            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white',
                            textShadow: '0 0 2px black, 0 0 2px black'
                        }
                    },
                    stacking: 'normal'
                }
            },

            series: [{
                name: 'Transportation',
                data: [{
                    name: 'You',
                    y: parseFloat(record.transportation.totalTransport),
                    drilldown: 'transportYou'
                }]
            }, {
                name: 'Housing',
                data: [{
                    name: 'You',
                    y: parseFloat(record.housing.totalHousing),
                    drilldown: 'housingYou'
                }]
            }, {
                name: 'Food',
                data: [{
                    name: 'You',
                    y: parseFloat(record.food.totalFood),
                    drilldown: 'foodYou'
                }]
            }, {
                name: 'Goods',
                data: [{
                    name: 'You',
                    y: parseFloat(record.goods.totalGoods),
                    drilldown: 'goodsYou'
                }]
            }, {
                name: 'Services',
                data: [{
                    name: 'You',
                    y: parseFloat(record.services.totalServices),
                    drilldown: 'servicesYou'
                }]
            }],
            drilldown: {
                activeDataLabelStyle: {
                    color: 'white',
                    textShadow: '0 0 2px black, 0 0 2px black'
                },
                series: [{
                    id: 'transportYou',
                    name: 'CO2 Breakdown',
                    data: [
                        ['Car', round(carCarbon,2)],
                        ['Rail Transit', round(railCarbon,2)],
                        ['Bus', round(busCarbon,2)],
                        ['Air Travel', round(airCarbon,2)]
                    ]
                }, {
                    id: 'housingYou',
                    name: 'CO2 Breakdown',
                    data: [
                        ['Electricity', round(electricityCarbon,2)],
                        ['Fuel', round(fuelCarbon,2)],
                        ['Natural Gas', round(gasCarbon,2)],
                        ['Water Usage', round(waterCarbon,2)]
                    ]
                }, {
                    id: 'foodYou',
                    name: 'CO2 Breakdown',
                    data: [
                        ['Beef, Pork, Lamb, Veal', round(meatCarbon,2)],
                        ['Poultry & Eggs', round(poultryCarbon,2)],
                        ['Fish & Seafood', round(seafoodCarbon,2)],
                        ['Dairy', round(dairyCarbon,2)],
                        ['Fruits & Vegetables', round(vegetablesCarbon,2)],
                        ['Grains & Baked Goods', round(grainsCarbon,2)],
                        ['Drinks', round(drinksCarbon,2)]
                    ]
                }, {
                    id: 'goodsYou',
                    name: 'CO2 Breakdown',
                    data: [
                        ['Clothing' , round(clothesCarbon, 2)],
                        ['Furniture & Appliances' , round(furnitureCarbon, 2)],
                        ['Entertainment' , round(entertainmentCarbon, 2)],
                        ['Paper & Reading' , round(paperCarbon, 2)],
                        ['Personal Care & Cleaning' , round(cleaningCarbon, 2)],
                        ['Medical' , round(medicalCarbon, 2)],
                        ['Auto Parts' , round(autoCarbon, 2)]
                    ]
                }, {
                    id: 'servicesYou',
                    name: 'CO2 Breakdwon',
                    data: [
                        ['Health Care', round(healthCarbon, 2)],
                        ['Communication', round(communicationsCarbon, 2)],
                        ['Vehicle Services', round(vehiclesCarbon, 2)],
                        ['Household Maintenance', round(maintenanceCarbon, 2)]
                    ]
                }]
            }
        }
    },
    treeChart: function() {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Tree Sequestration'
        },
        yAxis: {
            title: {
                text: 'Tons of CO' + '2'.sub()
            },
        },
        xAxis: {
            type: 'category'
        },

        legend: {
            enabled: true
        },

        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    style: {
                        color: 'white',
                        textShadow: '0 0 2px black, 0 0 2px black'
                    }
                },
                stacking: 'normal'
            }
        },

        series: [{
            name: 'Transportation',
            data: [{
                name: 'You',
                y: 5,
                drilldown: 'transportYou'
            }]
        }, {
            name: 'Housing',
            data: [{
                name: 'You',
                y: 5,
                drilldown: 'housingYou'
            }]
        }, {
            name: 'Food',
            data: [{
                name: 'You',
                y: 5,
                drilldown: 'foodYou'
            }]
        }, {
            name: 'Goods',
            data: [{
                name: 'You',
                y: 5,
                drilldown: 'goodsYou'
            }]
        }, {
            name: 'Services',
            data: [{
                name: 'You',
                y: 5,
                drilldown: 'servicesYou'
            }]
        }],
        drilldown: {
            activeDataLabelStyle: {
                color: 'white',
                textShadow: '0 0 2px black, 0 0 2px black'
            },
            series: [{
                id: 'transportYou',
                name: 'CO2 Breakdown',
                data: [
                    ['Car', 4],
                    ['Rail Transit', 2],
                    ['Bus', 2],
                    ['Air Travel', 1],
                ]
            }, {
                id: 'housingYou',
                name: 'CO2 Breakdown',
                data: [
                    ['Electricity', 3],
                    ['Fuel', 5],
                    ['Natural Gas', 6],
                    ['Water Usage', 2],
                ]
            }, {
                id: 'foodYou',
                name: 'CO2 Breakdown',
                data: [
                    ['Beef, Pork, Lamb, Veal', 4],
                    ['Poultry & Eggs', 2],
                    ['Fish & Seafood', 2],
                    ['Dairy', 2],
                    ['Fruits & Vegetables', 2],
                    ['Grains & Baked Goods', 2],
                    ['Drinks', 2]
                ]
            }, {
                id: 'goodsYou',
                name: 'CO2 Breakdown',
                data: [
                    ['Clothing', 4],
                    ['Furniture & Appliances', 4],
                    ['Entertainment', 4],
                    ['Paper & Reading', 4],
                    ['Personal Care & Cleaning', 4],
                    ['Medical', 4],
                    ['Auto Parts', 2]
                ]
            }, {
                id: 'servicesYou',
                name: 'CO2 Breakdown',
                data: [
                    ['Health Care', 1],
                    ['Communication', 1],
                    ['Vehicle Services', 1],
                    ['Household Maintenance', 1]
                ]
            }]
        }
        //chart: {
        //    type: 'column'
        //},
        //title: {
        //    text: 'Your C0' + '2'.sub() + ' Balance'
        //},
        //xAxis: {
        //    categories: ['You', 'Person1', 'Person2', 'Person3', 'Trees']
        //},
        //yAxis: {
        //    min: 0,
        //    title: {
        //        text: 'Tons of CO' + '2'.sub()
        //    },
        //    stackLabels: {
        //        enabled: true,
        //        style: {
        //            fontWeight: 'bold',
        //            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        //        }
        //    }
        //},
        //legend: {
        //    align: 'right',
        //    x: -30,
        //    verticalAlign: 'top',
        //    y: 25,
        //    floating: true,
        //    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        //    borderColor: '#CCC',
        //    borderWidth: 1,
        //    shadow: false
        //},
        //tooltip: {
        //    formatter: function () {
        //        return '<b>' + this.x + '</b><br/>' +
        //            this.series.name + ': ' + this.y + '<br/>' +
        //            'Total: ' + this.point.stackTotal;
        //    }
        //},
        //plotOptions: {
        //    column: {
        //        stacking: 'normal',
        //        dataLabels: {
        //            enabled: true,
        //            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
        //            style: {
        //                textShadow: '0 0 3px black'
        //            }
        //        }
        //    }
        //},
        //series: [{
        //    name: 'Transportation',
        //    data: [5, 3, 4, 7, 2]
        //}, {
        //    name: 'Housing',
        //    data: [2, 2, 3, 2, 1]
        //}, {
        //    name: 'Food',
        //    data: [3, 4, 4, 2, 5]
        //}, {
        //    name: 'Goods',
        //    data: [3, 4, 4, 2, 5]
        //}, {
        //    name: 'Services',
        //    data: [3, 4, 4, 2, 5]
        //}]
    }
}
});


Template.charts.events({
    //add your events here
});

Template.charts.onCreated(function () {
    //add your statement here
});

Template.charts.onRendered(function () {
    //makeChart();
});

Template.charts.onDestroyed(function () {
    //add your statement here
});



function makeChart () {
    $('#carbon-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });
}

/**
 * Sand-Signika theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
    href: '//fonts.googleapis.com/css?family=Signika:400,700',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
    proceed.call(this);
    this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
});


Highcharts.theme = {
    colors: ["#f45b5b", "#8085e9", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Signika, serif"
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        style: {
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },

    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },
    rangeSelector: {
        buttonTheme: {
            fill: 'white',
            stroke: '#C0C0C8',
            'stroke-width': 1,
            states: {
                select: {
                    fill: '#D0D0D8'
                }
            }
        }
    },
    scrollbar: {
        trackBorderColor: '#C0C0C8'
    },

    // General
    background2: '#E0E0E8'
};
Highcharts.setOptions(Highcharts.theme);

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}