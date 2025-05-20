function ConnectionRibbon({ isConnected, isConnectedMessage }) {
  return (
    <>
      {!isConnected && (
        <div className="fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-red-500 w-fit">
          Server disconnected. Reconnecting...
        </div>
      )}
      {isConnectedMessage && (
        <div className="fixed bottom-0 left-0 z-50 p-2 text-sm text-center text-white bg-green-500 w-fit">
          Connected
        </div>
      )}
    </>
  );
}

export default ConnectionRibbon;
