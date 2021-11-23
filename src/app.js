const express = require("express");
const cors = require("cors")
const node_cron = require('node-cron');
const retry = require('async-retry');
const { ValidationError } = require("joi");
const app = express();
app.use(express.json());
app.use(cors())
const GenerateWinner = require('./services/cron/cron');

//cron set to run 8:00pm
node_cron.schedule(process.env.CRON_INTERVAL, async () => {
    await retry( async (bail) => {
        try {
            const win = new GenerateWinner()
            await win.winners()
            .then(res => {
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
const raffle = require("./routes/raffle.ticket.route");
const winner = require("./routes/winner.route");

app.use("/event", event);
app.use("/raffle-ticket", raffle);
app.use("/winner", winner);

app.get("/", (req, res, next) => {
    res.send("Welcome to Grofers");
});

app.use(async(err, req, res, next) => {
    console.log( err)  
    if (err instanceof ValidationError) {
        return res.status(400).send({errorMessage: err.message})
    }
    return res.status(400).send(err)
})


app.listen( process.env.PORT || 3001, (req, err) => {
    console.log(`Listening on http://localhost:${process.env.PORT || 3001}`);
})