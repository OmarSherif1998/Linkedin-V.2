function ContactInfoFooter({ pageNumber, onNext, onBack, onSubmit }) {
  const FooterButton = ({ onClick, className, children }) => (
    <button onClick={onClick} className={`text-sm font-semibold ${className}`}>
      {children}
    </button>
  );

  const BackButton = ({ onClick }) => (
    <FooterButton onClick={onClick} className="ml-auto text-blue-400">
      Back
    </FooterButton>
  );

  const ActionButton = ({ onClick, children }) => (
    <FooterButton
      onClick={onClick}
      className={`${pageNumber === 0 ? "ml-auto" : ""} rounded-full bg-blue-400 px-4 py-1 text-blue-900`}
    >
      {children}
    </FooterButton>
  );

  return (
    <div className="mt-2 flex w-full items-center gap-3 border-t border-gray-700 pt-2">
      {pageNumber === 0 ? (
        <ActionButton onClick={onNext}>Next</ActionButton>
      ) : pageNumber === 3 ? (
        <>
          <BackButton onClick={onBack} />
          <ActionButton onClick={onSubmit}>Submit</ActionButton>
        </>
      ) : (
        <>
          <BackButton onClick={onBack} />
          <ActionButton onClick={onNext}>Next</ActionButton>
        </>
      )}
    </div>
  );
}

export default ContactInfoFooter;
