    $(".boxHide").hide();
    $(".hideRow").hide();
    $(".boxHide").css("display","");
    $(".hideRow").css("display","");
    function searchWeather(city)
    {
        $.getJSON("//api.waqi.info/feed/"+city+"/?token=3b8933facee479ca77345764f2d45b078f9fc2cb",
        function (result) {
            $("#cityName").html(city);
            var obj=result["data"]["iaqi"];
            // var output="<ul>";
            // for(x in obj)
            // {
            //     output+="<li>"+x+" - "+obj[x]["v"]+"</li>";
            // }
            // output+="</ul>";

            var output2="<table border='2'>";
            if(obj.hasOwnProperty("o3"))
            {
                output2+="<tr><td>Ozone (O3)</td><td> "+obj["o3"]["v"]+"</td></tr>";
            }
            if(obj.hasOwnProperty("pm25") && !obj.hasOwnProperty("pm10"))
            {
                output2+="<tr><td>Particle Pollution (PM25)</td><td> "+obj["pm25"]["v"]+"</td></tr>";
            }
            else if(!obj.hasOwnProperty("pm25") && obj.hasOwnProperty("pm10"))
            {
                output2+="<tr><td>Particle Pollution (PM10)</td><td> "+obj["pm10"]["v"]+"</td></tr>";
            }
            else if(obj.hasOwnProperty("pm25") && obj.hasOwnProperty("pm10"))
            {
                output2+="<tr><td>Particle Pollution (PM25 and PM10)</td><td> "+(parseFloat(obj["pm25"]["v"])+parseFloat(obj["pm10"]["v"]))+"</td></tr>";
            }
            if(obj.hasOwnProperty("co"))
            {
                output2+="<tr><td>Carbon Monoxide (CO)</td><td> "+obj["co"]["v"]+"</td></tr>";
            }
            if(obj.hasOwnProperty("so2"))
            {
                output2+="<tr><td>Sulfur dioxide (SO2)</td><td> "+obj["so2"]["v"]+"</td></tr>";
            }
            if(obj.hasOwnProperty("no2"))
            {
                output2+="<tr><td>Nitrogen dioxide (NO2)</td><td> "+obj["no2"]["v"]+"</td></tr>";
            }
            output2+="</table>";

            $("#mp").html(output2);
            $("#aqiIndex").html(result["data"]["aqi"]);
            var aqi=parseInt(result["data"]["aqi"]);
            $(".boxHide").hide();

            if(aqi>=0 && aqi<=50)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge:{axis:{range:[null,500],tickwidth: 1, tickcolor: "green"},
                bar: { color: "green" }
                }
            }                
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('goodBox', data7, layout);
                $(".goodBox").show();
            }
            else if(aqi>=51 && aqi<=100)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range:[null,500],tickwidth: 1, tickcolor: "yellow"},
                bar: { color: "yellow" }
             }    
          }            
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('moderateBox', data7, layout);
               $(".moderateBox").show();
            }
            else if(aqi>=101 && aqi<=150)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range:[null,500]}},
                bar: { color: "orange" } 
            }                
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('unhealthBox', data7, layout);
                $(".unhealthBox").show();
            }
            else if(aqi>=151 && aqi<=200)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range:[null,500]}},
                bar: { color: "red" }
            }                
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('unhealth2Box', data7, layout);
               $(".unhealth2Box").show();
            }
            else if(aqi>=201 && aqi<=300)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range:[null,500]}},
                bar: { color: "purple" }
            }                
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('veryUnhealthBox', data7, layout);
                $(".veryUnhealthBox").show();
            }
            else if(aqi>=301)
            {var data7 = [{
                domain: {x: [0,1],y:[0,1]},
                value: aqi,
                title:{text:"Air Quality Index"},
                type: "indicator",
                mode: "gauge+number",
                gauge: {axis:{range:[null,500]}},
                bar: { color: "maroon" }
            }                
            ];
            var layout = { width: 300, height: 200, margin: { t: 0, b: 0 }};
            Plotly.newPlot('hazardousBox', data7, layout);
                $(".hazardousBox").show();
            }
        });
        var d=new Date();
        var ldate=d.toLocaleString('en-US');
        var dateS=ldate.split(",")[0];
        var time=ldate.split(",")[1];
        var dateSArr=dateS.split("/");
        var disDate = new Date(dateS);
        disDate=disDate.toString().substring(0,15).replace(new Date().getFullYear().toString(), "");
        $("#dateTime").html(disDate + time);
        $(".hideRow").show();
    }
    $("#searchBtn").click(function(){
        var srcVal=$("#city").val();
        searchWeather(srcVal);
    });
    $("#city").on("keydown",function(e){
        if(e.keyCode==13)
        {
            e.preventDefault();
            $("#searchBtn").click();
        }
    });