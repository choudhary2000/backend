const express = require("express");
const cors = require("cors")
const node_cron = require('node-cron');
const retry = require('async-retry');
const app = express();
app.use(express.json());
app.use(cors())
const GenerateWinner = require('./services/cron/cron');
node_cron.schedule('*/5 * * * * *', async () => {
    console.log("Hi I am executing")
    await retry( async (bail) => {
        try {
            const win = new GenerateWinner()
            await win.winners()
            .then(res => {
                console.log(res)
                if(res) {
                    bail("All done");
                }
            })   
        } catch (error) {
            console.log(error);
        }
    }, {
        retries: 5
    })
})


const event = require("./routes/event.route");
const participate = require("./routes/participate.route");
const raffle = require("./routes/raffle.ticket.route");
const winner = require("./routes/winner.route");
const { CIDR } = require("sequelize/dist");

app.use("/event", event);
app.use("/participate", participate);
app.use("/raffle-ticket", raffle);
app.use("/winner", winner);

app.get("/", (req, res, next) => {
    res.send("Welcome to Grofers");
});

app.listen( process.env.PORT || 3001, (req, err) => {
    console.log(`Listening on http://localhost:${process.env.PORT || 3001}`);
})