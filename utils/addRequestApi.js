import axios from 'axios';
import { Buffer } from 'buffer';

const GITHUB_TOKEN = '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'; // jangan hardcode
const OWNER = "Vortexvipers";
const REPO = "Database-Data";
const FILE_PATH = "requestData.json";

export async function addRequestApi(apiName) {
  try {
    // Ambil file dari GitHub
    const res = await axios.get(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    const content = Buffer.from(res.data.content, 'base64').toString('utf8');
    let jsonData = {};
    try {
      jsonData = JSON.parse(content);
    } catch {
      jsonData = {};
    }

    // Update count
    if (!jsonData[apiName]) {
      jsonData[apiName] = { total_request: 0 };
    }
    jsonData[apiName].total_request += 1;

    // Push update
    await axios.put(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
      {
        message: `Update total_request for ${apiName}`,
        content: Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64'),
        sha: res.data.sha
      },
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    return { success: true, total: jsonData[apiName].total_request };
  } catch (err) {
    console.error("Update API request count error:", err.response?.data || err.message);
    return { success: false, error: err.response?.data || err.message };
  }
}
