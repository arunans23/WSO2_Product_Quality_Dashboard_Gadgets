var WSO2_PRODUCT_COMPONENT_ISSUES_DATA;

var PRODUCT_CHANNEL = "product";
var PRODUCT_VERSION_CHANNEL = "product-version";
var COMPONENT_CHANNEL = "component";
var ISSUETYPE_CHANNEL = "issue-type";
var SEVERITY_TYPE_CHANNEL = "severity";

var PRODUCT_STATE_CHANNEL = "product-state";
var COMPONENT_STATE_CHANNEL = "component-state";
var ISSUETYPE_STATE_CHANNEL = "issuetype-state";
var SEVERITY_CHANNEL = "severity-state";

var currentProduct;
var currentProductVersion;
var currentComponent;
var currentIssueType;
var currentSeverity;

var currentState;

var currentSeriesData;

var currentChartTitle;

gadgets.HubSettings.onConnect = function () {
                gadgets.Hub.subscribe(PRODUCT_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                gadgets.Hub.subscribe(COMPONENT_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });

                gadgets.Hub.subscribe(ISSUETYPE_STATE_CHANNEL, function(topic, message) {
                    if (message){
                        currentState = message;
                        callbackForStateChannel(message);
                    }
                });
                // Subscribe to the product channel
                gadgets.Hub.subscribe(PRODUCT_CHANNEL, function (topic, message){
                    if(message){
                        currentProduct = message;
                    }
                });
                //Subscribe to the product version channel
                gadgets.Hub.subscribe(PRODUCT_VERSION_CHANNEL, function(topic, message){
                    if(message){
                        currentProductVersion = message;
                    }
                })
                // Subscribe to the severity channel.
                gadgets.Hub.subscribe(COMPONENT_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if(message){
                        currentComponent = message;
                    }
                });
                //Subscribe to the issuetype channel
                gadgets.Hub.subscribe(ISSUETYPE_CHANNEL, function (topic, message) {
                    //callbackForChannels(message);
                    if(message){
                        currentIssueType = message;
                    }
                });
            };

function initChart(){
    this.WSO2_PRODUCT_COMPONENT_ISSUES_DATA = response.data[0];
    currentState = '0';
    callbackForStateChannel(currentState);
}


function callbackForStateChannel(state){
    switch(state){
        case '0':
            severityData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.severity;
            seriesData = [];
            for (var i = 0; i < severityData.length; i++){
                name = severityData[i].name;
                y = severityData[i].issues;

                seriesData.push({name: name, y: y});
            }

            currentSeriesData = [{
                                    name: "Severity", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                    click: function(e){
                                        gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                        gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "5");
                                        currentSeverity = e.point.name;
                                        currentState = "5";
                                        callbackForStateChannel(currentState);
                                    }
                                }}];

            currentChartTitle = "Severity";
            createChart();
            break;

        case '1':
            if (currentProduct){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var index = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productSeverityData = productsData[index].severity;
                seriesData = [];
                for (var i = 0; i < productSeverityData.length; i++){
                    name = productSeverityData[i].name;
                    y = productSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "15");
                                                currentState = "15";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "Severity under " + currentProduct;
                createChart();
            }
            break;

        case '4':
            break;
        case '12':
            if (currentProduct && currentProductVersion){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
            
                var productVersionData = productsData[productIndex].version;
                var productVersionIndex = productVersionData.map(function(d){return d['name']}).indexOf(currentProductVersion);

                var productVersionSeverityData = productVersionData[productVersionIndex].severity;
                seriesData = [];
                for (var i = 0; i < productVersionSeverityData.length; i++){
                    name = productVersionSeverityData[i].name;
                    y = productVersionSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                        name: "Severity", 
                                        colorByPoint: true, data: seriesData,
                                        events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "125");
                                                currentState = "125";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "Severity under " + currentProduct + "-" + currentProductVersion;
                createChart();
            }
            break;
        case '13':
            if (currentProduct && currentComponent){
                productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                
                var productComponentData = productsData[productIndex].components;
                var productComponentIndex = productComponentData.map(function(d){return d['name']}).indexOf(currentComponent);

                var productComponentSeverityData = productComponentData[productComponentIndex].severity;
                seriesData = [];
                for (var i = 0; i < productComponentSeverityData.length; i++){
                    name = productComponentSeverityData[i].name;
                    y = productComponentSeverityData[i].issues;

                    seriesData.push({name: name, y: y});
                }

                currentSeriesData = [{
                                name: "Severity", 
                                colorByPoint: true, data: seriesData,
                                events: {
                                            click: function(e){
                                                gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "135");
                                                currentState = "135";
                                                currentSeverity = e.point.name;
                                        }
                                    }}];

                currentChartTitle = "Severity under " + currentProduct + "-" + currentComponent;
                createChart();
            }
            break;
        case '14':
            debugger;
            if (currentProduct && currentIssueType){
                    productsData = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products;
                    var productIndex = WSO2_PRODUCT_COMPONENT_ISSUES_DATA.products.map(function(d){return d['name']}).indexOf(currentProduct);
                    
                    var productIssueTypeData = productsData[productIndex].issuetype;
                    var productIssueTypeIndex = productIssueTypeData.map(function(d){return d['name']}).indexOf(currentIssueType);

                    var productIssueTypeSeverityData = productIssueTypeData[productIssueTypeIndex].severity;
                    seriesData = [];
                    for (var i = 0; i < productIssueTypeSeverityData.length; i++){
                        name = productIssueTypeSeverityData[i].name;
                        y = productIssueTypeSeverityData[i].issues;

                        seriesData.push({name: name, y: y});
                    }

                    currentSeriesData = [{
                                    name: "Severity", 
                                    colorByPoint: true, data: seriesData,
                                    events: {
                                                click: function(e){
                                                    gadgets.Hub.publish(SEVERITY_CHANNEL, e.point.name);
                                                    gadgets.Hub.publish(SEVERITY_STATE_CHANNEL, "145");
                                                    currentState = "145";
                                                    currentSeverity = e.point.name;
                                            }
                                        }}];

                    currentChartTitle = "Severity of type '" + currentIssueType + "'' under " + currentProduct;
                    createChart();
                }
            break;
            break;
        case '41':
            break;
        case '124':
            break;
        case '134':
            break;
        case '154':
            break;
        case '412':
            break;
        case '413':
            break;

    }
}


function createChart(data){

    
    // Create the chart
    Highcharts.chart('container', {
        chart: {
            type: 'pie',
        },
        credits: {
            text: "source : jira"
        },
        title: {
            text: currentChartTitle,
            widthAdjust: -100,
            style: {
                fontSize : '14px'
            }
        },
        plotOptions: {
            pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },

        series: currentSeriesData,
        exporting: {
            buttons: {
                customButton: {
                    symbol: 'circle',
                    symbolStrokeWidth: 1,
                    symbolFill: '#a4edba',
                    symbolStroke: '#330033',
                    _titleKey: 'backTitle',
                    onclick: function() {
                        initChart();
                        gadgets.Hub.publish(COMPONENT_STATE_CHANNEL, "0");
                    }
                }
            }   
        }
        
    });


}
