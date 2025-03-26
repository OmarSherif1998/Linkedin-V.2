/** @format */

const roomIdGenearator = (user1, user2) => {
  const roomID = [user1, user2].sort().join("_");

  return roomID;
};

export default roomIdGenearator;
