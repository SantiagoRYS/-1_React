import React, { useState, useEffect } from "react";
import {
  Container, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Switch, InputAdornment, Box, Dialog, 
  DialogTitle, DialogContent, DialogActions, Typography, Snackbar, Alert,
} from "@mui/material";

import { Edit, Delete, Info } from "@mui/icons-material";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cursos, setCursos] = useState([]); // Almacena todos los cursos
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [formValues, setFormValues] = useState({
      nombre: '',
      email: '',
      password: '',
      estado: true,
      imagen: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openInfoDialog, setOpenInfoDialog] = useState(false);
    const [openAddCursosDialog, setOpenAddCursosDialog] = useState(false); // Modal para agregar cursos
    const [selectedCursos, setSelectedCursos] = useState([]); // Cursos seleccionados para asociar al usuario
    const [usuarioInfo, setUsuarioInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const defaultImage = 'https://via.placeholder.com/50';
  
    useEffect(() => {
      fetchUsuarios();
      fetchCursos(); // Cargar los cursos cuando se cargue el componente
    }, []);
};

const fetchUsuarios = async () => {
    try {
      const response = await fetch('https://localhost:3000/api/usuarios');
      if (!response.ok) throw new Error("Error al obtener usuarios");
      const data = await response.json();
      setUsuarios(data.filter(usuario => usuario.estado));
    } catch (error) {
      handleError(error, 'Error al obtener usuarios');
    }
};
  
const fetchCursos = async () => {
    try {
      const response = await fetch('https://localhost:3000/api/cursos');
      if (!response.ok) throw new Error("Error al obtener cursos");
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      handleError(error, 'Error al obtener cursos');
    }
};
  
const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
};
  
const handleSwitchChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });
};

const handleCreateUsuario = async () => {
    try {
      const response = await fetch('https://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear usuario');
      }
      await fetchUsuarios();
      resetForm();
    } catch (error) {
      handleError(error, 'Error al crear usuario');
    }
};
  