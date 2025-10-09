import { useState } from "react";
import styles from "./TeamCardStack.module.css";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  color: string;
}

interface TeamCardProps {
  member: TeamMember;
  isExpanded: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, isExpanded }) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: member.color,
      }}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.cardName}>{member.name}</h3>
        <p className={styles.cardTitle}>{member.title}</p>
      </div>
      <div className={styles.cardImage}>
        <img src={member.image} alt={member.name} />
      </div>
    </div>
  );
};

export default function TeamCardStack() {
  const [isExpanded, setIsExpanded] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Prad",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
      color: "#e8b4bc",
    },
    {
      id: 2,
      name: "Pradeep",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
      color: "#d4a1ab",
    },
    {
      id: 3,
      name: "Pradeep Rajan",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80",
      color: "#c08e9a",
    },
    {
      id: 4,
      name: "Dyna Jenney",
      title: "Senior Consultant",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
      color: "#a91e2d",
    },
    {
      id: 5,
      name: "Pradeep Rajan",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80",
      color: "#c08e9a",
    },
    {
      id: 6,
      name: "Rajan",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      color: "#d4a1ab",
    },
    {
      id: 7,
      name: "Rajan",
      title: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
      color: "#e8b4bc",
    },
  ];

  // Center index for hero card
  const centerIndex = Math.floor(teamMembers.length / 2);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.container}>
      <h2>Our Team</h2>
      <div
        className={`${styles.cardStack} ${isExpanded ? styles.expanded : ""}`}
      >
        {teamMembers.map((member, index) => {
          // Calculate position relative to center
          const positionFromCenter = index - centerIndex;
          const isCenter = index === centerIndex;

          return (
            <div
              key={member.id}
              className={`${styles.cardWrapper} ${
                isCenter ? styles.centerCard : ""
              }`}
              style={
                {
                  "--card-index": index,
                  "--position-from-center": positionFromCenter,
                  "--total-cards": teamMembers.length,
                  "--is-center": isCenter ? 1 : 0,
                } as React.CSSProperties
              }
            >
              <TeamCard member={member} isExpanded={isExpanded} />
            </div>
          );
        })}
      </div>

      <button className={styles.toggleButton} onClick={handleToggle}>
        {isExpanded ? "Stack Cards" : "Expand Cards"}
      </button>
    </div>
  );
}
