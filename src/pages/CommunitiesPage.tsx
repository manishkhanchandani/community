import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Fab,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { Community } from "../types/Community";
import { useCommunity } from "../context/CommunityContext";
import CommunityList from "../components/CommunityList";
import CommunityForm from "../components/CommunityForm";
import {
  createAddCommunityAction,
  createUpdateCommunityAction,
  createDeleteCommunityAction,
  createToggleApprovalAction,
  createToggleActiveAction,
} from "../utils/communityActions";

const CommunitiesPage: React.FC = () => {
  const {
    state: { communities, error },
    dispatch,
  } = useCommunity();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "approved" | "pending" | "active" | "inactive"
  >("all");

  const handleCreateCommunity = () => {
    setEditingCommunity(null);
    setFormOpen(true);
  };

  const handleEditCommunity = (community: Community) => {
    setEditingCommunity(community);
    setFormOpen(true);
  };

  const handleFormSubmit = (
    communityData: Omit<Community, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingCommunity) {
      // Update existing community
      const updatedCommunity: Community = {
        ...editingCommunity,
        ...communityData,
        updatedAt: new Date(),
      };
      dispatch(createUpdateCommunityAction(updatedCommunity));
    } else {
      // Create new community
      dispatch(createAddCommunityAction(communityData));
    }
    setFormOpen(false);
    setEditingCommunity(null);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditingCommunity(null);
  };

  const handleDeleteCommunity = (id: string) => {
    dispatch(createDeleteCommunityAction(id));
  };

  const handleToggleApproval = (id: string) => {
    dispatch(createToggleApprovalAction(id));
  };

  const handleToggleActive = (id: string) => {
    dispatch(createToggleActiveAction(id));
  };

  // Filter communities based on search term and status
  const filteredCommunities = communities.filter((community: Community) => {
    const matchesSearch =
      community.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      community.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = (() => {
      switch (filterStatus) {
        case "approved":
          return community.approvedByAdmin;
        case "pending":
          return !community.approvedByAdmin;
        case "active":
          return community.isActive;
        case "inactive":
          return !community.isActive;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesFilter;
  });

  const getStatusChipData = () => {
    const allCount = communities.length;
    const approvedCount = communities.filter(
      (c: Community) => c.approvedByAdmin
    ).length;
    const pendingCount = communities.filter(
      (c: Community) => !c.approvedByAdmin
    ).length;
    const activeCount = communities.filter((c: Community) => c.isActive).length;
    const inactiveCount = communities.filter(
      (c: Community) => !c.isActive
    ).length;

    return [
      { label: `All (${allCount})`, value: "all" as const },
      { label: `Approved (${approvedCount})`, value: "approved" as const },
      { label: `Pending (${pendingCount})`, value: "pending" as const },
      { label: `Active (${activeCount})`, value: "active" as const },
      { label: `Inactive (${inactiveCount})`, value: "inactive" as const },
    ];
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Community Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage and organize your communities
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            bgcolor: "error.light",
            color: "error.contrastText",
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Paper>
      )}

      {/* Search and Filter Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Filter by Status:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {getStatusChipData().map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                onClick={() => setFilterStatus(value)}
                color={filterStatus === value ? "primary" : "default"}
                variant={filterStatus === value ? "filled" : "outlined"}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {filteredCommunities.length} communities found
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateCommunity}
          >
            Create Community
          </Button>
        </Box>
      </Paper>

      {/* Communities List */}
      <CommunityList
        communities={filteredCommunities}
        onEdit={handleEditCommunity}
        onDelete={handleDeleteCommunity}
        onToggleApproval={handleToggleApproval}
        onToggleActive={handleToggleActive}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleCreateCommunity}
      >
        <AddIcon />
      </Fab>

      {/* Community Form Dialog */}
      <CommunityForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialValues={editingCommunity || undefined}
        mode={editingCommunity ? "edit" : "create"}
      />
    </Container>
  );
};

export default CommunitiesPage;
