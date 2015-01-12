
// TODO: 用在 grease monkey 上面!?

var $node = $("h3:contains('Week " + "1" + "')");
var str = $node.parent().next().children().children("a").text();
/*
str should be something like this:

    "Obtaining Data Motivation (5:38)
    Raw and Processed Data (7:07)
    Components of Tidy Data (9:25)
    Downloading Files (7:09)
    Reading Local Files (4:55)
    Reading Excel Files (3:55)
    Reading XML (12:39)
    Reading JSON (5:03)
    The data.table Package (11:18)"
*/

var timeArray = str.match(/(\d*:\d*)/g)

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match

timeArray should be something like this:
    ["5:38", "7:07", "9:25", "7:09", "4:55", "3:55", "12:39", "5:03", "11:18"]
*/

var timeString = timeArray.toString();

var hour_sum = 0;
var min_sum = 0;
var sec_sum = 0;

var minArray = str.match(/\d*:/g);
for(var x in minArray){
    var tmp = minArray[x].substring(0,minArray[x].length-1);
    min_sum += parseInt(tmp);
    // console.log(tmp);
}
var secArray = str.match(/:\d*/g);
for(var x in secArray){
    var tmp = secArray[x].substring(1,secArray[x].length);
    sec_sum += parseInt(tmp);
    // console.log(tmp);
}

// console.log(min_sum + ":" + sec_sum);
// [63:249]


min_sum += Math.floor(sec_sum/60);
sec_sum = sec_sum%60;


hour_sum += Math.floor(min_sum/60);
min_sum = min_sum%60;

var result = hour_sum + " hour " + min_sum + " min " + sec_sum + " sec";

$node.text($node.text() + " ( " + result + " )");
// TODO: this will also overwrite the "span" entity. However, we should keep the "span" entity intact.

// console.log(result);

