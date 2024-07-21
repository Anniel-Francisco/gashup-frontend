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
// HOOKS
import { useAlert } from "@/hooks/useAlert";
import { useLogIn } from "@/hooks/useAuth";
// ICONS
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
// TYPES
import { IUser } from "@/types/user";

// COMPONENTS
import { ToastContainer } from "react-toastify";
import { Spinner } from "../Spinner/Spinner";
// STYLES
import "@/styles/general/auth.css";

interface Props {
  onClose: () => void;
  setAuthState: () => void;
}

type LogiDataType = Pick<IUser, "email" | "password">;

export default function LogIn({ onClose, setAuthState }: Props) {
  const [loginData, setLoginData] = useState<LogiDataType>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // HOOKS
  const [showAlert] = useAlert();
  const [loading, load] = useLogIn(loginData);

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
  const onSubmit = async () => {
    if (!loginData.email || !loginData.password) {
      showAlert("warning", "You must fill out both fields");
    } else {
      let { response, error } = await load();
      if (error) {
        showAlert(
          "error",
          error && error.response
            ? error.response.data.mensaje
            : "The server may be experiencing problems"
        );
      } else if (response) {
        setLoginData({
          email: "",
          password: "",
        });
        onClose();
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      {/* Close Button */}
      <div className="flex justify-end px-4 pt-4">
        <IoCloseOutline
          fontSize={25}
          onClick={onClose}
          className="hover:bg-[#9b26b6] hover:text-white cursor-pointer rounded-full"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col flex-grow justify-evenly px-8 max-md:px-6">
        {/* Head */}
        <h2 className="font-bold text-3xl text-[#9b26b6]">Log In</h2>
        {/* Form */}
        <div className="flex flex-col">
          <FormControl className="gap-2">
            {/* Email */}
            <TextField
              id="email-login"
              label="Email"
              placeholder="mateo@gmail.com"
              variant="outlined"
              required
              className="w-full"
              value={loginData.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdOutlineMail />
                  </InputAdornment>
                ),
              }}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleLogInInputChange(e, "email")
              }
            />
            {/* Password */}
            <FormControl variant="outlined" className="w-full">
              <InputLabel required htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="password-login"
                placeholder="mateo123"
                value={loginData.password}
                startAdornment={
                  <InputAdornment position="start">
                    <LuKeyRound />
                  </InputAdornment>
                }
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
                label="Password*"
              />
            </FormControl>
          </FormControl>
        </div>
        {/* Button */}
        <div className="mt-4">
          <button
            onClick={onSubmit}
            className="w-full text-white p-2 font-semibold rounded-sm btn-auth"
          >
            Log In
          </button>
          <div className="flex justify-center mt-2 items-center gap-1">
            <span className="primary">Create new accout</span>
            <span
              onClick={setAuthState}
              className="primary hover:underline cursor-pointer font-bold"
              style={{color: '#9b26b6'}}
            >
              Sign Up
            </span>
          </div>
        </div>
      </div>
      {/* Alert */}
      <ToastContainer />
       {/* Spinner */}
       <Spinner loading={loading} message="processing"/>
    </div>
  );
}
