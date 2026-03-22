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
 * Returns roles with their nested job listings for dropdown display.
 */
export const getTrendingRoles = (jobs) => {
  const roleMap = {};
  jobs.forEach((job) => {
    const title = job.title
      ?.replace(/senior|junior|lead|principal|staff|sr\.|jr\./gi, "")
      .trim()
      .split(/[/,\-–(]/)[0]
      .trim();
    if (title) {
      if (!roleMap[title]) {
        roleMap[title] = [];
      }
      roleMap[title].push({
        id: job.id,
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location || "Remote",
        url: job.url,
      });
    }
  });

  return Object.entries(roleMap)
    .sort(([, a], [, b]) => b.length - a.length)
    .slice(0, 8)
    .map(([role, jobs]) => ({ role, count: jobs.length, jobs }));
};
