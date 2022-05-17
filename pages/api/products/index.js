import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {

    let client = await clientPromise;
    const db = client.db("soundmanproductions");

    if (req.method === "POST") {
        const session = await getSession({ req })
        if (session) {
            const newProduct = await db.collection('songs').insertOne(req.body);
            res.status(200).json(newProduct);
        } else
            res.status(403)
    }
    else if (req.method === "GET") {
        const allSongs = await db.collection('songs').find({}).toArray()
        res.status(200).json(allSongs)
    }
}