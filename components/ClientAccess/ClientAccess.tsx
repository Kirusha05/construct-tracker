import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../../hooks";
import { Button, Collapsable, Switch } from "../UI";
import { AccessField, AccessControl, AccessShare } from "./ClientAccess.style";

const ISSERVER = typeof window === "undefined";

const CLIENT_ACCESS = "clientAccess";
let defaultAccess = [true, true, true, true, true];
if (!ISSERVER) {
  const savedAccess = localStorage.getItem(CLIENT_ACCESS);
  if (savedAccess) defaultAccess = JSON.parse(savedAccess);
}

const ClientAccess = () => {
  const [detailsActive, setDetailsActive] = useState(defaultAccess[0]);
  const [avansuriActive, setAvansuriActive] = useState(defaultAccess[1]);
  const [workersActive, setWorkersActive] = useState(defaultAccess[2]);
  const [achizitiiActive, setAchizitiiActive] = useState(defaultAccess[3]);
  const [suplimentareActive, setSuplimentareActive] = useState(
    defaultAccess[4]
  );

  const projectName = useAppSelector((state) => state.project.name);
  const router = useRouter();
  const { projectID } = router.query;

  const accessArray = [
    detailsActive,
    avansuriActive,
    workersActive,
    achizitiiActive,
    suplimentareActive,
  ];

  useEffect(() => {
    localStorage.setItem(CLIENT_ACCESS, JSON.stringify(accessArray));
  });

  const accessQuery = accessArray.map((val) => (val ? 1 : 0)).join("");

  const shareLink = async () => {
    const projectLink = `${window.location.origin}/${projectID}?client=${accessQuery}`;
    const shareData = {
      title: "Construct Tracker",
      text: `Analizați proiectul "${projectName}"`,
      url: projectLink,
    };

    try {
      await navigator.clipboard.writeText(projectLink);
      if (window.innerWidth <= 600) {
        await navigator.share(shareData);
      } else {
        alert("Linkul proiectului a fost copiat!");
      }
    } catch (error) {
      console.log(`A avut loc o eroare: ${error}`);
    }
  };

  const invertActive = (prev: boolean) => !prev;

  return (
    <Collapsable cardTitle="Accesul Clientului">
      <AccessControl>
        <AccessField onClick={() => setDetailsActive(invertActive)}>
          <span>Detalii</span>
          <Switch enabled={detailsActive} />
        </AccessField>
        <AccessField onClick={() => setAvansuriActive(invertActive)}>
          <span>Avansuri</span>
          <Switch enabled={avansuriActive} />
        </AccessField>
        <AccessField onClick={() => setWorkersActive(invertActive)}>
          <span>Muncitori</span>
          <Switch enabled={workersActive} />
        </AccessField>
        <AccessField onClick={() => setAchizitiiActive(invertActive)}>
          <span>Achiziții</span>
          <Switch enabled={achizitiiActive} />
        </AccessField>
        <AccessField onClick={() => setSuplimentareActive(invertActive)}>
          <span>Suplimentare</span>
          <Switch enabled={suplimentareActive} />
        </AccessField>
      </AccessControl>
      <AccessShare>
        <Button onClick={shareLink}>Partajați</Button>
      </AccessShare>
    </Collapsable>
  );
};

export default ClientAccess;
