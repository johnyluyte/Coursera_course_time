
// TODO: 用在 grease monkey 上面!?

// How many "Week" are there?
var $headerNodes = $(".course-item-list-header");
for(var i=0; i<$headerNodes.length; i++){
    start("Total",$headerNodes.eq(i));
    start("Unviewed", $headerNodes.eq(i));
}


function start(type, $node){
  var timeArray = getTimeArray(type, $node);
  // If all lectures in that week do not conatin (min:sec) in their title, the timeArray will be null
  if(timeArray == null){
      return;
  }
  var timeResult = getTimeResult(type,timeArray.toString());
  appendToDOM($node, timeResult);
}


/*
  The returned Array should be something like this:
    ["(12:08)", "(15:32)", "(7:34)", "(15:20)", "(4:49)"]
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
*/
function getTimeArray(type, $node){
    var str = "";
    if(type == "Total"){
      str = $node.next().children().children("a").text();
    }else if(type == "Unviewed"){
      str = $node.next().children(".unviewed").children("a").text();
    }
    /*
    str should be something like this:

        "Intro to Design (12:08)
        Design Methodologies (15:32)
        Case Study: SSL Warnings - example user (7:34)
        Case Study: SSL Warnings - paper discussion (15:20)
        Interview: SSL Warnings (4:49)"
    */

    return str.match(/\(\d*:\d*\)/g);
}


function getTimeResult(type, timeString){
    var hour_sum = 0;
    var min_sum = 0;
    var sec_sum = 0;

    var minArray = timeString.match(/\d*:/g);
    for(var x in minArray){
        var tmp = minArray[x].substring(0,minArray[x].length-1);
        min_sum += parseInt(tmp);
    }
    var secArray = timeString.match(/:\d*/g);
    for(var x in secArray){
        var tmp = secArray[x].substring(1,secArray[x].length);
        sec_sum += parseInt(tmp);
    }

    // console.log(min_sum + ":" + sec_sum);
    // [53:143]

    min_sum += Math.floor(sec_sum/60);
    sec_sum = sec_sum%60;

    hour_sum += Math.floor(min_sum/60);
    min_sum = min_sum%60;

    var result = type + ": ";
    if(hour_sum !== 0){
        result += hour_sum + " h ";
    }
    result += min_sum + " m " + sec_sum + " s";
    return result;
}

function appendToDOM($node, timeResult){
    /*
     https://api.jquery.com/contents/
       > The .contents() and .children() methods are similar, except that the former includes text nodes as well as     HTML elements in the resulting jQuery object.

     https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
       > The read-only `Node.nodeType` property returns an unsigned short integer representing the type of the node.
       > This DOM property holds a numeric code indicating the node's type; text nodes use the code 3.
    */

    $target = $node.children("h3").contents().filter(function() {
          return this.nodeType === 3;
        });

    // https://stackoverflow.com/questions/9956388/how-to-change-only-text-node-in-element
    // https://api.jquery.com/replaceWith/
    $target.replaceWith($target.text() + " ( " + timeResult + " )");
}

