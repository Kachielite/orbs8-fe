import {AuthEntity} from "@/features/authentication/domain/entity/auth.entity";

export type AuthSlice = {
  //state
  auth: AuthEntity | null;
  //actions
  setAuth: (auth: AuthEntity | null) => void;
};