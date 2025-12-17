const WebSocket = require("ws");
const fetch = require("node-fetch");

let wss = new WebSocket.WebSocketServer({ port: 7779 });

wss.on("listening", () => {
    console.clear();
    console.log("No client connected.")
});

wss.on("connection", (ws) => {
    let cache = "";
    if (wss.clients.size===2) {
        wss.clients.forEach((wsd) => {
            if (wsd!==ws) {
                ws.close()
            }
        })
    }
    console.clear();
    console.log("Client connected. Currently idle.")
    ws.on("message", async (msg) => {
        if (msg!==cache) {
            cache = msg;
            let buffer = JSON.parse(msg);
            let osm = await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${buffer[0]}&lon=${buffer[1]}`)).json();
            let location = osm["address"];
            let result = `=-=-=-=GeoGuessr Location Finder=-=-=-=\n\n${location["country"]!==undefined ? ("[ Country: " + location["country"] + " ]\n") : ""}${location["postcode"]!==undefined ? ("[ Zip Code: " + location["postcode"] + " ]\n") : ""}${location["state"]!==undefined ? ("[ State: " + location["state"] + " ]\n") : ""}${location["county"]!==undefined ? ("[ County: " + location["county"] + " ]\n") : ""}${location["city"]!==undefined ? ("[ City: " + location["city"] + " ]\n") : ""}${location["town"]!==undefined ? ("[ Town: " + location["town"] + " ]\n") : ""}${location["suburb"]!==undefined ? ("[ Suburb: " + location["suburb"] + " ]\n") : ""}${location["village"]!==undefined ? ("[ Village: " + location["village"] + " ]\n") : ""}${location["residential"]!==undefined ? ("[ Residential: " + location["residential"] + " ]\n") : ""}${location["neighbourhood"]!==undefined ? ("[ Neighbourhood: " + location["neighbourhood"] + " ]\n") : ""}${location["road"]!==undefined ? ("[ Street: " + (location["house_number"]!==undefined ? (location["house_number"] + " ") : "") + location["road"] + " ]\n") : ""}[ Latitude: ${buffer[0]}, Longitude: ${buffer[1]} ]`
            console.clear();
            console.log(result);
        }
    });
    ws.on("close", () => {
        console.clear();
        console.log("No client connected.");
    });
})