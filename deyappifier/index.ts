import { addPreSendListener, removePreSendListener } from "@api/MessageEvents";
import definePlugin from "@utils/types";
import { Devs } from "@utils/constants";

let messageTimestamps: number[] = [];
const MESSAGE_LIMIT = 10;
const TIME_LIMIT = 60 * 1000;

function checkMessageLimit(): boolean {
    const now = Date.now();


    messageTimestamps = messageTimestamps.filter(timestamp => now - timestamp < TIME_LIMIT);


    messageTimestamps.push(now);


    return messageTimestamps.length > MESSAGE_LIMIT;
}

export default definePlugin({
    name: "Yap banner",
    description: "Blanks out messages if more than 10 messages are sent within a minute.",
    authors: [{name: "froginalog_", id: 1013625394315923558n}],
    dependencies: ["MessageEventsAPI"],

    async start() {
        this.preSend = addPreSendListener((channelId, msg) => {
            if (checkMessageLimit()) {
                msg.content = "";
            }
        });
    },

    stop() {
        removePreSendListener(this.preSend);
    }
});
