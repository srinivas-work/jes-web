import { useState } from "react";
import styles from "./TeamCardStack.module.css";

interface TeamMember {
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
    // {
    //   id: 3,
    //   name: "Brad Tully",
    //   title: "Engineering Partner",
    //   image: "/img/team/brad_tully.png",
    //   color: "#c08e9a",
    // },

    {
      name: "Daryl Showalter",
      title: "Sr. Technical Advisor",
      image: "/img/team/daryl_showalter.jpg",
      color: "#e8b4bc",
    },

    {
      name: "John Weykar",
      title: "Director of Sales",
      image: "/img/team/john_weykar.jpg",
      color: "#d4a1ab",
    },
    {
      name: "Bruce Dorey",
      title: "Partner & CEO",
      image: "/img/team/bruce_dorey.jpg",
      color: "#a91e2d",
    },
    {
      name: "Suchit Pradeep",
      title: "Director of Engineering",
      image: "/img/team/suchit_pradeep.jpg",
      color: "#c08e9a",
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
              key={index}
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
        {isExpanded ? "Hide Team" : "Show Team"}
      </button>
    </div>
  );
}
