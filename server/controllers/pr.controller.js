import { fetchPullRequests, fetchPRComments, fetchPRActivity, checkBitbucketConfig } from '../services/bitbucket.service.js';
import { enrichPRData } from '../utils/pr-enrichment.js';
import { mockPRData } from '../mock-data/pull-requests.js';

export const getPullRequests = async (req, res) => {
  try {
    // Use mock data for testing
    if (process.env.NODE_ENV !== 'production') {
      return res.json(mockPRData);
    }

    // Check Bitbucket configuration
    const config = await checkBitbucketConfig();
    if (!config.isConfigured || !config.connectionValid) {
      console.error('Bitbucket configuration error:', config.error);
      return res.status(500).json({ 
        error: 'Bitbucket is not properly configured',
        details: config.error
      });
    }

    const workspace = process.env.BITBUCKET_WORKSPACE;
    const repo_slug = process.env.BITBUCKET_REPO_SLUG;
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const pullRequests = await fetchPullRequests(workspace, repo_slug, oneYearAgo);

    const enrichedPRs = await Promise.all(pullRequests.values.map(async (pr) => {
      const comments = await fetchPRComments(workspace, repo_slug, pr.id);
      const activity = await fetchPRActivity(workspace, repo_slug, pr.id);
      return enrichPRData(pr, comments, activity);
    }));

    const developers = new Set();
    enrichedPRs.forEach(pr => {
      developers.add(JSON.stringify({
        email: pr.author.email,
        name: pr.author.name
      }));
      pr.comments.forEach(comment => {
        developers.add(JSON.stringify({
          email: comment.author.email,
          name: comment.author.name
        }));
      });
    });

    res.json({
      pullRequests: enrichedPRs,
      developers: Array.from(developers).map(dev => JSON.parse(dev))
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    res.status(500).json({ 
      error: 'Failed to fetch pull requests',
      details: error.message
    });
  }
};