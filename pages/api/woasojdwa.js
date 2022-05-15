import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {

    let client = await clientPromise;
    const db = client.db("soundmanproductions");

    if (req.method === "POST") {
        const addsong = await db.collection('users').update({name: req.body.name}, {$push: {sounds: req.body.sound}});
        res.status(200).json(addsong);
    }
    else if (req.method === "GET"){
        // const user = await db.collection('users').find({name: req.body.name})
        // console.log(user)
        res.status(200).json(res)
    }
}