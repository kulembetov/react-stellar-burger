import {
  getUser,
  logOut,
  login,
  patchUser,
  postRegister,
} from "../../utils/api";
import { AppDispatch } from "../types";
import { IUser, IUserLogin } from "../types/data";

export const GET_USER_REQUEST = "GET_DATA_REQUEST";
export const GET_USER_SUCCESS = "GET_DATA_SUCCESS";
export const GET_USER_FAILED = "GET_DATA_FAILED";

export const PATCH_USER_REQUEST = "PATCH_DATA_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_DATA_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_DATA_FAILED";

export const POST_SIGNIN_REQUEST = "POST_SIGNIN_REQUEST";
export const POST_SIGNIN_SUCCESS = "POST_SIGNIN_SUCCESS";
export const POST_SIGNIN_FAILED = "POST_SIGNIN_FAILED";

export const POST_SIGNOUT_REQUEST = "POST_SIGNOUT_REQUEST";
export const POST_SIGNOUT_SUCCESS = "POST_SIGNOUT_SUCCESS";
export const POST_SIGNOUT_FAILED = "POST_SIGNOUT_FAILED";

export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";

export const SET_AUTHORIZATION_CHECKED = "SET_AUTHORIZATION_CHECKED";
export const SET_USER = "SET_USER";

export interface IPostRegisterAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly user: Readonly<IUser>;
}

export interface ISetAuthorizationCheckedAction {
  readonly type: typeof SET_AUTHORIZATION_CHECKED;
  readonly payload: boolean;
}

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: Readonly<IUser> | null;
}

export interface IPatchUserAction {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserFailedAction {
  readonly type: typeof PATCH_USER_FAILED;
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly user: IUser;
}

export interface ISignInAction {
  readonly type: typeof POST_SIGNIN_REQUEST;
}

export interface ISignInFailedAction {
  readonly type: typeof POST_SIGNIN_FAILED;
}

export interface ISignInSuccessAction {
  readonly type: typeof POST_SIGNIN_SUCCESS;
  readonly user: Readonly<IUser>;
}

export interface ISignOutAction {
  readonly type: typeof POST_SIGNOUT_REQUEST;
}

export interface ISignOutFailedAction {
  readonly type: typeof POST_SIGNOUT_FAILED;
}

export interface ISignOutSuccessAction {
  readonly type: typeof POST_SIGNOUT_SUCCESS;
}

export type TUserActions =
  | IPostRegisterAction
  | IPostRegisterFailedAction
  | IPostRegisterSuccessAction
  | ISetAuthorizationCheckedAction
  | ISetUserAction
  | IPatchUserAction
  | IPatchUserFailedAction
  | IPatchUserSuccessAction
  | ISignInAction
  | ISignInFailedAction
  | ISignInSuccessAction
  | ISignOutAction
  | ISignOutFailedAction
  | ISignOutSuccessAction;

export const patchUserRequest = (): IPatchUserAction => ({
  type: PATCH_USER_REQUEST,
});

export const patchUserSuccess = (user: IUser): IPatchUserSuccessAction => ({
  type: PATCH_USER_SUCCESS,
  user,
});

export const patchUserFailed = (): IPatchUserFailedAction => ({
  type: PATCH_USER_FAILED,
});

export const postRegisterRequest = (): IPostRegisterAction => ({
  type: POST_REGISTER_REQUEST,
});

export const postRegisterFailed = (): IPostRegisterFailedAction => ({
  type: POST_REGISTER_FAILED,
});

export const postRegisterSuccess = (
  user: IUser
): IPostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
  user,
});

export const postSignInRequest = (): ISignInAction => ({
  type: POST_SIGNIN_REQUEST,
});

export const postSignInFailed = (): ISignInFailedAction => ({
  type: POST_SIGNIN_FAILED,
});

export const postSignInSuccess = (user: IUser): ISignInSuccessAction => ({
  type: POST_SIGNIN_SUCCESS,
  user,
});

export const postSignOutRequest = (): ISignOutAction => ({
  type: POST_SIGNOUT_REQUEST,
});

export const postSignOutFailed = (): ISignOutFailedAction => ({
  type: POST_SIGNOUT_FAILED,
});

export const postSignOutSuccess = (): ISignOutSuccessAction => ({
  type: POST_SIGNOUT_SUCCESS,
});

export const postRegisterFetch = (array: IUser) => {
  return (dispatch: AppDispatch) => {
    dispatch(postRegisterRequest());

    postRegister(array)
      .then((res) => {
        dispatch(postRegisterSuccess(res.register));
      })
      .catch(() => {
        dispatch(postRegisterFailed());
      });
  };
};

export const setAuthorizationChecked = (
  value: boolean
): ISetAuthorizationCheckedAction => ({
  type: SET_AUTHORIZATION_CHECKED,
  payload: value,
});

export const setUser = (user: Readonly<IUser> | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const getUserFetch = () => {
  return function (dispatch: AppDispatch) {
    return getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUserFetch = (form: IUser) => {
  return function (dispatch: AppDispatch) {
    dispatch(patchUserRequest());
    patchUser(form)
      .then((res) => {
        dispatch(patchUserSuccess(res.user));
        dispatch(setUser(res.user));
      })
      .catch(() => {
        dispatch(patchUserFailed());
      });
  };
};

export const register = (form: IUser) => {
  return (dispatch: AppDispatch) => {
    dispatch(postRegisterRequest());

    postRegister(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(postRegisterSuccess(res.register));
        dispatch(setUser(res.register));
        dispatch(setAuthorizationChecked(true));
      })
      .catch(() => {
        dispatch(postRegisterFailed());
      });
  };
};

export const authentication = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUserFetch())
        .then(() => {
          dispatch(setAuthorizationChecked(true));
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
          dispatch(setAuthorizationChecked(true));
        });
    } else {
      dispatch(setAuthorizationChecked(true));
    }
  };
};

export const signIn = (form: IUserLogin) => {
  return function (dispatch: AppDispatch) {
    dispatch(postSignInRequest());
    login(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(postSignInSuccess(res.user));
        dispatch(setUser(res.user));
        dispatch(setAuthorizationChecked(true));
      })
      .catch(() => {
        dispatch(postSignInFailed());
      });
  };
};

export const signOut = () => {
  return function (dispatch: AppDispatch) {
    dispatch(postSignOutRequest());
    logOut()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(postSignOutRequest());
        dispatch(setUser(null));
      })
      .catch(() => {
        dispatch(postSignOutFailed());
      });
  };
};
