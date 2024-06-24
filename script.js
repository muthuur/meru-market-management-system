document.addEventListener("DOMContentLoaded", function () {
  const sellerForm = document.getElementById("sellerForm");
  const sellerList = document.getElementById("sellerList");
  const commentForm = document.getElementById("commentForm");
  const commentList = document.getElementById("commentList");
  const sellerPopup = document.getElementById("sellerPopup");
  const popupContent = document.getElementById("popupContent");
  const closePopup = document.querySelector(".close");

  let sellers = JSON.parse(localStorage.getItem("sellers")) || [];
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  function saveSellers() {
    localStorage.setItem("sellers", JSON.stringify(sellers));
  }

  function saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function renderSellers() {
    sellerList.innerHTML = "";
    sellers.forEach((seller, index) => {
      const sellerCard = document.createElement("div");
      sellerCard.className = "seller-card";
      sellerCard.innerHTML = `
                <img src="${seller.sellerImage}" alt="${seller.name}" style="width:100px;height:100px;">
                <h3>${seller.name}</h3>
                <p>Product: ${seller.product}</p>
                <button onclick="viewSeller(${index})">View</button>
                <button onclick="updateSeller(${index})">Update</button>
                <button onclick="deleteSeller(${index})">Delete</button>
            `;
      sellerList.appendChild(sellerCard);
    });
  }

  function renderComments() {
    commentList.innerHTML = "";
    comments.forEach((comment, index) => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment";
      commentDiv.innerHTML = `
                <p>${comment}</p>
                <button onclick="viewComment(${index})">View</button>
                <button onclick="deleteComment(${index})">Delete</button>
            `;
      commentList.appendChild(commentDiv);
    });
  }

  sellerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newSeller = {
      sellerImage: document.getElementById("sellerImage").value,
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      idNumber: document.getElementById("idNumber").value,
      product: document.getElementById("product").value,
      productImage: document.getElementById("productImage").value,
      attendance: Array.from(
        document.querySelectorAll("#attendance input:checked")
      ).map((input) => input.value),
      monthYear: document.getElementById("monthYear").value,
      amountPaid: document.getElementById("amountPaid").value,
    };
    sellers.push(newSeller);
    saveSellers();
    renderSellers();
    sellerForm.reset();
  });

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newComment = document.getElementById("commentText").value;
    comments.push(newComment);
    saveComments();
    renderComments();
    commentForm.reset();
  });

  window.viewSeller = function (index) {
    const seller = sellers[index];
    popupContent.innerHTML = `
            <h2>${seller.name}</h2>
            <img src="${seller.sellerImage}" alt="${
      seller.name
    }" style="width:200px;height:200px;">
            <p>Phone: ${seller.phone}</p>
            <p>Email: ${seller.email}</p>
            <p>ID Number: ${seller.idNumber}</p>
            <p>Product: ${seller.product}</p>
            <img src="${seller.productImage}" alt="${
      seller.product
    }" style="width:200px;height:200px;">
            <p>Attendance: ${seller.attendance.join(", ")}</p>
            <p>Month/Year: ${seller.monthYear}</p>
            <p>Amount Paid: ${seller.amountPaid}</p>
        `;
    sellerPopup.style.display = "block";
  };

  window.updateSeller = function (index) {
    const seller = sellers[index];
    popupContent.innerHTML = `
            <h2>Update Seller</h2>
            <form id="updateSellerForm">
                <input type="url" id="updateSellerImage" value="${
                  seller.sellerImage
                }" required>
                <input type="text" id="updateName" value="${
                  seller.name
                }" required>
                <input type="tel" id="updatePhone" value="${
                  seller.phone
                }" required>
                <input type="email" id="updateEmail" value="${
                  seller.email
                }" required>
                <input type="text" id="updateIdNumber" value="${
                  seller.idNumber
                }" required>
                <input type="text" id="updateProduct" value="${
                  seller.product
                }" required>
                <input type="url" id="updateProductImage" value="${
                  seller.productImage
                }" required>
                <div id="updateAttendance">
                    ${[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ]
                      .map(
                        (day) => `
                        <div>
                            <input type="checkbox" id="update${day}" name="day" value="${day}" ${
                          seller.attendance.includes(day) ? "checked" : ""
                        }>
                            <label for="update${day}">${day}</label>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <input type="month" id="updateMonthYear" value="${
                  seller.monthYear
                }" required>
                <input type="number" id="updateAmountPaid" value="${
                  seller.amountPaid
                }" required>
                <button type="submit">Update Seller</button>
            </form>
        `;
    sellerPopup.style.display = "block";

    document
      .getElementById("updateSellerForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        sellers[index] = {
          sellerImage: document.getElementById("updateSellerImage").value,
          name: document.getElementById("updateName").value,
          phone: document.getElementById("updatePhone").value,
          email: document.getElementById("updateEmail").value,
          idNumber: document.getElementById("updateIdNumber").value,
          product: document.getElementById("updateProduct").value,
          productImage: document.getElementById("updateProductImage").value,
          attendance: Array.from(
            document.querySelectorAll("#updateAttendance input:checked")
          ).map((input) => input.value),
          monthYear: document.getElementById("updateMonthYear").value,
          amountPaid: document.getElementById("updateAmountPaid").value,
        };
        saveSellers();
        renderSellers();
        sellerPopup.style.display = "none";
      });
  };

  window.deleteSeller = function (index) {
    if (confirm("Are you sure you want to delete this seller?")) {
      sellers.splice(index, 1);
      saveSellers();
      renderSellers();
    }
  };

  window.viewComment = function (index) {
    const comment = comments[index];
    popupContent.innerHTML = `
            <h2>Comment</h2>
            <p>${comment}</p>
        `;
    sellerPopup.style.display = "block";
  };

  window.deleteComment = function (index) {
    if (confirm("Are you sure you want to delete this comment?")) {
      comments.splice(index, 1);
      saveComments();
      renderComments();
    }
  };

  closePopup.onclick = function () {
    sellerPopup.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == sellerPopup) {
      sellerPopup.style.display = "none";
    }
  };

  renderSellers();
  renderComments();
});
