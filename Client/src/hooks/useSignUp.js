/** @format */

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkEmailExists, registerUser } from "../api/registrationAPI";
import { authenticateUser, fetchMyData } from "../api/userAPI";
import { useNavigation } from "./useNavigation";
import { login } from "../Redux/sllices/userSlice";
import useLoading from "./useLoading";

export function useSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState(false);
  const [matchedPassword, setMatchedPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revisible, setReVisible] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const { loading, setLoading } = useLoading();
  const [minChar, setMinChar] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [noWhitespace, setNoWhitespace] = useState(true);

  const dispatch = useDispatch();
  const { NavigateToHome } = useNavigation();

  const validatePassword = (password, confirmPassword) => {
    const meetsRequirements = {
      minChar: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noWhitespace: !/\s/.test(password),
      matchPasswords: password === confirmPassword,
    };

    setMinChar(meetsRequirements.minChar);
    setHasLowercase(meetsRequirements.hasLowercase);
    setHasUppercase(meetsRequirements.hasUppercase);
    setHasNumber(meetsRequirements.hasNumber);
    setHasSpecialChar(meetsRequirements.hasSpecialChar);
    setNoWhitespace(meetsRequirements.noWhitespace);
    setMatchedPassword(meetsRequirements.matchPasswords);

    return Object.values(meetsRequirements).every(Boolean);
  };
  useEffect(() => {
    setStrongPassword(validatePassword(password, confirmPassword));
  }, [password, confirmPassword]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const toggleVisibility = (setter) => () => {
    setter((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setWarning(true);
      setWarningMessage("Please fill in all fields");
      return;
    }

    if (!matchedPassword) {
      setWarning(true);
      setWarningMessage("Passwords do not match");
      return;
    }

    if (!strongPassword) {
      setWarning(true);
      setWarningMessage("Please enter a password that meets the requirements");
      return;
    }

    setLoading(true); // Start loading

    try {
      const exist = await checkEmailExists(email);
      if (exist.exists) {
        setWarningMessage("Email already exists");
        setWarning(true);
        setLoading(false); // Stop loading
        return;
      }

      const userData = { firstName, lastName, email, password };
      await registerUser(userData);
      const token = await authenticateUser({ email, password });
      const userInfo = await fetchMyData(token);
      localStorage.setItem("token", token);
      dispatch(login(userInfo));
      NavigateToHome();
    } catch (error) {
      console.error("Error during registration:", error);
      setWarningMessage("An error occurred during registration");
      setWarning(true);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    strongPassword,
    matchedPassword,
    visible,
    revisible,
    warning,
    warningMessage,
    loading,
    minChar,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
    noWhitespace,
    setLoading,
    setFirstName,
    setLasttName,
    setEmail,
    setPassword,
    setConfirmPassword,
    togglePasswordVisibility: toggleVisibility(setVisible),
    toggleRePasswordVisibility: toggleVisibility(setReVisible),
    handleInputChange,
    handleSubmit,
    validatePassword,

    onClose: () => setWarning(false),
  };
}
