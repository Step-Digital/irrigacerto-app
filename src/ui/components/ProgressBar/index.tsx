import React from 'react';
import { Container } from './styles';

interface ProgressBarProps {
  width: string;
  active: boolean;
}

export const ProgressBar = ({ width, active }: ProgressBarProps) => {
  return <Container active={active} width={width}  />
}