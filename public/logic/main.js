// Get DOM elements
const button = document.querySelector("button");
const form = document.querySelector("form");
const list = document.getElementById("list");
const taskname = document.getElementById("taskName");

// Add click event listener to the task list for handling task actions
list.addEventListener("click", async (eo) => {
    // Handle different actions based on the clicked element's class
    switch (eo.target.className) {
        // Delete task: send request to server and remove from DOM
        case "icon-trash icon":
            const index = eo.target.parentElement.parentElement.dataset.index;
            const res = await fetch("/remove-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ index: parseInt(index) })
            });
            const data = await res.json();
            if (data.success) {
                eo.target.parentElement.parentElement.remove();
            } else {
                alert(data.message);
            }
            break;

        // Mark task as finished: hide angry icon, show heart, add strikethrough, move to end
        case "icon-angry2 icon":
            eo.target.classList.add("dn");
            eo.target.parentElement.parentElement
                .getElementsByClassName("task-text")[0]
                .classList.add("finish");
            eo.target.parentElement
                .getElementsByClassName("icon-heart icon")[0]
                .classList.remove("dn");
            list.append(eo.target.parentElement.parentElement);
            break;

        // Restore task: hide heart, show angry, remove strikethrough
        case "icon-heart icon":
            eo.target.classList.add("dn");
            eo.target.parentElement
                .getElementsByClassName("icon-angry2 icon")[0]
                .classList.remove("dn");
            eo.target.parentElement.parentElement
                .getElementsByClassName("task-text")[0]
                .classList.remove("finish");
            break;

        // Star task: add orange class and move to top
        case "icon-star icon":
            eo.target.classList.add("orange");
            list.prepend(eo.target.parentElement);
            break;

        // Unstar task: remove orange class and move to top
        case "icon-star icon orange":
            eo.target.classList.remove("orange");
            list.prepend(eo.target.parentElement);
            break;
    }
});

// Add submit event listener to the form for adding new tasks
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate input
    if (taskName.value.trim() === "") {
        alert("You should give the name to the task!");
        return;
    }

    // Send add task request to server
    const res = await fetch("/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskName.value })
    });

    const data = await res.json();
    if (data.success) {
        location.reload(); // Reload page to update task list
    } else {
        alert(data.message);
    }

    // Clear input field
    taskName.value = "";
});