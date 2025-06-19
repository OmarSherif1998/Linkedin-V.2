/** @format */

import { acceptRequest, rejectRequest } from '../../../../api/connectionAPI';
import useThemeClasses from '../../../../hooks/useThemeClasses';
import LoadingSpinner from '../../../util/LoadingSpinner';
import PendingRequestCard from './PendingRequestCard';

function PendingConnections({
  setPendingRequests,
  pendingRequests,
  isLoading,
}) {
  const { componentBGColorClass, textColorClass, hoverColorClass } =
    useThemeClasses();
  const handleAccept = async (_id, userID) => {
    setPendingRequests((prev) => prev.filter((req) => req._id !== _id));

    try {
      const response = await acceptRequest(_id, userID);
      if (response !== 200) {
        throw new Error('Server responded with error');
      }
    } catch (error) {
      setPendingRequests((prev) => [...prev, { _id, userID }]);
      console.error('Accept request failed', error);
    }
  };

  const handleReject = async (_id, userID) => {
    const previousRequests = [...pendingRequests];
    setPendingRequests((prev) => prev.filter((req) => req._id !== _id));

    try {
      const response = await rejectRequest(_id, userID);

      if (response.status !== 200) {
        throw new Error('Reject request failed');
      }
    } catch (error) {
      // 2. Roll back if the request fails
      setPendingRequests(previousRequests);
      console.error('ERROR PROCESSING THE REJECT REQUEST', error);
    }
  };

  return (
    <div
      className={`${componentBGColorClass} border p-3 text-sm font-semibold md:rounded-lg md:p-5 md:text-lg md:shadow-lg`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : pendingRequests?.length === 0 ? (
        <section className='flex items-center justify-between'>
          <p className={`${textColorClass} text-xs font-normal md:text-sm`}>
            No pending invitations
          </p>
          <button
            className={`${hoverColorClass} rounded-md p-1 text-xs ${textColorClass} hover:bg-gray-200 md:text-sm`}
          >
            Manage
          </button>
        </section>
      ) : (
        <div className='flex flex-col gap-3 md:gap-4'>
          <h1 className={`${textColorClass} text-sm md:text-lg`}>
            Pending Requests ({pendingRequests?.length}) :
          </h1>
          {pendingRequests?.map((request) => (
            <PendingRequestCard
              key={request._id}
              request={request}
              handleAccept={handleAccept}
              handleReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PendingConnections;
