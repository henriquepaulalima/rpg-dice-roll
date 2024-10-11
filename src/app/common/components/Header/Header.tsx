'use client';

import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header__container}>
      <FontAwesomeIcon icon={faDiceD20} />
      <Link href='/'>
        <Button
          variant='outlined'
          className={classnames({
            [styles.active]: pathname === '/',
          })}
        >
          D100
        </Button>
      </Link>
      <Link href='classics'>
        <Button
          variant='outlined'
          className={classnames({
            [styles.active]: pathname === '/classics',
          })}
        >
          Classic Dices
        </Button>
      </Link>
    </header>
  );
}
