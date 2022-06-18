import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoPlus } from "react-icons/go";
import { MdEdit, MdCheck } from "react-icons/md";
import { Button, Input, Spinner } from "../UI";

import { setProjectName } from "../../store/projectSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { nanoid } from "@reduxjs/toolkit";
import { updateProject, updateProjectInfo, EMPTY_PROJECT } from "../../utils";
import { IProject } from "../../types";
import { Header, Title, TitleForm, TitleIcon } from "./PageHeader.style";
import { setEditMode } from "../../store/adminSlice";

interface IProps {
  children: string;
  role: "add" | "edit";
}

const PageHeader = ({ children, role }: IProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const editMode = useAppSelector((state) => state.admin.editMode);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isEditing) inputRef.current!.focus();
  }, [isEditing]);

  useEffect(() => {
    if (count === 5) dispatch(setEditMode(true));
  }, [count, dispatch]);

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newName = inputRef.current!.value;
    if (newName) dispatch(setProjectName(newName));
    setIsEditing(false);
  };

  const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProjectName = inputRef.current!.value;

    if (!newProjectName) {
      setIsEditing(false);
      return;
    }
    setIsLoading(true);

    const newProject = { ...EMPTY_PROJECT } as IProject;
    newProject.name = newProjectName;
    const newProjectID = nanoid(6);

    await updateProject(newProjectID, newProject);
    await updateProjectInfo({
      id: newProjectID,
      name: newProjectName,
    });

    setIsLoading(false);
    setIsEditing(false);
    router.push(`/${newProjectID}`);
  };

  if (!editMode)
    return (
      <Header>
        <Title onClick={() => setCount((prev) => prev + 1)}>{children}</Title>
      </Header>
    );

  return (
    <Header>
      {!isEditing && (
        <>
          <Title>{children}</Title>
          <Button narrow onClick={() => setIsEditing(true)}>
            <TitleIcon>
              {role === "add" && <GoPlus />}
              {role === "edit" && <MdEdit />}
            </TitleIcon>
          </Button>
        </>
      )}
      {isEditing && (
        <TitleForm onSubmit={role === "edit" ? editHandler : addHandler}>
          <Input
            type="text"
            defaultValue={role === "edit" ? children : ""}
            ref={inputRef}
            placeholder="Numele proiectului..."
          />
          <Button narrow type="submit">
            {!isLoading ? (
              <TitleIcon>
                <MdCheck />
              </TitleIcon>
            ) : (
              <Spinner small />
            )}
          </Button>
        </TitleForm>
      )}
    </Header>
  );
};

export default PageHeader;
