"use client";
import { useState, ChangeEvent, MouseEvent } from "react";

// MUI
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// COMPONENTS
import { ToastContainer } from "react-toastify";
// HOOKS
import { useUpdateUser, useUserById } from "@/hooks/useUser";
import { useAlert } from "@/hooks/useAlert";
// ICONS
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMail, MdPhotoLibrary } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";

// TYPES
import { IUser } from "@/types/user";

export default function Account() {
  const [signUpData, setSignUpData] = useState<IUser>({
    code: process.env.NEXT_PUBLIC_USER_CODE,
    name: "",
    email: "",
    password: "",
    phone: "",
    img: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(file.name);
        setSignUpData({ ...signUpData, img: file });
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = () => {};
  return (
    <div className="flex flex-col">
      <div className="w-52 h-52 mx-auto my-4 bg-[#d3d3d3] rounded-full" />
      {/* Form */}

      <div className="flex pb-4 gap-4 flex-wrap b w-full">
        {/* Username */}
        <TextField
          id="username-signup"
          label="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaRegUserCircle />
              </InputAdornment>
            ),
          }}
          required
          placeholder="mateo"
          variant="outlined"
          className="w-[30%] max-md:w-full"
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
          required
          variant="outlined"
          className="w-[30%] max-md:w-full"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoPhonePortraitOutline />
              </InputAdornment>
            ),
          }}
          value={signUpData.phone}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            handleSignUpInputChange(e, "phone")
          }
        />

        {/* Email */}
        <TextField
          id="email-signup"
          label="Email"
          className="w-[30%] max-md:w-full"
          placeholder="mateo@gmail.com"
          required
          variant="outlined"
          value={signUpData.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineMail />
              </InputAdornment>
            ),
          }}
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            handleSignUpInputChange(e, "email")
          }
        />
        {/* Password */}
        <FormControl variant="outlined" className="w-[30%] max-md:w-full">
          <InputLabel required htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password-signup"
            placeholder="mateo123"
            value={signUpData.password}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              handleSignUpInputChange(e, "password")
            }
            startAdornment={
              <InputAdornment position="start">
                <LuKeyRound />
              </InputAdornment>
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
        {/* Confirm Password */}
        <FormControl variant="outlined" className="w-[30%] max-md:w-full">
          <InputLabel required htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirm-password-signup"
            placeholder="mateo123"
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
            label="Confirm Password*"
          />
        </FormControl>
      </div>
      <div className="w-full flex mb-2 justify-center">
        <button
          onClick={onSubmit}
          className="w-[40%] max-md:w-[100%]  text-white p-2 rounded-md btn-auth font-semibold"
        >
          Update profile
        </button>
      </div>
      {/* Alert */}
      <ToastContainer />
    </div>
  );
}
