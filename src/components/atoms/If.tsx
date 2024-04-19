import React from 'react';

type Props = {
  condition: boolean;
  children: React.ReactNode;
};

export const If: React.FC<Props> = ({condition, children}) => {
  return condition ? children : null;
};
