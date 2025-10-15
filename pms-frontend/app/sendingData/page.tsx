"use client";
import React, { useState } from "react";

function SendingData() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [warranty, setWarranty] = useState("");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState<File | null>(null);
    const [responseData, setResponseData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("warranty", warranty);
        formData.append("price", price);
        if (picture) formData.append("picture", picture);

        try {
            const response = await fetch("http://localhost:8080/products/add", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setResponseData(data);
            setName("");
            setBrand("");
            setCategory("");
            setWarranty("");
            setPrice("");
            setPicture(null);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) setPicture(event.target.files[0]);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <label>Brand:</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                <br />
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <br />
                <label>Warranty:</label>
                <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
                <br />
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <br />
                <label>Picture:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <br /><br />
                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {responseData && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Product Saved Successfully</h3>
                </div>
            )}
        </div>
    );
}

export default SendingData;

// ---------- Delete Function ----------
export async function deleting(id: string) {
    console.log("deleted");
    try {
        await fetch(`http://localhost:8080/products/deleteProduct/${id}`, {
            method: "DELETE",
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}
