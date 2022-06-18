import { useState } from "react";
import { PageHeader } from "../components";
import Link from "next/link";
import { Card, Empty } from "../components/UI";
import { useAppSelector } from "../hooks";
import { IProjectInfo } from "../types";
import { deleteProject, getProjectsInfo } from "../utils";
import {
  ProjectDelete,
  ProjectIcon,
  ProjectInfo,
} from "../styles/projects.style";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface IProps {
  projectsInfo: IProjectInfo[];
}

const Projects = ({ projectsInfo }: IProps) => {
  const [projectsList, setProjectsList] = useState<IProjectInfo[]>(projectsInfo);
  const editMode = useAppSelector((state) => state.admin.editMode);

  const deleteHandler = async (id: string) => {
    if (!confirm("Sigur doriți să ștergeți acest proiect?")) return;

    setProjectsList((prev) => prev.filter((project) => project.id !== id));
    await deleteProject(id);
  };

  const sortedList = projectsList
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "ro-RO"));

  return (
    <>
      <Head>
        <title>Proiecte | Construct Tracker</title>
      </Head>
      <PageHeader role="add">Proiectele dvs.</PageHeader>
      {sortedList.length ? (
        sortedList.map((project) => (
          <Card key={project.id}>
            <ProjectInfo>
              <Link href={"/" + project.id} scroll={false}>{project.name}</Link>
              {editMode && (
                <ProjectIcon onClick={() => deleteHandler(project.id)}>
                  <ProjectDelete />
                </ProjectIcon>
              )}
            </ProjectInfo>
          </Card>
        ))
      ) : (
        <Empty mt>Niciun proiect. Adăugați unul...</Empty>
      )}
    </>
  );
};

export default Projects;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if user is authenticated
  const userToken = context.req.cookies.token;

  // Redirect if the token doesn't exist or the token was implicitly set by the client
  if (!userToken || userToken !== process.env.ADMIN_TOKEN) return {
    redirect: {
      destination: "/login",
      permanent: false,
    }
  }

  // Get the ProjectInfo if the user is authenticated;
  let projectsInfo: IProjectInfo[] = [];
  let data: any = null;

  try {
    data = await getProjectsInfo();
  } catch (error) {
    console.log(error);
  }

  if (data) projectsInfo = Object.keys(data).map((id) => data[id]);

  return {
    props: {
      projectsInfo
    },
  }
};