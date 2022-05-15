import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";
import { getSession } from "next-auth/react";
// import { useRouter } from "next/router";

// const router = useRouter()
// const {name} = router.query

export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session) {

        let client = await clientPromise;
        const db = client.db("soundmanproductions");

        if (req.method === "GET") {
            console.log(req.query)
            const deleteSong = await db.collection('songs').deleteOne({ _id: ObjectId(`${req.query.id}`)});
            res.status(200).json(deleteSong);
        }
        // else if (req.method === "GET") {
        //     const user = await db.collection('purchasers').find({ name: req.query.name }).toArray()
        //     if (user.length > 0) {
        //         if (user[0].songs.length > 0) {
        //             let songs = []
        //             for (let x = 0; x < user[0].songs.length; x++) {
        //                 const song = await db.collection('songs').findOne({ _id: ObjectId(`${user[0].songs[x]}`) })
        //                 songs.push(song)
        //             }
        //             res.status(200).json({ status: 200, message: { songs: songs } })
        //         }
        //         else
        //             res.status(404).json({ status: 201, message: { songs: "No songs found" } })
        //     }
        //     else
        //         res.status(404).json({ status: 201, message: "User not found" })

        // }
    }
    else
        res.status(401).json({message: "Not signed in"})
}