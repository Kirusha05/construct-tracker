import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Card, SectionHeader } from ".";

const CollapsableCard = styled(Card)`
  & > * {
    width: 100%;
  }
`;

interface IProps {
  cardTitle: string;
  children: React.ReactNode;
  openByDefault?: boolean;
}

const Collapsable = ({ cardTitle, children, openByDefault }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(openByDefault || false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => {
      const cardTop = cardRef.current!.getBoundingClientRect().top;
      const scrollOffset = -10;
      const yScroll = cardTop + window.pageYOffset + scrollOffset;
      window.scrollTo({ top: yScroll, behavior: "smooth" });
    }, 100);
  }, [isOpen]);

  return (
    <CollapsableCard ref={cardRef}>
      <SectionHeader
        title={cardTitle}
        open={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && children}
    </CollapsableCard>
  );
};

export default Collapsable;
