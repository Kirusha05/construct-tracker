import { IExchange, IProject, IProjectInfo } from "./types";

export const fetchExchangeRates = async (): Promise<IExchange> => {
  const response = await fetch(
    "https://v6.exchangerate-api.com/v6/e1364888727425e1e2b8fa14/latest/MDL"
  );
  const data: any = await response.json();
  const eurRate: number = data.conversion_rates.EUR;
  const usdRate: number = data.conversion_rates.USD;
  return {
    eur: roundAmount(1 / eurRate),
    usd: roundAmount(1 / usdRate),
  };
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Round number to 2 decimal places
export const roundAmount = (amount: number) => Math.round(amount * 100) / 100;

// Real DB
// const DATABASE_URL =
//   "https://construct-tracker-default-rtdb.europe-west1.firebasedatabase.app/";

// Test DB
const DATABASE_URL =
  "https://kiril-cash-default-rtdb.europe-west1.firebasedatabase.app/";

export const updateProject = async (
  projectID: string,
  projectData: IProject
) => {
  const res = await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  const data = await res.json();
  return data;
};

export const updateProjectInfo = async (projectInfo: IProjectInfo) => {
  const res = await fetch(
    `${DATABASE_URL}/projectsInfo/${projectInfo.id}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectInfo),
    }
  );
  const data = await res.json();
  return data;
};

export const getProject = async (projectID: string): Promise<IProject> => {
  try {
    const res = await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch project: ${err}`);
  }
};

export const getProjectsInfo = async (): Promise<Record<string, IProjectInfo>> => {
  try {
    const res = await fetch(`${DATABASE_URL}/projectsInfo.json`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch projects info: ${err}`);
  }
};

export const deleteProject = async (projectID: string) => {
  await fetch(`${DATABASE_URL}/projectsList/${projectID}.json`, {
    method: "DELETE",
  });
  await fetch(`${DATABASE_URL}/projectsInfo/${projectID}.json`, {
    method: "DELETE",
  });
};

export const EMPTY_PROJECT: Readonly<IProject> = {
  name: "",
  details: {
    totalCredit: 0,
    usedCredit: 0,
    remainingCredit: 0,
  },
  avansuri: [],
  achizitii: [],
  workers: [],
  suplimentare: [],
};

/**
 * slices: {
 *   project: EMPTY_PROJECT
 *   projects: [
 *     { name: "Ciocana", id: "gx37a2k9", lastModified: "27 mai 2022" },
 *     { name: "Bubuieci", id: "jnS82hf3", lastModified: "30 mai 2022" },
 *   ]
 * }
 *
 * PROJECTS PAGE:
 *   onLoad:
 *     1. Load empty Projects array, start with isLoading=true
 *     2. Fetch (GET) Projects array from /projectsInfo.json
 *     3. Dispatch setProjects with the fetched Projects array
 *     4. Display the Projects list, isLoading=false
 *   onNew:
 *     1. Set the name of an empty project with the enteredName
 *     2. Fetch (PUT) the new Project to /projectsList/projectID.json, isLoading=true
 *     3. Fetch (PUT) the new Project to /projectsInfo/projectID.json
 *     4. isLoading=false, navigate to /projectID
 *
 * PROJECT PAGE:
 *   1. Load empty Project, start with isLoading=true
 *   2. Get projectID from the URL and fetch (GET) Project from /projectsList/projectID.json
 *   3. If the response is null, display an error: "Project not Found", isLoading=false
 *   4. If the response has data, dispatch setProject with the fetched data
 *   5. Display the Project, isLoading=false
 */
