export async function deleting(id: string) {
    console.log("deleted");
    try {
        await fetch(`http://localhost:8080/products/deleteProduct/${id}`, {
            method: "DELETE"
        });
        window.location.reload();
    } catch (error) { console.log(error) }
}

export function updating(id: string) {
    console.log("updated");
    const updatingFinal = async () => {
        try {
            await fetch(`http://localhost:8080/products/updateProduct/${id}`, {
                method: "PUT",
            });
            window.location.reload();
        } catch (error) { console.log(error) }
    }
    return (
        <div>
        </div>
    );
}
