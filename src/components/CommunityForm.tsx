import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import { Community } from "../types/Community";

interface CommunityFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    community: Omit<Community, "id" | "createdAt" | "updatedAt">
  ) => void;
  initialValues?: Community;
  mode: "create" | "edit";
}

const CommunityForm: React.FC<CommunityFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "",
    approvedByAdmin: false,
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title,
        description: initialValues.description,
        createdBy: initialValues.createdBy,
        approvedByAdmin: initialValues.approvedByAdmin,
        isActive: initialValues.isActive,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        createdBy: "",
        approvedByAdmin: false,
        isActive: true,
      });
    }
    setErrors({});
  }, [initialValues, open]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.createdBy.trim()) {
      newErrors.createdBy = "Created by is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === "create" ? "Create New Community" : "Edit Community"}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={handleChange("title")}
              error={!!errors.title}
              helperText={errors.title}
              required
            />

            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={handleChange("description")}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              required
            />

            <TextField
              fullWidth
              label="Created By"
              value={formData.createdBy}
              onChange={handleChange("createdBy")}
              error={!!errors.createdBy}
              helperText={errors.createdBy}
              required
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.approvedByAdmin}
                  onChange={handleChange("approvedByAdmin")}
                />
              }
              label="Approved by Admin"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleChange("isActive")}
                />
              }
              label="Is Active"
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CommunityForm;
