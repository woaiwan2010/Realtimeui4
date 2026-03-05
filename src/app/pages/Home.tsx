import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/model-processing");
  }, [navigate]);
  
  return null;
}
