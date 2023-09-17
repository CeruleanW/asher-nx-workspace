import React from 'react';
import FooterContent from './FooterContent';
import styles from './Footer.module.scss';

const owner = 'Asher Yang';
const url = 'https://github.com/CeruleanW';
const year = '2021';

const myProps = {owner, url, year};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterContent {...myProps}/>
    </footer>
  );
}
