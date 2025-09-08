import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.get("https://api.nekolabs.my.id/tools/free-proxy");

    if (!data.status || !Array.isArray(data.result)) {
      return res.status(500).json({ status: false, message: "Data proxy tidak valid dari API" });
    }

    // Format hasil supaya lebih rapi
    const proxies = data.result.map(proxy => ({
      ip: proxy.ip,
      port: proxy.port,
      country: proxy.country,
      anonymity: proxy.anonymity,
      google: proxy.google,
      https: proxy.https,
      lastSeen: proxy.last
    }));

    return res.status(200).json({ status: true, proxies });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}
