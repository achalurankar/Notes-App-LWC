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

    static async startPolling(apexMethod, callback, completeDiff = false) {
        let oldData = await apexMethod();
        callback(oldData)
        window.setInterval(async function() {
            let response = await apexMethod();
            if(!oldData || oldData.length != response.length || (completeDiff && JSON.stringify(oldData) != JSON.stringify(response))) {
                callback(response)
                oldData = response
            }
        }, 3000)
    }
}