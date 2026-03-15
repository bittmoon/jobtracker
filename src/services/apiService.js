import axios from "axios";

const REMOTIVE_API = "https://remotive.com/api/remote-jobs";

/**
 * Fetch remote job listings from the Remotive API.
 * @param {string} category - Optional category filter
 * @param {number} limit - Number of results to return
 */
export const fetchRemoteJobs = async (category = "", limit = 10) => {
  try {
    const params = { limit };
    if (category) params.category = category;

    const response = await axios.get(REMOTIVE_API, { params });
    return response.data.jobs || [];
  } catch (error) {
    console.error("Error fetching remote jobs:", error);
    return [];
  }
};

/**
 * Fetch job categories available on Remotive.
 */
export const fetchJobCategories = async () => {
  try {
    const response = await axios.get(`${REMOTIVE_API}/categories`);
    return response.data.jobs || [];
  } catch (error) {
    console.error("Error fetching job categories:", error);
    return [];
  }
};

/**
 * Aggregate trending job roles from fetched data.
 */
export const getTrendingRoles = (jobs) => {
  const roleCounts = {};
  jobs.forEach((job) => {
    const title = job.title
      ?.replace(/senior|junior|lead|principal|staff|sr\.|jr\./gi, "")
      .trim()
      .split(/[/,\-–(]/)[0]
      .trim();
    if (title) {
      roleCounts[title] = (roleCounts[title] || 0) + 1;
    }
  });

  return Object.entries(roleCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([role, count]) => ({ role, count }));
};
