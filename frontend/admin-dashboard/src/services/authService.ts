export interface User {
  id: number;
  username: string;
  token: string;
}

// Mock login API
export const login = async (username: string, password: string): Promise<User> => {
  // simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (username === "admin" && password === "admin") {
    return { id: 1, username: "admin", token: "mock-jwt-token" };
  } else {
    throw new Error("Invalid credentials");
  }
};
