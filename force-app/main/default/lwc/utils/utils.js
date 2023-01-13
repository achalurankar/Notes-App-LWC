function dispatchEvent(ctx, name, params) {
    var event = new CustomEvent(name, { detail : params });
    ctx.dispatchEvent(event);
}

function log(msg, json = false) {
    if(json) {
        console.log(JSON.stringify(msg));
    } else {
        console.log(msg);
    }
}

const Colors = {
    SUCCESS : '#50C878',
    ERROR : '#DC3545'
};

export { dispatchEvent, log, Colors };