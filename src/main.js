const webPush = require('web-push');

class PushMessage {
    constructor(args) {
        this.subscriptionObj = {
            "endpoint":"https://fcm.googleapis.com/fcm/send/dfQnqiaqBHA:APA91bFMo7arW1vz93yLPT4YxjOQb8xF_e2O4cxe1bn6YT-8qdleszeE6R90Sj0nfVa3Sw9Fo-YicleaegrU5kIrkpnV4pIu3MedniP7qQKXFvKEzVaLknzjHgP5SqeYuDiP4Uo2D4GJ",
            "expirationTime":null,
            "keys":{
                "p256dh":"BA9FGUChGciJxXjl5ZcbEoCFn6DQzABAopISH9L47IOxv9Y4IH2S6GmBGBkbaHQRYx1QYm2apKnHRRIMG4Tqx6g","auth":"Ne--zk9VyOdPmq3uvfKgZg"
            }
        }

        this.options = {
            gcmAPIKey: 'AAAAZNh-X10:APA91bFoLsSfNRAMVpD_OFnvuMQBeFovYbWKN4nA2Zzsy5ErFQfmtZPQSqaE478KoBdOMDcMmsIrOvpSs3qnp-fqr-rlw_g36QOHpk8WeK7RqKOLpYeZxtPi7TM5m1aFjyOd_FaMAYsm',
            TTL: 60,
        }

        let msg = args;
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

    var p = new PushMessage(args);


    if (args && args.challenge) {
        return {
        statusCode: 200,
        body: args.challenge
        };
    }

    
    p.pushMessage();
}

//test code
let args = "hello"; 
main(args);

exports.main = main;
  