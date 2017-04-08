(function(){

    var information = [];
    document.getElementsByClassName("submission")[0].addEventListener("click", function(){
        if (information.length <1 ){
          document.getElementsByClassName("listChart")[0].style.display="block";
          document.getElementsByClassName("formInstructions")[0].style.padding = "200px 0% 5% 0%"
        }
        var item = document.getElementsByClassName("itemsEntered")[0].childNodes
        var hours = document.getElementsByClassName("hoursDiv")[0].childNodes
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
      if (item.timeHours == 1){
        element.textContent = item.activity + " for " + item.timeHours + " hour";
      }else{
        element.textContent = item.activity  + " for " + item.timeHours + " hours";
      }
      var list = document.getElementsByClassName("listGenerate")[0].childNodes[3].appendChild(element);

      if (information.length > 3){
        var path = svg.selectAll("path")
          .data(pie(information))
          .enter()
          .append('path')
          .attr("d", arc)
          .attr("fill", function(d, i){
            return color(d.data.activity)
          });
      }

    }


    var width = 200;
    var height = 200;
    var radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal(d3.schemeCategory20b);

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





})();
