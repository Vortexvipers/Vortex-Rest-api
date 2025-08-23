let users = [
  { id: 1, name: "Daxz" },
  { id: 2, name: "Fariz" }
];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const newUser = { id: users.length + 1, name };
    users.push(newUser);

    return res.status(201).json(newUser);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
