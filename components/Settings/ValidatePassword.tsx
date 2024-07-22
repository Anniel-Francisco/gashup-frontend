import { useState, ChangeEvent, MouseEvent } from "react";
import Modal from "@/components/Modal";
import bcrypt from "bcryptjs";

// MUI
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
// HOOKS
import { useAlert } from "@/hooks/useAlert";
interface Props {
  currentPassword: string | undefined;
  setCurrentPassword: (password: string) => void;
}
export function ValidatePassword({
  currentPassword,
  setCurrentPassword,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert] = useAlert();
  const [modal, setModal] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const onClose = async () => {
    const passwordMatch = await bcrypt.compare(
      password,
      currentPassword ? currentPassword : ""
    );
    if (passwordMatch) {
      setModal(false);
      setCurrentPassword(password);
    } else {
      if (!password) {
        showAlert("warning", "Campo vacío");
      } else {
        showAlert("warning", "Contraseña incorrecta");
      }
    }
  };
  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };
  const handleSignUpInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };
  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };
  return (
    <Modal height={200} modal={modal} onClose={onClose}>
      <div className="p-5">
        <h2 className="text-center text-lg font-semibold text-[#2c3e50]">
          Verificación de Contraseña
        </h2>
        <div className="mt-4">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password-signup"
              placeholder="ejemplo123"
              value={password}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleSignUpInputChange(e)
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
        </div>
        <div className="mt-4">
          <Button
            onClick={onClose}
            className="w-full"
            variant="contained"
            style={{ backgroundColor: "#9b26b6" }}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
