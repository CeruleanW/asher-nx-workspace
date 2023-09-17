import { EmailIcon, FacebookIcon, LinkedinIcon } from 'react-share';
import { Box, Link } from '@material-ui/core';

const iconSize = 26;

export function SocialMedia(props) {
  const { email = 'yyang.techie@gmail.com', linkedIn = 'https://www.linkedin.com/in/yiyang-tech/', facebook = 'https://www.facebook.com/fongeey/', ...rest } = props;
  // const shareUrl = window.location.href;

  return (
    <div className={'flex justify-between'}>
      <Link href={linkedIn}>
        <LinkedinIcon size={iconSize} round={true} />
      </Link>
      <Link href={`mailto:${email}`}>
        <EmailIcon size={iconSize} round={true} />
      </Link>
      <Link href={facebook}>
        <FacebookIcon size={iconSize} round={true} />
      </Link>
    </div>
  );
}
