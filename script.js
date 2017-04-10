(function(){

    var information = [];

    document.getElementsByClassName("submission")[0].addEventListener("click", function(){
        var item = document.getElementsByClassName("itemsEntered")[0].childNodes;
        var hours = document.getElementsByClassName("hoursDiv")[0].childNodes;

        if (information.length <1 ){
          document.getElementsByClassName("listChart")[0].style.display="block";
          document.getElementsByClassName("formInstructions")[0].style.padding = "200px 0% 5% 0%"
        }else{
          if (checkTime(parseInt(hours[3].value)) > 24 ){
            alert("Please keep your day within 24 hours");
            return;
          }
        }


        var object = {};
        object.activity = item[2].value;
        object.timeHours = parseInt(hours[3].value);
        information.push(object);
        item[2].value = "";
        hours[3].value = "1";

        addItem(object);

    })

    function addItem(item){
      var element = document.createElement("li");
      var element2 = document.createElement("span");
      if (item.timeHours == 1){
        element.textContent = item.activity + " for " + item.timeHours + " hour";
      }else{
        element.textContent = item.activity  + " for " + item.timeHours + " hours";
      }
      var list = document.getElementsByClassName("listGenerate")[0].childNodes[3].appendChild(element);
    }

    function checkTime(value){
      var total = information.reduce(function(a, b){
        return {timeHours: a.timeHours + b.timeHours}
      })
      return total.timeHours + value

    }




    // function colorCodes(){
    //   var child = document
    // }

    document.getElementsByClassName("generateGraph")[0].addEventListener("click", function(){
      document.getElementsByClassName("listChart")[0].style.margin="0 0 0 0"
      if (document.getElementsByTagName("svg")[0]){
        var path = svg.selectAll("path")
          .data(pie(information))
          .enter()
          .append('path')
          .attr("d", arc)
          .attr("fill", function(d, i){
            return color(d.data.activity)
          });
      }else{
        var width = 200;
        var height = 200;
        var radius = Math.min(width, height) / 2;

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var svg = d3.select("#chart")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform","translate(" + (width/2) + "," + (height/2) + ")" );

        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var pie = d3.pie()
          .value(function(d){return d.timeHours})
          .sort(null);
        var path = svg.selectAll("path")
          .data(pie(information))
          .enter()
          .append('path')
          .attr("d", arc)
          .attr("fill", function(d, i){
            return color(d.data.activity)
          });
        };
        document.getElementsByClassName("generateGraph")[0].style.display="none"
        document.getElementsByClassName("restartButton")[0].style.display="block"
    })

    document.getElementsByClassName("restartButton")[0].addEventListener("click", function(){
      document.getElementsByClassName("listChart")[0].style.margin="200px 0 0 0"
      d3.select('svg').remove();
      information = [];
      document.getElementsByClassName("listChart")[0].style.display = "none";
      var list = document.getElementsByTagName("ul")[0];
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      document.getElementsByClassName("generateGraph")[0].style.display="block"
      document.getElementsByClassName("restartButton")[0].style.display="none"
    })



})();
