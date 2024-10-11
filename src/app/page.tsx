/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faDice, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [number, setNumber] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    handleClose();
  };

  return (
    <main className={styles.d100__container}>
      <div className={styles.d100__roll_history}>
        <Button
          onClick={handleOpen}
          disabled={history.length <= 0}
          variant='contained'
        >
          History
        </Button>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <div className={styles.d100__roll_history_modal}>
              <div className={styles.d100__roll_history_modal_title}>
                <h2>History</h2>
                <ButtonGroup
                  variant='contained'
                  aria-label='Basic button group'
                >
                  <Button
                    onClick={clearHistory}
                    disabled={history.length <= 0}
                    color='error'
                  >
                    Clear
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                  <Button onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose} />
                  </Button>
                </ButtonGroup>
              </div>
              <div className={styles.d100__roll_history_modal_list}>
                {history.map((item, index) => (
                  <div
                    className={styles.d100__roll_history_modal_list_item}
                    key={index}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </Modal>
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
