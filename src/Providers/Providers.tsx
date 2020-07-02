import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "../Routes";

interface ProviderProps {}

export const Providers: React.FC<ProviderProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
