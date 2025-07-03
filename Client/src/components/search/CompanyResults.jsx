import { useState } from 'react';
import { followCompany, unfollowCompany } from '../../api/companyAPI';
import useNavigation from '../../hooks/useNavigation';
import useScreenSize from '../../hooks/useScreenSize';
import useThemeClasses from '../../hooks/useThemeClasses';
import InteractionsButtons from './util/InteractionsButtons';
import useFollowCompany from '../../hooks/useFollowCompany';

function CompanyResults({ company }) {
  const { isMobile } = useScreenSize();
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { NavigateToCompany } = useNavigation();

  const { isFollowing, isDisabled, handleFollow } = useFollowCompany(
    company.isFollowing,
    company._id,
  );

  return (
    <div
      className={`${componentBGColorClass} w-full cursor-pointer ${isMobile ? 'rounded-none px-1 pb-2' : 'rounded-lg pb-5 pl-0 pr-5 pt-0'} `}
    >
      <div
        key={company._id}
        className={`flex w-full items-start gap-4 rounded-lg ${isMobile ? 'p-2' : 'p-4'} ${componentBGColorClass}`}
        onClick={() => NavigateToCompany(company._id)}
      >
        {/* Logo */}
        <img
          src={company.profilePicture}
          alt='Company Logo'
          className='object-cover rounded size-20 md:size-48'
        />

        {/* Main Content */}
        <div className='flex flex-col w-full'>
          {/* Company Info */}
          <div>
            <p
              className={`text-lg font-semibold hover:underline ${textColorClass}`}
            >
              {company.name}
            </p>
            <p className='text-sm text-gray-400'>{company.industry}</p>
            <p className='text-sm text-gray-500'>
              {company.location.city}, {company.location.country}
            </p>

            {/* Follower Count */}
            <div className='flex items-center gap-1 mt-1 text-sm text-gray-400'>
              <i className='ri-group-line' />
              <span className='font-semibold'>{company.followers}M</span>{' '}
              followers
            </div>

            {/* Mutual connections (if available) */}
            <div className='flex items-center gap-2 mt-2 text-sm text-gray-400'>
              {/* Replace with actual images if available */}
              <div className='flex -space-x-2'>
                <img
                  className='w-6 h-6 border border-white rounded-full'
                  src='https://randomuser.me/api/portraits/men/32.jpg'
                  alt='connection'
                />
                <img
                  className='w-6 h-6 border border-white rounded-full'
                  src='https://randomuser.me/api/portraits/women/44.jpg'
                  alt='connection'
                />
              </div>
              <span>
                <p className={`${textColorClass} font-semibold text-gray-500`}>
                  55 connections work here
                </p>
              </span>
            </div>
          </div>
          {isMobile ? null : (
            <InteractionsButtons
              navigator={() => NavigateToCompany(company._id)}
              handleFollow={handleFollow}
              companyID={company._id}
              disbaled={isDisabled}
              isFollowing={isFollowing}
            />
          )}
        </div>
      </div>
      {isMobile ? (
        <InteractionsButtons
          navigator={() => NavigateToCompany(company._id)}
          handleFollow={handleFollow}
          companyID={company._id}
          disbaled={isDisabled}
          isFollowing={isFollowing}
        />
      ) : null}
    </div>
  );
}

export default CompanyResults;
