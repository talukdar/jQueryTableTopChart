/*
 * TableTopChart (for jQuery)
 * version: 1.0.0 (18/06/2013)
 * @requires jQuery v1.2 or later
 * @requires google jsapi
 *
 * Licensed under the MIT:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, 2014 Musa Talukdar [ me@musatalukdar.com ]
 */
google.load("visualization", "1", {packages:["geochart","corechart","annotatedtimeline"]});

function printMe(data)
{
    console.log(data);
}
(function($){

    $.fn.tabletopchart = function(options){
        console.log('Entered');
        var settings = $.extend({}, {chartType: 'ColumnChart',chartDivID:null,hideTable:true,chartOption:{}}, options);
        return this.each(function(options){
            var headers =$(this).find("thead").find("th");
            var rows    =$(this).find("tbody").find("tr");

            var gDataTableArray = [];
            var headerArray = [];
            var chartType = settings.chartType.toLowerCase();
            var chartDivId = settings.chartDivID;

            var data = "";
            //hide table
            if(settings.hideTable){
                $(this).hide();
            }

            if(chartType=='annotatedtimeline'){
                var data = new google.visualization.DataTable();
            }
            // Add columns
            if(chartType!='candlestickchart'){
                headers.each(function(index){
                    if(chartType=='annotatedtimeline'){
                        if(index==0){
                            data.addColumn('date',$.trim($(this).text()));
                        }else if((index+2)%3==0){
                            data.addColumn('number',$.trim($(this).text()));
                        }else{
                            data.addColumn('string',$.trim($(this).text()));
                        }
                    }else{
                        var th = $.trim($(this).text());
                        headerArray.push(th);
                    }
                })
                if(chartType!='annotatedtimeline'){
                    gDataTableArray.push(headerArray);
                }
            }
            //console.log(data);
            rows.each(function(){
                var row_array = [];
                $(this).find('td').each(function(index){
                    //console.log(chartType);
                    if((index==0) && ((chartType=='areachart')||(chartType=='barchart')||(chartType=='colmunchart')
                        ||(chartType=='steppedareachart')||(chartType=='bubblechart')||(chartType=='candlestickchart'))){
                        td_text = $.trim($(this).text());
                    }else if((index==0) && (chartType=='annotatedtimeline')){
                        var date=$.trim($(this).text()).split("-");
                        td_text = new Date(date[0],date[1]-1,date[2]);
                    }else{
                        td_text = $.trim($(this).text());
                        if(td_text==""){
                            td_text = null;
                        }
                        else if(!isNaN(td_text)){
                            //td_text = parseFloat($.trim($(this).text()));
                            td_text = parseInt($.trim($(this).text()));
                        }
                    }
                    row_array.push(td_text);
                })

                gDataTableArray.push(row_array);

            })

            google.setOnLoadCallback(drawChart);
            function drawChart() {
                if(chartType=='annotatedtimeline'){
                    data.addRows(gDataTableArray);
                }else{
                    data = google.visualization.arrayToDataTable(gDataTableArray);
                }


                var chart;

                switch(chartType){
                    case 'annotatedtimeline':
                        chart = new google.visualization.AnnotatedTimeLine(document.getElementById(chartDivId));
                        break;
                    case 'areachart':
                        chart = new google.visualization.AreaChart(document.getElementById(chartDivId));
                        break;
                    case 'barchart':
                        chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                        break;
                    case 'bubblechart':
                        chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
                        break;
                    case 'candlestickchart':
                        chart = new google.visualization.CandlestickChart(document.getElementById('chart_div'));
                        break;
                    case 'colmunchart':
                        chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                        break;
                    case 'combochart':
                        chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
                        break;
                    case 'geochart':
                        chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
                        break;
                    case 'linechart':
                        chart = new google.visualization.LineChart(document.getElementById('chart_div'));
                        break;
                    case 'piechart':
                        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                        break;
                    case 'scatterchart':
                        chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
                        break;
                    case 'steppedareachart':
                        chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
                        break;
                    case 'steppedareachart':
                        chart = new google.visualization.SteppedAreaChart(document.getElementById('chart_div'));
                        break;


                }
                chart.draw(data, settings.chartOption);
            }
        })



    }
})(jQuery);