
// TODO: 用在 grease monkey 上面!?

// How many "Week" are there?
var weekCount = $("h3:contains('Week ')").length;
for(var i=1; i<=weekCount; i++){
    calculate(i);
}

function calculate(i){
    var $node = $("h3:contains('Week " + i + "')");
    var str = $node.parent().next().children().children("a").text();
    /*
    str should be something like this:

        "Intro to Design (12:08)
        Design Methodologies (15:32)
        Case Study: SSL Warnings - example user (7:34)
        Case Study: SSL Warnings - paper discussion (15:20)
        Interview: SSL Warnings (4:49)"
    */

    var timeArray = str.match(/\(\d*:\d*\)/g);

    /*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match

    timeArray should be something like this:
        ["(12:08)", "(15:32)", "(7:34)", "(15:20)", "(4:49)"]
    */

    var timeString = timeArray.toString();

    var hour_sum = 0;
    var min_sum = 0;
    var sec_sum = 0;

    var minArray = timeString.match(/\d*:/g);
    for(var x in minArray){
        var tmp = minArray[x].substring(0,minArray[x].length-1);
        min_sum += parseInt(tmp);
        // console.log(tmp);
    }
    var secArray = timeString.match(/:\d*/g);
    for(var x in secArray){
        var tmp = secArray[x].substring(1,secArray[x].length);
        sec_sum += parseInt(tmp);
        // console.log(tmp);
    }

    // console.log(min_sum + ":" + sec_sum);
    // [53:143]


    min_sum += Math.floor(sec_sum/60);
    sec_sum = sec_sum%60;


    hour_sum += Math.floor(min_sum/60);
    min_sum = min_sum%60;

    var result = "";
    if(hour_sum !== 0){
        result += hour_sum + " hour ";
    }
    result += min_sum + " min " + sec_sum + " sec";
    // console.log(result);


    /*
     https://api.jquery.com/contents/
       > The .contents() and .children() methods are similar, except that the former includes text nodes as well as     HTML elements in the resulting jQuery object.

     https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
       > The read-only `Node.nodeType` property returns an unsigned short integer representing the type of the node.
       > This DOM property holds a numeric code indicating the node's type; text nodes use the code 3.
    */

    $target = $("h3:contains('Week " + i + "')").contents().filter(function() {
          return this.nodeType === 3;
        });

    // https://stackoverflow.com/questions/9956388/how-to-change-only-text-node-in-element
    // https://api.jquery.com/replaceWith/
    $target.replaceWith($target.text() + " ( " + result + " )");
}

