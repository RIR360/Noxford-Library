// show a message page
function log(res, message) {
    if (!message) {
        message = "Hello World!";
    }
    res.render("misc/log", {title: "Log", message: message});
}
// show error page
function error(res, message) {
    if (!message) {
        message = "Something wen't wrong";
    }
    res.status(400).render("misc/error", {title: "Error", message: message});
}

 
module.exports = {
    error, log
};