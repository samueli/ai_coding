import React from 'react';

export const SyncIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="240" height="240" rx="120" fill="currentColor" fillOpacity="0.1"/>
    <path
      d="M120 60c-33.1 0-60 26.9-60 60s26.9 60 60 60c25.9 0 48-16.6 56.2-40"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M120 60c33.1 0 60 26.9 60 60 M180 80l-20 40h40"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ManageIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="240" height="240" rx="120" fill="currentColor" fillOpacity="0.1"/>
    <rect
      x="70"
      y="80"
      width="100"
      height="80"
      rx="8"
      stroke="currentColor"
      strokeWidth="12"
    />
    <path
      d="M90 100h60M90 120h40M90 140h20"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
  </svg>
);

export const AiIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="240" height="240" rx="120" fill="currentColor" fillOpacity="0.1"/>
    <path
      d="M120 70v100M70 120h100"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <circle
      cx="120"
      cy="120"
      r="50"
      stroke="currentColor"
      strokeWidth="12"
    />
    <circle
      cx="120"
      cy="120"
      r="15"
      fill="currentColor"
    />
  </svg>
);
