var startday = new Date();
var clockStart = startday.getTime();

function initStopwatch() {
    var myTime = new Date();
    var timeNow = myTime.getTime();
    var timeDiff = timeNow - clockStart;
    this.diffSecs = timeDiff / 1000;
    return (this.diffSecs);
}

function getSecs() {
    var mySecs = initStopwatch();
    var mySecs1 = "" + mySecs;
    mySecs1 = mySecs1.substring(0, mySecs1.indexOf(".")) + " sec.";
    document.forms[0].timespent.value = mySecs1
    window.setTimeout('getSecs()', 1000);
}


