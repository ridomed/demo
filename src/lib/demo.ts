import "server-only";

// Public sample credentials only. Never expose real environment secrets.
export function getDemoCredentials() {
  if (process.env.DEMO_MODE !== "true") return null;
  return {
    email: "admin@sytemano.com",
    password: "Qmin@Fe",
    deletePassword: "3956",
  };
}
