import { useState, useRef } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Icon } from '@root/shared/components/atomics/Icon';
import { LogoutBtn } from '../molecule/LogoutBtn';
import { parseMarkdownToSlate, readFileContent } from '../../lib';
import { insertCard } from '../../features/idea-server';
import { useUser } from '../../hooks'; // Correct path
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { ALL_BOX, INBOX } from '../../features/idea-server/apis';

export function MenuAppBar(props) {
  const { title, ...rest } = props;

  // Local state
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: userData } = useUser(); // Need userID for card creation owner
  const { mutate } = useSWRConfig();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
    handleClose();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let successCount = 0;
    let failCount = 0;

    // Process files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const content = await readFileContent(file);
        const slateContent = parseMarkdownToSlate(content);
        const title = file.name.replace(/\.md$/i, ''); // Remove extension

        if (!userData?._id) {
          console.error("User ID not found for import");
          toast.error("You must be logged in to import.");
          break;
        }

        const cardData = {
          title,
          content: slateContent,
          owner: userData._id,
          boxes: [] // Default to no box or maybe 'Inbox'?
        };

        await insertCard({ cardData });
        successCount++;
      } catch (error) {
        console.error(`Failed to import ${file.name}`, error);
        failCount++;
      }
    }

    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} notes.`);
      mutate(ALL_BOX); // Refresh boxes/cards list
      mutate(INBOX); // Refresh inbox
    }
    if (failCount > 0) {
      toast.error(`Failed to import ${failCount} notes.`);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <MuiAppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Icon name="fa-solid fa-bars" className='text-white' />
          </IconButton> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Icon name="ellipsis-h" className='text-white' />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disabled={true} >Profile</MenuItem>
              <MenuItem onClick={handleImportClick}>Import Markdown</MenuItem>
              <LogoutBtn onFulfilled={handleClose} />
            </Menu>
          </div>
        </Toolbar>
      </MuiAppBar>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        accept=".md, .txt"
        onChange={handleFileChange}
      />
    </div>
  );
}
