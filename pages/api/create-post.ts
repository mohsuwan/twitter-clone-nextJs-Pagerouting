import { promises as fs } from "fs";
import path from "path";
// import { useState } from "react";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const newPost = req.body;

    const filePath = path.join(process.cwd(), "postes_posted.json");
    // const [isloading, setloading] = useState(true);
    try {
      let posts = [];
      try {
        const fileContents = await fs.readFile(filePath, "utf-8");
        posts = JSON.parse(fileContents);
      } catch (err) {
        console.log(err);
      }
      // setTimeout(()=>)

      posts.push(newPost);

      await fs.writeFile(filePath, JSON.stringify(posts, null, 2));

      res.status(200).json({ message: "Post saved successfully" });
    } catch (err) {
      console.error("Error writing file:", err);
      res.status(500).json({ message: "Error saving post" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
