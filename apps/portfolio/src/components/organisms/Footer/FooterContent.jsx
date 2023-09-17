import React from "react";
import styles from './Footer.module.scss';

export default function FooterContent(props) {
  const {owner, url, year} = props
  return (
      <div>
        <p className={styles.text} >
          Copyright &copy; {year} Developed with ❤️ by {' '}
          <a className={styles.footerLink}
            href={url}
          >
           {owner}
          </a>
        </p>
      </div>
  );
}
