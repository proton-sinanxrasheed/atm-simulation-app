import React, { useState } from "react";
import { useBalance } from "./BalanceContext";

interface SignUpProps {
  onBack: () => void;
  onSignUpSuccess: (name: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onBack, onSignUpSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useBalance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!name || !username || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (localStorage.getItem(username)) {
      setError("Username already exists. Please choose a different one.");
      setIsLoading(false);
      return;
    }

    const user = { username, password, name };
    localStorage.setItem(username, JSON.stringify(user));
    setCurrentUser(username);
    onSignUpSuccess(name);
    setIsLoading(false);
  };

  return (
    <div className="auth-container fade-in">
      <div className="container">
        <div className="auth-card card slide-up">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    fill="var(--primary-blue)"
                  />
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="10"
                    rx="1"
                    fill="var(--white)"
                  />
                  <rect
                    x="6"
                    y="7"
                    width="4"
                    height="2"
                    fill="var(--primary-blue)"
                  />
                  <rect
                    x="6"
                    y="10"
                    width="6"
                    height="1"
                    fill="var(--neutral-300)"
                  />
                  <rect
                    x="6"
                    y="12"
                    width="8"
                    height="1"
                    fill="var(--neutral-300)"
                  />
                  <circle cx="16" cy="9" r="1.5" fill="var(--accent-blue)" />
                  <rect
                    x="2"
                    y="17"
                    width="20"
                    height="2"
                    rx="1"
                    fill="var(--neutral-300)"
                  />
                </svg>
              </div>
            </div>
            <h1>Join SecureBank</h1>
            <p>Create your secure banking account</p>
          </div>

          <div className="card-body">
            {error && (
              <div className="alert alert-error">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="9"
                    x2="9"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="9"
                    y1="9"
                    x2="15"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="10"
                      x2="21"
                      y2="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Create Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="Choose a unique username"
                  required
                  disabled={isLoading}
                  minLength={3}
                />
                <div className="text-xs text-neutral-500 mt-1">
                  Username must be at least 3 characters long
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="m7 11V7a5 5 0 0 1 10 0v4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Create Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Create a secure password"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
                <div className="text-xs text-neutral-500 mt-1">
                  Password must be at least 6 characters long
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={onBack}
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12 19-7-7 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          className="opacity-75"
                        />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="9"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="m19 8 2 2-2 2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m21 10-7.5 0"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer text-center">
            <div className="text-xs text-neutral-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy. Your account is protected by 256-bit encryption
              and FDIC insurance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
