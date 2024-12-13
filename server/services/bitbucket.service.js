import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const {
  BITBUCKET_USERNAME,
  BITBUCKET_APP_PASSWORD,
  BITBUCKET_BASE_URL
} = process.env;

// Create axios instance with auth and base URL
const api = axios.create({
  baseURL: BITBUCKET_BASE_URL,
  auth: {
    username: BITBUCKET_USERNAME,
    password: BITBUCKET_APP_PASSWORD
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchPullRequests = async (workspace, repo_slug, since) => {
  try {
    const response = await api.get(
      `/rest/api/1.0/projects/${workspace}/repos/${repo_slug}/pull-requests`,
      {
        params: {
          state: 'ALL',
          start: 0,
          limit: 100,
          created_after: since.toISOString()
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pull requests:', error.response?.data || error.message);
    throw new Error('Failed to fetch pull requests from Bitbucket');
  }
};

export const fetchPRComments = async (workspace, repo_slug, pull_request_id) => {
  try {
    const response = await api.get(
      `/rest/api/1.0/projects/${workspace}/repos/${repo_slug}/pull-requests/${pull_request_id}/comments`,
      {
        params: {
          start: 0,
          limit: 100
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching PR comments:', error.response?.data || error.message);
    throw new Error('Failed to fetch PR comments from Bitbucket');
  }
};

export const fetchPRActivity = async (workspace, repo_slug, pull_request_id) => {
  try {
    const response = await api.get(
      `/rest/api/1.0/projects/${workspace}/repos/${repo_slug}/pull-requests/${pull_request_id}/activities`,
      {
        params: {
          start: 0,
          limit: 100
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching PR activity:', error.response?.data || error.message);
    throw new Error('Failed to fetch PR activity from Bitbucket');
  }
};

// Helper function to check if Bitbucket is properly configured
export const checkBitbucketConfig = async () => {
  try {
    const config = {
      isConfigured: !!(BITBUCKET_USERNAME && BITBUCKET_APP_PASSWORD && BITBUCKET_BASE_URL),
      workspace: process.env.BITBUCKET_WORKSPACE,
      repo_slug: process.env.BITBUCKET_REPO_SLUG
    };

    if (config.isConfigured) {
      // Test the connection
      await api.get('/rest/api/1.0/users/' + BITBUCKET_USERNAME);
      config.connectionValid = true;
    }

    return config;
  } catch (error) {
    return {
      isConfigured: false,
      connectionValid: false,
      error: error.response?.data?.message || error.message
    };
  }
};