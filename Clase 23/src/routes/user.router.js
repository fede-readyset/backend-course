import Router from "./router.js";

class UserRouter extends Router {
    init() {
        this.get("/", (req,res) => {
            res.send("Get de usuarios");
        })
        this.post("/", (req,res) =>{
            res.send("Post de usuarios");
        })
        this.put("/", (req,res) =>{
            res.send("Put de usuarios");
        })
    }
}

export default UserRouter;