import AboutHero from '@/components/about/AboutHero';
import AboutInsight from '@/components/about/AboutInsight';
import AboutMission from '@/components/about/AboutMission';
import AboutTeams from '@/components/about/AboutTeams';
import AboutValues from '@/components/about/AboutValues';
import Newsletter from '@/components/generic/Newsletter';

const About = () => {
  return (
    <>
    <AboutHero />
    <AboutMission />
    <AboutInsight/>
    <AboutValues/>
    <AboutTeams/>
    <Newsletter/>
    </>
  )
}

export default About