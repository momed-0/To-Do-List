//date.js module to get current day or date

//anonymous function
module.exports.getDate  = function () {
    const today = new Date();

    //logic to select the day
    const options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    return today.toLocaleDateString("en-US",options);
}

module.exports.getDay = function (){
    const today = new Date();

    //logic to select the day
    const options = {
        weekday:"long",
    };

    return today.toLocaleDateString("en-US",options);
}