import { newQuoteQuery, newTickQuery, newChatMsgQuery } from "./db_queries";

var WebSocket = require("ws");
var ws = new WebSocket(
    "wss://www.bitmex.com/realtime?subscribe=funding,connected,chat"
);
const fetch = require("node-fetch");
const dateFormat = require("dateformat");

ws.on("message", (data) => {
    let dat = JSON.parse(data);
    if (dat.table === "chat") {
        let chat = dat.data;
        console.log(chat)

        chat.map((res) => {
            let channelID = parseInt(res.channelID);
            let fromBot = res.fromBot;
            let message = res.message;
            let hour = new Date();
            let datetime = dateFormat(hour, "yyyy-mm-dd hh:MM:ss.l");
            let concatHour = dateFormat(hour, "yymmddhh");

            const variables = {
                channelID: channelID,
                hour: concatHour,
                fromBot: res.fromBot,
                message: res.message

            };
            let query = newChatMsgQuery;

            fetch("http://localhost:4000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query, variables })
            })
                .then((r) =>
                    console.log(
                        r.json().then((r) => {
                            const re = r;
                            console.log(re);
                        })
                    )
                )
                .catch((e) => console.log(e));
        });
    } else {
        console.log('null')
    }
});

