import React from 'react';
import { LoadAchievements } from '../../components';
import { useExample } from '../../contexts';

export default function AchievementPage() {
  //Achievements should have been grabbed when they logged in
  const { achievements } = useExample();

  return <div>index</div>;
}
