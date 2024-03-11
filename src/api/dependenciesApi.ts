import { processJsonData } from '../utils';

const URL = '/example_data.json';

export const fetchDependenciesData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return processJsonData(data);
  } catch (error) {
    console.error("Failed to fetch dependencies data:", error);
    throw error;
  }
};
