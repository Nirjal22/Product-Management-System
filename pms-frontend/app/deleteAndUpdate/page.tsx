import React from "react";

export async function deleting(id:string) {
    console.log("deleted");
    try{
        await fetch(`http://localhost:8080/products/deleteProduct/${id}`,{
            method:"DELETE"
        });
    }catch(error){console.log(error)}
}

export async function updating() {
    console.log("updated");
    try{
        await fetch(`http://localhost:8080/products/updateProduct`,{
            method:"PUT"
        });
    }catch(error){console.log(error)}
}
