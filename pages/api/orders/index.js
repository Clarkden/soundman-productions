import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session) {

        let client = await clientPromise;
        const db = client.db("soundmanproductions");

        if (req.method === "POST") {
            const newProduct = await db.collection('orders').insertOne(req.body);
            res.status(200).json(newProduct);
        }
        else if (req.method === "GET") {
            const allSongs = await db.collection('orders').find({}).toArray()
            res.status(200).json(allSongs)
        }
    } else
        res.status(403)
}