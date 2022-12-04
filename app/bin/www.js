const app = require("../app");
const PORT = process.env.port || 3000;

app.listen(PORT, function(){
    console.log("서버 가동");
});
