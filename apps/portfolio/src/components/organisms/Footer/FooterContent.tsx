import React from 'react';
import styles from './Footer.module.scss';

interface FooterContentProps {
  owner: string;
  url: string;
  year: string;
}

export default function FooterContent({ owner, url, year }: FooterContentProps) {
  return (
    <div>
      <p className={styles.text}>
        Copyright &copy; {year} Developed with ❤️ by{' '}
        <a className={styles.footerLink} href={url}>
          {owner}
        </a>
      </p>
    </div>
  );
}
