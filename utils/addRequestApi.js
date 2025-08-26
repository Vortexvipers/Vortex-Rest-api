// lib/addRequestApi.js

import axios from 'axios';
import { Buffer } from 'buffer';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.OWNER || "Vortexvipers";
const REPO = process.env.REPO || "Database-Data";
const FILE_PATH = process.env.FILE_PATH || "requestData.json";

export async function addRequestApi(apiName) {
  try {
    if (!GITHUB_TOKEN) {
      console.error("GITHUB_TOKEN is missing");
      return { success: false, error: "Server configuration error" };
    }

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

    // Ambil file dari GitHub
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'User-Agent': 'Vercel-App', // GitHub wajib: User-Agent header
      },
    });

    // Decode konten base64
    const content = Buffer.from(res.data.content, 'base64').toString('utf8');
    let jsonData = {};

    try {
      jsonData = JSON.parse(content);
    } catch (e) {
      console.warn("Failed to parse JSON, starting fresh");
      jsonData = {};
    }

    // Update request count
    if (!jsonData[apiName]) {
      jsonData[apiName] = { total_request: 0 };
    }
    jsonData[apiName].total_request += 1;

    // Push kembali ke GitHub
    await axios.put(
      url,
      {
        message: `Update request count for ${apiName}`,
        content: Buffer.from(JSON.stringify(jsonData, null, 2)).toString('base64'),
        sha: res.data.sha, // wajib untuk update
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'User-Agent': 'Vercel-App',
        },
      }
    );

    return { success: true, total: jsonData[apiName].total_request };
  } catch (err) {
    console.error("GitHub API Error:", err.response?.data || err.message);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
      status: err.response?.status,
    };
  }
}
