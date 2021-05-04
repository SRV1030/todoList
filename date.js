
exports.getDate= function(){
    const today = new Date();
    const  options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    return today.toLocaleDateString("en-US", options);        
}

exports.getDay= function(){
    const today = new Date();
    const  options = {
        weekday: "long",
    };
    return today.toLocaleDateString("en-US", options);    
}
// module.exports.getDate= function(){
//     const today = new Date();
//     const  options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//     };

//     return today.toLocaleDateString("en-US", options);        
// }

// module.exports.getDay= function(){
//     const today = new Date();
//     const  options = {
//         weekday: "long",
//     };
//     return today.toLocaleDateString("en-US", options);    
// }


// module.exports.getDate=getDate;//export what u want to return

// function getDate(){
//     let today = new Date();
//     let  options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//     };

//     let day = today.toLocaleDateString("en-US", options);
//     return day;
// }
// module.exports.getDay=getDay;
// function getDay(){
//     let today = new Date();
//     let  options = {
//         weekday: "long",
//     };

//     let day = today.toLocaleDateString("en-US", options);
//     return day;
// }