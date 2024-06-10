import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// TYPES
import { IUser } from "@/types/user";

import { ToastContainer, toast } from "react-toastify";

// HOOKS
import { useSingUp } from "@/hooks/useAuth";
import { useAlert } from "@/hooks/useAlert";
// ICONS
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";

// STYLES
import "@/styles/general/auth.css";

interface Props {
  setAuthState: () => void;
}

export default function SignUp({ setAuthState }: Props) {
  // VARIABLES
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<IUser>({
    code: "USER",
    name: "",
    email: "",
    password: "",
    phone: "",
    img: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // HOOKS
  const [showAlert, Alert] = useAlert();
  const [loading, load] = useSingUp(signUpData);
  // FUNCTIONS
  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };
  const handleClickShowConfirmPassword = (): void => {
    setShowConfirmPassword((show) => !show);
  };
  const handleSignUpInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };
  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    const keys: (keyof IUser)[] = ["name", "email", "password", "phone"];
    const isReady = keys.every((key) => signUpData[key]);

    if (isReady) {
      if (signUpData.password === confirmPassword) {
        let { response, error } = await load();
        if (error) {
          showAlert("error", error.response?.data.message);
        } else if (response) {
          showAlert("success", response?.data.message);
          setSignUpData({
            code: "USER",
            name: "",
            email: "",
            password: "",
            phone: "",
            img: "",
          });
          setConfirmPassword("");
        }
      } else {
        showAlert("warning", "Different passwords");
      }
    } else {
      showAlert("warning", "You must fill out all fields");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Close Button */}
      <div className="flex px-4 pt-4">
        <FaArrowLeftLong
          fontSize={25}
          onClick={setAuthState}
          className="icon p-1 cursor-pointer rounded-full"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col flex-grow justify-evenly px-8 max-md:px-6">
        {/* Head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl primary">Sign Up</h2>
          <div className="image-container cursor-pointer flex items-center justify-center">
            <FaPlus color="white" />
          </div>
        </div>
        {/* Form */}
        <div className="flex flex-col">
          {/* Username */}
          <FormControl className="gap-2">
            <TextField
              id="username-signup"
              label="Username"
              placeholder="juan"
              variant="outlined"
              className="w-full"
              value={signUpData.name}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleSignUpInputChange(e, "name")
              }
            />
            {/* Phone */}
            <TextField
              id="phone-signup"
              label="Phone"
              placeholder="829-394-3414"
              variant="outlined"
              className="w-full"
              value={signUpData.phone}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleSignUpInputChange(e, "phone")
              }
            />

            {/* Email */}
            <TextField
              id="email-signup"
              label="Email"
              placeholder="juan@gmail.com"
              variant="outlined"
              value={signUpData.email}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleSignUpInputChange(e, "email")
              }
              className="w-full"
            />
            {/* Password */}
            <FormControl variant="outlined" className="w-full">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password-signup"
                placeholder="juan123"
                value={signUpData.password}
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSignUpInputChange(e, "password")
                }
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            {/* Confirm Password */}
            <FormControl variant="outlined" className="w-full">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirm-password-signup"
                placeholder="juan123"
                value={confirmPassword}
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </FormControl>
        </div>
        {/* Button */}
        <div className="mt-4">
          <button
            onClick={onSubmit}
            className="w-full text-white p-2 rounded-sm btn-auth font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
