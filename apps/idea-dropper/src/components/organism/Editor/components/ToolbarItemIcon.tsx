import React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

import { cond, equals } from 'ramda';

const convertToIcon = cond([
  [equals('format_bold'), () => <FormatBoldIcon />],
  [equals('format_italic'), () => <FormatItalicIcon />],
  [equals('format_underlined'), () => <FormatUnderlinedIcon />],
  [equals('code'), () => <CodeIcon />],
  [equals('format_quote'), () => <FormatQuoteIcon />],
  [equals('format_list_bulleted'), () => <FormatListBulletedIcon />],
  [equals('format_list_numbered'), () => <FormatListNumberedIcon />],
  [equals('looks_one'), () => <LooksOneIcon />],
  [equals('looks_two'), () => <LooksTwoIcon />],
  [equals('format_align_left'), () => <FormatAlignLeftIcon />],
  [equals('format_align_center'), () => <FormatAlignCenterIcon />],
  [equals('format_align_right'), () => <FormatAlignRightIcon />],
  [equals('format_align_justify'), () => <FormatAlignJustifyIcon />],
]);

export function ToolbarItemIcon({ type, ...rest }) {
  return <>{convertToIcon(type)}</>;
}
