import express, {Request, Response} from "express";

const app = express();
const PORT = 3000;

app.get("/catalogue", (req: Request, res: Response) => {
    res.status(200).json({
        "success": true,
    })
})

app.listen(PORT, ()=> {
    console.log("Server running on port: ", PORT);
})