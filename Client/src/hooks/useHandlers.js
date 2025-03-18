/** @format */

import { useState } from "react";

export function useHandlers() {
  const [isPicForm, setIsPicForm] = useState(false);
  const [isFormOpened, setIsformOpened] = useState(false);

  const handleChangePic = () => {
    setIsPicForm(!isPicForm);
    console.log(isPicForm);
  };

  return {
    isPicForm,
    isFormOpened,
    handleChangePic,
    setIsformOpened,
  };
}
