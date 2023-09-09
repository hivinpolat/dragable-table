document.addEventListener("DOMContentLoaded", function () {
    const pivotTable = document.getElementById("pivot-table");
    const addItemButton = document.getElementById("add-item");


    pivotTable.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", event.target.textContent);
    });
    pivotTable.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    pivotTable.addEventListener("drop", async function (event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");

        const response = await fetch("http://localhost:8000/api/pivot_table", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({item: data}),
            // mode: "no-cors",
        });

        if (response.ok) {
            const newItem = document.createElement("div");
            newItem.className = "pivot-table-item";
            newItem.draggable = true;
            newItem.textContent = data;
            pivotTable.appendChild(newItem);
        }
    });

    addItemButton.addEventListener("click", async function () {
        const newItemText = prompt("Enter item text:");
        if (newItemText) {
            const response = await fetch("http://localhost:8000/api/pivot_table", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item: newItemText}),
                // mode: "no-cors",
            });
            if (response.ok) {
                const newItem = document.createElement("div");
                newItem.className = "pivot-table-item";
                newItem.draggable = true;
                newItem.textContent = newItemText;
                pivotTable.appendChild(newItem);
            }
        }
    });
});
