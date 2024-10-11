/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  ButtonGroup,
  Fade,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faAnglesUp,
  faClose,
  faDice,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function Home() {
  const [number, setNumber] = useState<number>(0);
  const [diceColor, setDiceColor] = useState<DiceColor | null>(null);
  const [buffs, setBuffs] = useState<Buffs | null>(Buffs.BUFF);
  const [buffsValue, setBuffsValues] = useState<number | string>('');
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

  const handleBuffs = (
    event: React.MouseEvent<HTMLElement>,
    newBuffs: Buffs | null
  ) => {
    setBuffs(newBuffs);
  };

  const handleBuffsValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.value === '' ? '' : parseFloat(event.target.value);

    setBuffsValues(newValue);
  };

  const roll = () => {
    let random = Math.floor(Math.random() * (100 - 1) + 1);

    if (buffsValue) {
      switch (buffs) {
        case Buffs.BUFF:
          random = random + Number(buffsValue);
          if (random > 100) random = 100;
          break;
        case Buffs.DEBUFF:
          random = random - Number(buffsValue);
          if (random < 1) random = 1;
          break;
        default:
      }
    }

    if (random <= 40) {
      setDiceColor(DiceColor.RED);
    } else if (random >= 41 && random <= 50) {
      setDiceColor(DiceColor.BLACK);
    } else if (random >= 51 && random <= 75) {
      setDiceColor(DiceColor.GREEN);
    } else if (random >= 76 && random <= 80) {
      setDiceColor(DiceColor.GOLD);
    } else if (random >= 81) {
      setDiceColor(DiceColor.BLUE);
    }

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
                    className={classNames({
                      [styles.d100__roll_history_modal_list_item]: true,
                      [styles.red]: item <= 40,
                      [styles.black]: item >= 41 && item <= 50,
                      [styles.green]: item >= 51 && item <= 75,
                      [styles.gold]: item >= 76 && item <= 80,
                      [styles.blue]: item >= 81,
                    })}
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
        <div
          className={classNames({
            [styles.d100__roll_result]: true,
            [styles.red]: diceColor === 0,
            [styles.black]: diceColor === 1,
            [styles.green]: diceColor === 2,
            [styles.gold]: diceColor === 3,
            [styles.blue]: diceColor === 4,
          })}
        >
          <p>{number}</p>
        </div>
        <Button onClick={roll} variant='contained'>
          Roll
          <FontAwesomeIcon icon={faDice} />
        </Button>
        <div className={styles.d100__roll_buffs_container}>
          <ToggleButtonGroup
            value={buffs}
            exclusive
            onChange={handleBuffs}
            aria-label='Buff and Debuff'
            className={styles.d100__roll_buffs_select}
          >
            <ToggleButton
              className={classNames({
                [styles.button_buff]: buffs === Buffs.BUFF,
              })}
              value={Buffs.BUFF}
              aria-label='Buff'
            >
              D <FontAwesomeIcon icon={faAnglesUp} />
            </ToggleButton>
            <ToggleButton
              className={classNames({
                [styles.button_debuff]: buffs === Buffs.DEBUFF,
              })}
              value={Buffs.DEBUFF}
              aria-label='Debuff'
            >
              D <FontAwesomeIcon icon={faAnglesDown} />
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            value={buffsValue}
            onChange={handleBuffsValue}
            InputProps={{ inputProps: { min: 1, max: 75 } }}
            type='number'
            id='outlined-basic'
            label='Value'
            variant='outlined'
          />
        </div>
      </div>
    </main>
  );
}

enum DiceColor {
  RED,
  BLACK,
  GREEN,
  GOLD,
  BLUE,
}

enum Buffs {
  BUFF,
  DEBUFF,
}
