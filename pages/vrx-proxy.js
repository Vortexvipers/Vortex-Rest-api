import axios from "axios";

export default function ProxyPage() {
  return null; // Kita tidak render HTML apa-apa, hanya JSON
}

export async function getServerSideProps({ res }) {
  try {
    const { data } = await axios.get("https://api.nekolabs.my.id/tools/free-proxy");

    if (!data.status || !Array.isArray(data.result)) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: false, message: "Data proxy tidak valid dari API" }));
      return { props: {} };
    }

    const proxies = data.result.map(proxy => ({
      ip: proxy.ip,
      port: proxy.port,
      country: proxy.country,
      anonymity: proxy.anonymity,
      google: proxy.google,
      https: proxy.https,
      lastSeen: proxy.last
    }));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: true, proxies }));

  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: false, message: error.message }));
  }

  return { props: {} };
}
