import React, { useState, useEffect } from "react";
import { Container, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: "", tag: "JEWELRY", price: "", discount: "" });
    const [imageFile, setImageFile] = useState(null);

    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data.products || []);
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("tag", form.tag);
        formData.append("price", form.price);
        formData.append("discount", form.discount);
        if (imageFile) formData.append("image", imageFile);

        const url = editingId ? `http://localhost:5000/api/products/${editingId}` : "http://localhost:5000/api/products";
        const method = editingId ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        setForm({ name: "", tag: "JEWELRY", price: "", discount: "" });
        setImageFile(null);
        setEditingId(null);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setForm({
            name: product.name,
            tag: product.tag,
            price: product.price,
            discount: product.discount || ""
        });
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/products/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchProducts();
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h5" mb={3}>Admin Dashboard</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                <TextField label="Product Name" size="small" value={form.name}
                    onChange={
                        e => setForm({ ...form, name: e.target.value })}
                    required />

                <TextField label="Price" size="small" value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    required />

                <TextField label="Discount" size="small" value={form.discount}
                    onChange={e => setForm({ ...form, discount: e.target.value })}
                />
                <input type="file" onChange={e => setImageFile(e.target.files[0])} />
                <Button type="submit" variant="contained">{editingId ? "Update Product" : "Add Product"}</Button>
                {editingId && <Button variant="outlined" color="secondary" onClick={() => { setEditingId(null); setForm({ name: "", tag: "JEWELRY", price: "", discount: "" }); setImageFile(null); }}>Cancel</Button>}
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell><img src={`http://localhost:5000${p.imageUrl}`} alt={p.name} width="60" /></TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>₹{p.price}</TableCell>
                                <TableCell>{p.discount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small" sx={{ mr: 1 }} onClick={() => handleEdit(p)}>Edit</Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(p.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}