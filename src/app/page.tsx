/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [number, setNumber] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const historyValue = localStorage.getItem('history');
    if (historyValue) {
      const historyValueArr = JSON.parse(historyValue);
      setHistory(historyValueArr);
    }
  }, []);

  const roll = () => {
    const random = Math.floor(Math.random() * (100 - 1) + 1);

    setNumber(random);

    history.push(random);
    saveHistory();
  };

  const saveHistory = () => {
    localStorage.setItem('history', JSON.stringify(history));
  };

  const clearHistory = () => {
    setHistory([]);
    saveHistory();
  };

  return (
    <main className={styles.d100__container}>
      <div className={styles.d100__roll_history}>
        <div className={styles.d100__roll_history_title}>
          <h2>History</h2>
          <Button
            onClick={clearHistory}
            disabled={history.length <= 0}
            variant='contained'
          >
            Clear
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
        <div className={styles.d100__roll_history_list}>
          {history &&
            history.map((item, index) => (
              <div className={styles.d100__roll_history_item} key={index}>
                <p>{item}</p>
                {index < history.length - 1 && <p>{'>'}</p>}
              </div>
            ))}
        </div>
      </div>
      <div className={styles.d100__roll_container}>
        <p>{number}</p>
        <Button onClick={roll} variant='contained'>
          Roll
          <FontAwesomeIcon icon={faDice} />
        </Button>
      </div>
    </main>
  );
}
