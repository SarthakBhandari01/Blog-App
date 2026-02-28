import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
      keepMounted={false}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        },
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          },
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <X className="w-5 h-5" />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent sx={{ pt: 3 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
