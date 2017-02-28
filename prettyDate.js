

//------------------------------------------------------------------------
// constants
//------------------------------------------------------------------------
var ONE_SECOND = 1000;
var ONE_MINUTE = 60 * ONE_SECOND;
var ONE_HOUR = 60 * ONE_MINUTE;
var ONE_DAY = 24 * ONE_HOUR;
var ONE_YEAR = 365 * ONE_DAY; // mostly ;)

var SECONDS_PER_MINUTE = ONE_MINUTE / ONE_SECOND;
var SECONDS_PER_HOUR = ONE_HOUR / ONE_SECOND;

var MONTH_NAMES = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var SHORT_MONTH_NAMES = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var DAY_NAMES = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var SHORT_DAY_NAMES = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");


//------------------------------------------------------------------------
// pretty date
//------------------------------------------------------------------------
function prettyDate(date) {
    var inputDate = new Date(date);

    // if we can't parse the input date, return the input as is
    if (isNaN(inputDate.getDate())) {
        console.error("Can't parse date", date);
        return date;
    }

    var currentDate = new Date();
    var difference = Math.abs(currentDate - inputDate);
    var secDiff = Math.floor(Math.abs(difference / 1000));
    var currentDay = new Date(currentDate.getYear(), currentDate.getMonth(), currentDate.getDate());
    var inputDay = new Date(inputDate.getYear(), inputDate.getMonth(), inputDate.getDate());
    var dayDiff = Math.abs((currentDay - inputDay) / ONE_DAY);

    var isToday = (inputDate.getYear() == currentDate.getYear()) && (inputDate.getMonth() == currentDate.getMonth()) && (inputDate.getDay() == currentDate.getDay());
    var isThisYear = inputDate.getYear() == currentDate.getYear();
    var isFuture = currentDate < inputDate;

    // date is in past
    if (!isFuture) {
        // less than 60 seconds = "Just now"                   
        if (difference < ONE_MINUTE) return "Just now";

        // less than one hour = "x minute(s) ago"                    
        else if (difference < ONE_HOUR) return createMinutesString(secDiff) + " ago";

        // less then 5 hours = "x hour(s), y minute(s) ago"                    
        else if (isToday && difference <= 5 * ONE_HOUR) return createHoursString(secDiff) + " ago";

        // More then 5 hours
        else if (isToday) return "Today " + createAmPmHour(inputDate);

        // More then 5 hours + "Yesterday"
        else if (dayDiff == 1) return "Yesterday " + createAmPmHour(inputDate);

        // Not more then one week
        else if (dayDiff <= 7) return "Last " + createWeekDayAmPmHour(inputDate);

        // More then one week this year
        else if (isThisYear) return createDateString(inputDate);

        // More then one week different year
        else if (!isThisYear) return createDateString(inputDate) + " " + inputDate.getFullYear();
    }

    // date is in future
    else {
        // Less than 60 seconds to go = "Just now" 
        if (difference < ONE_MINUTE) return "Just now";

        // Less than one hour to go = "In x minutes"
        else if (difference < ONE_HOUR) return "In " + createMinutesString(secDiff);

        // Less than 5 hours to go = "In x hours, y minutes"
        else if (isToday && difference <= 5 * ONE_HOUR) return "In " + createHoursString(secDiff);

        // More than 5 hours to go
        else if (isToday) return "Today " + createAmPmHour(inputDate);

        // More than 5 hours to go, next day...
        else if (dayDiff == 1) return "Tomorrow " + createAmPmHour(inputDate);

        // Not more then one week ahead
        else if (dayDiff <= 7) return "Next " + createWeekDayAmPmHour(inputDate);

        // More then one week ahead same year:
        else if (isThisYear) return createDateString(inputDate);

        // More then one week ahead different year:
        else if (!isThisYear) return createDateString(inputDate) + " " + inputDate.getFullYear();
    }

} // end function prettyDate()




//------------------------------------------------------------------------
// helper
//------------------------------------------------------------------------

function createAmPmHour(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

function createWeekDayAmPmHour(date) {
    return DAY_NAMES[date.getDay()] + " " + createAmPmHour(date);
}

function addOrdinal(num) {
    switch (num % 100) {
        case 11:
        case 12:
        case 13:
            return num + "th";
    }

    switch (num % 10) {
        case 1:
            return num + "st";
        case 2:
            return num + "nd";
        case 3:
            return num + "rd";
        default:
            return num + "th";
    }
}

function createDateString(date) {
    return SHORT_MONTH_NAMES[date.getMonth()] + " " + addOrdinal(date.getDate());
}

function createMinutesString(secDiff) {
    return calcMinutesDiff(secDiff) + " minute" + pluralize(calcMinutesDiff(secDiff));
}

function createHoursString(secDiff) {
    return calcHoursDiff(secDiff) + " hour" + pluralize(calcHoursDiff(secDiff)) + ", " + createMinutesString(secDiff);
}

function calcHoursDiff(secDiff) {
    return Math.floor(secDiff / SECONDS_PER_HOUR);
}

function calcMinutesDiff(secDiff) {
    return Math.floor(secDiff / SECONDS_PER_MINUTE) % 60;
}

function pluralize(bPlu) {
    return bPlu == 1 ? "" : "s";
}