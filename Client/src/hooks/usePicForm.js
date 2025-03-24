/** @format */

import { useState } from "react";

export function usePicForm() {
  const [isPicForm, setIsPicForm] = useState(false);
  const [isFormOpened, setIsformOpened] = useState(false);

  const handleChangePic = () => {
    setIsPicForm(!isPicForm);
  };

  return {
    isPicForm,
    isFormOpened,
    handleChangePic,
    setIsformOpened,
  };
}
