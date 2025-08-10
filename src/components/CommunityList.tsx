import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { Community } from "../types/Community";
import moment from "moment";

interface CommunityListProps {
  communities: Community[];
  onEdit: (community: Community) => void;
  onDelete: (id: string) => void;
  onToggleApproval: (id: string) => void;
  onToggleActive: (id: string) => void;
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  onEdit,
  onDelete,
  onToggleApproval,
  onToggleActive,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [communityToDelete, setCommunityToDelete] = useState<Community | null>(
    null
  );

  const handleDeleteClick = (community: Community) => {
    setCommunityToDelete(community);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (communityToDelete) {
      onDelete(communityToDelete.id);
      setDeleteDialogOpen(false);
      setCommunityToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCommunityToDelete(null);
  };

  if (communities.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          bgcolor: "grey.50",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No communities found. Create your first community!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={community.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                opacity: community.isActive ? 1 : 0.6,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {community.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 60 }}
                >
                  {community.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={
                      community.approvedByAdmin
                        ? "Approved"
                        : "Pending Approval"
                    }
                    color={community.approvedByAdmin ? "success" : "warning"}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={community.isActive ? "Active" : "Inactive"}
                    color={community.isActive ? "primary" : "default"}
                    size="small"
                  />
                </Box>

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Created by: {community.createdBy}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Created: {moment(community.createdAt).format("MMM DD, YYYY")}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Updated: {moment(community.updatedAt).format("MMM DD, YYYY")}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
              >
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(community)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteClick(community)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box>
                  <IconButton
                    size="small"
                    onClick={() => onToggleApproval(community.id)}
                    color={community.approvedByAdmin ? "success" : "warning"}
                    title={
                      community.approvedByAdmin ? "Remove Approval" : "Approve"
                    }
                  >
                    {community.approvedByAdmin ? (
                      <CancelIcon />
                    ) : (
                      <CheckCircleIcon />
                    )}
                  </IconButton>
                  <Button
                    size="small"
                    onClick={() => onToggleActive(community.id)}
                    color={community.isActive ? "error" : "success"}
                    variant="outlined"
                  >
                    {community.isActive ? "Deactivate" : "Activate"}
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Community</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{communityToDelete?.title}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommunityList;
