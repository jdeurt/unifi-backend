import server from "./src/server";

server.listen(process.env.PORT as string, () => {
    console.log("Listening on port: " + process.env.PORT);
});