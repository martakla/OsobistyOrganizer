export type User = {
  name: string;
  email: string;
  password: string;
};

type LoginResult =
    | { success: true }
    | { success: false; message: string };

const isBrowser = typeof window !== "undefined";

export const getCurrentUser = (): string | null => {
  if (!isBrowser) {
    return null;
  }

  return localStorage.getItem("currentUser");
};

export const getCurrentUserData = (): User | null => {
  if (!isBrowser) {
    return null;
  }

  const currentUserEmail = getCurrentUser();

  if (!currentUserEmail) {
    return null;
  }

  const userData = localStorage.getItem("user");

  if (!userData) {
    return null;
  }

  const user: User = JSON.parse(userData);

  if (user.email !== currentUserEmail) {
    return null;
  }

  return user;
};

export const loginUser = (
    email: string,
    password: string
): LoginResult => {
  if (!isBrowser) {
    return { success: false, message: "Browser storage is not available" };
  }

  const userData = localStorage.getItem("user");

  if (!userData) {
    return { success: false, message: "Brak konta" };
  }

  const storedUser: User = JSON.parse(userData);

  if (
      storedUser.email !== email ||
      storedUser.password !== password
  ) {
    return { success: false, message: "Niepoprawne dane" };
  }

  localStorage.setItem("currentUser", email);

  return { success: true };
};

export const registerUser = (user: User) => {
  if (!isBrowser) {
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUser = () => {
  if (!isBrowser) {
    return;
  }

  localStorage.removeItem("currentUser");
};