import { useState, ChangeEvent } from "react";
// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//
import { IoCloseOutline } from "react-icons/io5";
// STYLES
import "@/styles/general/auth.css";
interface Props {
  onClose: () => void;
  setAuthState: () => void;
}

export default function LogIn({ onClose, setAuthState }: Props) {
  const [loginData, setLoginData] = useState<object>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const handleLogInInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  return (
    <div className="flex flex-col h-full">
      {/* Close Button */}
      <div className="flex justify-end px-4 pt-4">
        <IoCloseOutline
          fontSize={25}
          onClick={onClose}
          className="icon cursor-pointer rounded-full"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col flex-grow justify-evenly px-8 max-md:px-6">
        {/* Head */}
        <h2 className="font-bold text-3xl primary">Log In</h2>
        {/* Form */}
        <div className="flex flex-col">
          <FormControl className="gap-2">
            {/* Email */}
            <TextField
              id="email-login"
              label="Email"
              placeholder="juan@gmail.com"
              variant="outlined"
              className="w-full"
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleLogInInputChange(e, "email")
              }
            />
            {/* Password */}
            <FormControl variant="outlined" className="w-full">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password-login"
                placeholder="juan123"
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  handleLogInInputChange(e, "password")
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
          </FormControl>
        </div>
        {/* Button */}
        <div className="mt-4">
          <button className="w-full text-white p-2 font-semibold rounded-sm btn-auth">
            Log In
          </button>
          <div className="flex justify-center mt-2 items-center gap-1">
            <span className="primary">Create new accout</span>
            <span
              onClick={setAuthState}
              className="primary hover:underline cursor-pointer font-bold"
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
