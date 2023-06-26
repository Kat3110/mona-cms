import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import CloseIcon from '@mui/icons-material/Close';

export const SimpleDialog = (props) => {
  const { onClose, list = [], open } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog open={open} fullWidth>
      <Button
          onClick={handleClose}
      ><CloseIcon sx={{margin: '5px 20px 5px auto'}}/></Button>
      <DialogTitle fontSize='18px' sx={{pt: 0, textAlign: 'center'}}>회원선택</DialogTitle>


      <List sx={{ pt: 0 }}>
          <ListItem
              sx={{
                  display: "grid",
                  gridTemplateColumns: "10% 15% 30% 30% 20%",
                  backgroundColor: '#bbdefb'
              }}
          >
              <ListItemText
                  sx={{ textAlign: "center" }}
              >구분</ListItemText>
              <ListItemText
                  sx={{ textAlign: "center" }}
              >회원명</ListItemText>
              <ListItemText
                  sx={{ textAlign: "center" }}
              >전화번호</ListItemText>
              <ListItemText
                  sx={{ textAlign: "center" }}
              >아이디</ListItemText>
              <ListItemText
                  sx={{ textAlign: "center" }}
              >선택</ListItemText>
          </ListItem>
        {list.map((item, index) => (
          <ListItem
            onClick={() => handleListItemClick(item)}
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns:  "10% 15% 30% 30% 20%",
              cursor: "pointer"
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600], m: '0 auto' }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item?.adminName ?? ""}
              sx={{ textAlign: "center" }}
            />
            <ListItemText
              primary={item?.adminId ?? ""}
              sx={{ textAlign: "center" }}
            />
            <ListItemText
              primary={item?.adminPhone ?? ""}
              sx={{ textAlign: "center" }}
            />
              <Button variant='outlined' sx={{width: '40px' , margin: '0 auto' }}>선택</Button>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};
