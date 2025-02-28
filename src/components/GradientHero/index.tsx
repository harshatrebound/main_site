import { useInView } from 'react-intersection-observer';
import { memo, useMemo } from 'react';
import {
  HeroContainer,
  ContentContainer,
  Title,
  Subtitle,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
} from './styles';
import { fadeInUp, fadeInScale, staggerChildren } from './animations';
import { useActivities, useDestinations } from '../../lib/hooks/useSupabaseData';

interface GradientHeroProps {
  className?: string;
}

// Team building related hero images
const teamBuildingImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop", // Team with hands together
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop", // Team meeting
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop", // Team collaboration
  "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=2070&auto=format&fit=crop", // Team success
  "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=2069&auto=format&fit=crop"  // Team outdoor activity
];

const GradientHero: React.FC<GradientHeroProps> = ({ className }) => {
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true
  });

  const { activities, loading: activitiesLoading } = useActivities();
  const { destinations, loading: destinationsLoading } = useDestinations();

  // Select a random team building image
  const heroImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * teamBuildingImages.length);
    return teamBuildingImages[randomIndex];
  }, []);

  // Calculate real-time stats
  const stats = [
    {
      number: activities?.length.toString() || '0',
      label: 'Unique Activities\nAvailable'
    },
    {
      number: destinations?.length.toString() || '0',
      label: 'Amazing Destinations\nto Explore'
    },
    {
      number: '4.9/5',
      label: 'Stellar Feedback\non Google'
    }
  ];

  if (activitiesLoading || destinationsLoading) {
    return <div>Loading...</div>; // You might want to add a proper loading state UI
  }

  return (
    <div className="relative">
      <HeroContainer ref={ref} className={className}>
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${heroImage}')`, 
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.5)]" />
        </div>
        <ContentContainer variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <Title
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            Transform Your Team<br />Into Champions
          </Title>
          <Subtitle
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.15 }}
          >
            Your Ultimate Team Building and Experience Hub
          </Subtitle>
        </ContentContainer>

        <StatsContainer variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInScale}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </HeroContainer>
      <div className="h-[100px] bg-white" /> {/* Spacer for stats overlap */}
    </div>
  );
};

export default memo(GradientHero);
