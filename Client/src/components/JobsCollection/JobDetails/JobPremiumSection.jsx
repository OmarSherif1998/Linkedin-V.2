import useThemeClasses from '../../../hooks/useThemeClasses';
import PremiumFeaturesCarousel from './PremiumFeaturesCarousel';

function JobPremiumSection() {
  const { textColorClass } = useThemeClasses();

  return (
    <div className={`${textColorClass} flex flex-col gap-5`}>
      <section>
        <h1 className='md:text-xl'>How your profile and resume fit this job</h1>
        <p className='text-sm'>
          Get AI-powered advice on this job and more exclusive features with
          Premium.{' '}
          <span className='text-blue-400 underline'>Activate Premium</span>
        </p>
      </section>
      <section>
        <PremiumFeaturesCarousel />
      </section>
    </div>
  );
}

export default JobPremiumSection;
