export default class Utils {
    static dispatchEvent(ctx, name, params) {
        var event = new CustomEvent(name, { detail : params });
        ctx.dispatchEvent(event);
    }
    
    static log(msg, json = false) {
        if(json) {
            console.log(JSON.stringify(msg));
        } else {
            console.log(msg);
        }
    }
    
    static Colors = {
        SUCCESS : '#50C878',
        ERROR : '#DC3545'
    };
}