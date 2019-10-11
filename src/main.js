const webPush = require('web-push');

class PushMessage {
    constructor(args) {
        this.subscriptionObj = {
            //your subscription object
        }

        this.options = {
            gcmAPIKey: 'AAAAZNh-X10:APA91bFoLsSfNRAMVpD_OFnvuMQBeFovYbWKN4nA2Zzsy5ErFQfmtZPQSqaE478KoBdOMDcMmsIrOvpSs3qnp-fqr-rlw_g36QOHpk8WeK7RqKOLpYeZxtPi7TM5m1aFjyOd_FaMAYsm',
            TTL: 60,
        }

        let msg = args.message;
        if(args.event)
        {
            msg = args.event["com.adobe.mcloud.pipeline.pipelineMessage"]["com.adobe.mcloud.protocol.trigger"].enrichments.analyticsHitSummary.dimensions.eVar1.data[0];
        }
        this.payload = `Thank you for submitting the ${msg} form.`;
    }
 
    pushMessage() {
        webPush.sendNotification(
            this.subscriptionObj,
            this.payload,
            this.options
        );      
    }
    
}

function main(args) {

    if (args && args.challenge) {
        return {
        statusCode: 200,
        body: args.challenge
        };
    }

    var p = new PushMessage(args);    
    p.pushMessage();
}

//test code
let args = {message: "hello"}; 
main(args);

exports.main = main;
  