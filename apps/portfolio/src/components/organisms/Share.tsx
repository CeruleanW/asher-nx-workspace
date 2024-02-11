//@ts-nocheck
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { Box } from '@root/shared/components/atomics';


export default function Share({text, ...optionals}) {
  //social media share icons: github, linkedin, facebook
  const iconSize = 26;
  const shareUrl = window.location.href;

  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <LinkedinShareButton title={text} url={shareUrl}>
        <LinkedinIcon size={iconSize} round={true} />
      </LinkedinShareButton>
      <EmailShareButton subject={text} url={shareUrl}>
        <EmailIcon size={iconSize} round={true} />
      </EmailShareButton>
      <FacebookShareButton quote={text} url={shareUrl}>
        <FacebookIcon size={iconSize} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton title={text} url={shareUrl}>
        <WhatsappIcon size={iconSize} round={true} />
      </WhatsappShareButton>
    </Box>
  );
}
