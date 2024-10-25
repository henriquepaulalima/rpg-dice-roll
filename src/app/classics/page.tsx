'use client';

import styles from './page.module.scss';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import React, { useState } from 'react';

export default function Classics() {
  const [diceType, setDiceType] = useState<DiceType>(DiceType.D4);
  const [diceTypesList] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const handleDiceTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: DiceType
  ) => {
    setDiceType(newValue);
  };

  return (
    <section className={styles.classics__container}>
      <ToggleButtonGroup
        value={diceType}
        className={styles.classics__dice_type_select}
        exclusive
        onChange={handleDiceTypeChange}
        aria-label='text alignment'
      >
        {diceTypesList.map((item, index) => (
          <ToggleButton
            value={item}
            className={styles.classics__dice_type_select_item}
            color='standard'
            aria-label='left aligned'
            key={index}
          >
            <p>{DiceType[item]}</p>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </section>
  );
}

enum DiceType {
  D4 = 0,
  D6 = 1,
  D8 = 2,
  D10 = 3,
  D12 = 4,
  D20 = 5,
  D100 = 6,
}
