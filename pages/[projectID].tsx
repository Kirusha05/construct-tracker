import { useEffect } from "react";
import {
  Avansuri,
  Details,
  Expenses,
  Muncitori,
  PageHeader,
  ClientAccess,
} from "../components";
import { Empty } from "../components/UI";
import { useAppSelector } from "../hooks";
import { IProject } from "../types";
import {
  getProject,
  updateProject,
  updateProjectInfo,
  EMPTY_PROJECT,
} from "../utils";
import Head from "next/head";
import { wrapper } from "../store";
import { setProject } from "../store/projectSlice";

interface IProps {
  projectID: string;
  clientView: string;
  notFound: boolean;
}

const Project = ({ projectID, clientView, notFound }: IProps) => {
  const project = useAppSelector((state) => state.project);
  const editMode = useAppSelector((state) => state.admin.editMode);

  // Update the project on every change
  useEffect(() => {
    if (notFound) return;

    const updateData = async () => {
      await updateProject(projectID as string, project);
      await updateProjectInfo({
        name: project.name,
        id: projectID as string,
      });
    };

    updateData();
  }, [project, projectID, notFound]);

  if (notFound) {
    return (
      <>
        <Head>
          <title>Eroare | Construct Tracker</title>
        </Head>
        <Empty mt>Eroare! Proiectul nu a fost găsit.</Empty>
      </>
    );
  }

  // Restrict the view access for the client
  let viewAllowed = [true, true, true, true, true];
  if (clientView)
    viewAllowed = clientView.split("").map((val) => Boolean(+val));

  return (
    <>
      <Head>
        <title>{project.name} | Construct Tracker</title>
      </Head>
      <PageHeader role="edit">{project.name}</PageHeader>
      {editMode && !clientView && <ClientAccess />}
      {viewAllowed[0] && <Details />}
      {viewAllowed[1] && <Avansuri />}
      {viewAllowed[2] && <Muncitori />}
      {viewAllowed[3] && <Expenses title="Achiziții" type="achizitii" />}
      {viewAllowed[4] && <Expenses title="Suplimentare" type="suplimentare" />}
    </>
  );
};

export default Project;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  const { projectID, client } = query;
  let data: any = null;

  try {
    data = (await getProject(projectID as string)) as IProject;
  } catch (error) {
    console.log(error);
  }

  let loadedProject: IProject = { ...EMPTY_PROJECT };
  let notFound = false;
  if (data) {
    loadedProject = { ...loadedProject, ...data };
  }
  if (!data) notFound = true;
  store.dispatch(setProject(loadedProject));

  return {
    props: {
      projectID,
      clientView: client || null,
      notFound,
    },
  };
});
