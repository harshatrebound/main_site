import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const HeroContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: visible;
  padding: 80px 20px 120px;
  
  @media (max-width: 768px) {
    padding: 60px 20px 160px;
  }
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

export const StatsContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
  z-index: 10;
  padding: 0 20px;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    transform: translate(-50%, 30%);
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;

export const StatCard = styled(motion.div)`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 24px;
    max-width: 320px;
  }
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(to bottom, #FF4C39, #FFB573);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  font-family: Outfit, sans-serif;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 1.125rem;
  color: #666;
  white-space: pre-line;
  line-height: 1.4;
  font-family: Outfit, sans-serif;
  font-weight: 500;
`;

export const ContentContainer = styled(motion.div)`
  position: relative;
  padding: 0 20px;
  text-align: center;
  z-index: 2;
  max-width: 800px;
  width: 100%;
`;

export const Title = styled(motion.h1)`
  font-family: Outfit, sans-serif;
  font-size: 64px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  br {
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 16px;
  }
`;

export const Subtitle = styled(motion.p)`
  font-family: Outfit, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 48px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 32px;
  }
`;
