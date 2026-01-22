import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadMockData = async () => {
  const dataPath = path.join(__dirname, '..', 'data', 'mockData.json');
  const rawData = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

export const getHomePage = async (req, res) => {
  try {
    const data = await loadMockData();
    res.render('index', {
      stats: data.stats,
      features: data.features,
    });
  } catch {
    res.status(500).send('Error loading page');
  }
};

export const getDomainsPage = async (req, res) => {
  try {
    const data = await loadMockData();
    res.render('domains', {
      domains: data.domains,
    });
  } catch {
    res.status(500).send('Error loading domains');
  }
};

export const getSubdomainPage = async (req, res) => {
  try {
    const { domainId } = req.params;
    const data = await loadMockData();
    const domain = data.domains.find((d) => d.id === domainId);

    if (!domain) {
      return res.status(404).send('Domain not found');
    }

    res.render('subdomain', { domain });
  } catch {
    res.status(500).send('Error loading subdomain');
  }
};

export const getTopicsPage = async (req, res) => {
  try {
    const { subdomainId } = req.params;
    const data = await loadMockData();
    const topic = data.topics[subdomainId];

    if (!topic) {
      return res.status(404).send('Topics not found');
    }

    res.render('topicsPage', {
      topic,
      subdomainId,
    });
  } catch {
    res.status(500).send('Error loading topics');
  }
};

export const getSuggestTopicPage = async (req, res) => {
  try {
    const { domainId, subdomainId } = req.params;
    const data = await loadMockData();
    const topic = data.topics[subdomainId];

    res.render('suggestTopic', {
      domainId,
      subdomainId,
      subdomainName: topic ? topic.name : subdomainId,
    });
  } catch {
    res.status(500).send('Error loading page');
  }
};
